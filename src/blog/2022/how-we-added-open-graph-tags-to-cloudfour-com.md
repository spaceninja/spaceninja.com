---
title: How We Added Open Graph Tags to CloudFour.com
date: 2022-12-13T17:40:25.000Z
date_updated: 2022-12-13T17:40:25.000Z
tags:
  - html
  - social
  - metaphor
  - opengraph
  - development
excerpt: When plugins to add OG tags failed us, we decided to roll our own! This post demystifies open graph tags (which are just HTML meta elements, after all) and shows how we handle them.
canonical: https://cloudfour.com/thinks/how-we-added-open-graph-tags-to-cloudfour-com/
feature_image: feature/fallback-code.png
---

During our [2022 redesign](https://cloudfour.com/thinks/2022-update/), Tyler noticed that our OG (Open Graph) tags weren’t working quite right. We had been using [Jetpack](https://jetpack.com/support/social/) to add these, but for reasons that weren’t clear to us, that stopped working in late 2020. In the interim, we tried a few alternative plugins, but none of them worked quite the way we wanted.

Here’s the great thing about [the Open Graph protocol](https://ogp.me/): It uses native HTML elements! There’s nothing particularly complex about the tags themselves, there are just a lot of them, and it was convenient to have a plugin generate them for us. But that meant we were giving up a degree of control, and accepting what the plugin thought was the correct output. Since our site has several custom content types and some special logic for handling the featured image, we decided to roll our own.

If you’re interested in doing the same, I hope this is helpful. I’ll be broadly summarizing what we did in this article, but if you use WordPress, you may be interested in [viewing our OG helper code directly](https://gist.github.com/spaceninja/d6dcb0e891d384186b93a2cbffb17fda).

## Adding an Open Graph helper function

Step one was adding a new PHP file containing a script that will generate the OG tags. We already have a collection of these, which we store in a `/helpers` directory. I created `add_open_graph_tags.php` there, and stubbed out an empty `add_open_graph_tags()` function.

```php
<?php
namespace CloudFour\Helpers;
function add_open_graph_tags() {
  // code will go here
}
```

We want to run this function in the head of every page on the site, so we imported it in our theme config file and used [`add_action`](https://developer.wordpress.org/reference/functions/add_action/) with the `wp_head` hook.

```php
add_action('wp_head', 'CloudFour\Helpers\add_open_graph_tags');
```

Now that our scaffolding is in place, it’s time to start generating some tags!

## Common OG tags for all pages

There are a few OG tags that will be set to the same value on every page, such as the site name and the locale (language). We’re going to end up adding a lot of OG tags, and it can quickly get repetitive writing echo statements for each one. To keep things a bit easier to maintain, I opted to construct an array of tags, and then loop over the array at the end of the function to construct and echo the `meta` elements.

```php
// Common OG tags for all pages
$open_graph_tags = [
	['property' => 'og:site_name', 'content' => get_bloginfo('name')],
	['property' => 'og:locale', 'content' => get_locale()],
];

// Echo the OG tags to the page
foreach ($open_graph_tags as $tag) {
	echo sprintf(
		"<meta property='%s' content='%s' />\n",
		$tag['property'],
		$tag['content']
	);
}
```

And with that, suddenly two OG tags are being rendered on every page of the site!

## Homepage OG tags

From here, the bulk of the function is broken up by WordPress content type, using the handy `is_type()` helpers. For example, here’s what the code to add homepage-specific OG tags looks like:

```php
// Homepage OG tags
if (is_front_page()) {
  $open_graph_tags = array_merge($open_graph_tags, [
    ['property' => 'og:type', 'content' => 'website'],
    ['property' => 'og:url', 'content' => get_bloginfo('url')],
    ['property' => 'og:title', 'content' => get_bloginfo('name')],
    [
      'property' => 'og:description',
      'content' => get_bloginfo('description'),
    ],
    [
      'name' => 'description',
      'content' => get_bloginfo('description'),
    ],
  ]);
}
```

The whole thing is nested inside an `is_front_page()` check, so we know this code will only run on the homepage.

You may have noticed that all the items have a `property` key except the second `description` item. That’s because we want to generate both an OG description tag and a traditional `<meta name="description">` tag. In theory, you can skip `og:title` and `og:description` and sites that consume your OG tags _should_ fall back to the `<title>` and `<meta property="description">` elements. In practice, we’ve seen some unpredictable results in tools like Slack or Apple News. It costs us nothing to use both, so we’re playing it safe.

This did require a small update to our output code:

```php
// Echo the OG tags to the page
foreach ($open_graph_tags as $tag) {
  // handle non-OG tags like meta description
  if (array_key_exists('name', $tag)) {
    echo sprintf(
      "<meta name='%s' content='%s' />\n",
      $tag['name'],
      $tag['content']
    );
    continue;
  }
  echo sprintf(
    "<meta property='%s' content='%s' />\n",
    $tag['property'],
    $tag['content']
  );
}
```

And now our homepage has a proper set of OG tags!

I won’t waste your time by walking through every other content type since they all follow the same basic pattern. If you’re curious, feel free to [view the full source](https://gist.github.com/spaceninja/d6dcb0e891d384186b93a2cbffb17fda), where we cover pages, single posts, author pages, taxonomy pages, and a few of our custom content types like talks.

However, I would like to talk about how we handled the `og:image` tag, which is a little special.

## Image OG tags

There are only a few required OG tags: - and profile (for author pages). - title - type - URL - and image. Title and URL are easy. Type is limited to a few options like website (for standard pages) - article (for blog posts)

But image is a bit special. In addition to setting `og:image` to the URL of the featured image for any given page, you’ll want to set a series of optional [structured tags](https://ogp.me/#structured), such as `og:image:width` and `og:image:alt`. Since every page needs OG image tags, even if it doesn’t have a featured image, we handled it a bit differently.

At the top of the file, we defined the default image:

```php
// Define fallback image, for use in Image OG Tags below
$image = new Image(
  $site->patterns->assets_directory_uri . '/favicons/icon-512.png'
);
```

(If you don’t recognize the `new Image()` part, we’re using [Timber](https://upstatement.com/timber/), which offers this helper to return an image object that contains the image’s width, height, etc.)

With the default image defined, now each content type gets the opportunity to override the `$image` variable with a better image. For example, the author section sets it to the user’s avatar:

```php
// Author OG tags
elseif (is_author()) {
	...
	// Set the image to the user's avatar, for use in Image OG Tags below
	$image = $timber_user->avatar();
}
```

For blog posts, we have some special code to use a [generated default featured image](https://cloudfour-patterns.netlify.app/?path=/docs/design-illustrations--feature-images) based on the post’s category:

```php
// Single Post OG tags
elseif (is_single()) {
	...
	// Set the image, for use in Image OG Tags below
	if ($timber_post->thumbnail()) {
		$image = $timber_post->thumbnail();
	} else {
		$image = get_default_feature_image($timber_post, 'png');
	}
}
```

Then, at the end of the file, just before we render the OG tags, we have the section that adds the image-related OG items to the array:

```php
// Image OG tags
$open_graph_tags = array_merge($open_graph_tags, [
	['property' => 'og:image', 'content' => $image->src()],
	['property' => 'og:image:secure_url', 'content' => $image->src()],
	['property' => 'og:image:alt', 'content' => $image->alt()],
	['property' => 'og:image:width', 'content' => $image->width()],
	['property' => 'og:image:height', 'content' => $image->height()],
	[
	  'property' => 'og:image:type',
	  'content' => get_post_mime_type($image->id),
	],
]);
```

## Testing & Validation

Now, once you’ve gone to all the trouble of adding OG tags, you’ll want to validate that they’re working properly. Thankfully, there are a few tools out there to help ensure your tags are set properly:

- [Facebook’s Sharing Debugger](https://developers.facebook.com/tools/debug)
- [Twitter’s Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn’s Post Inspector](https://www.linkedin.com/post-inspector/)
- [Pinterest’s URL Debugger](https://developers.pinterest.com/tools/url-debugger/)
- [OpenGraph.xyz](https://www.opengraph.xyz)

Unfortunately, these tools rely on your site being publicly reachable, so you may not be able to test from your local computer. Something you could try in that case is creating a minimal HTML document at a public URL and pasting in the OG tags from your site.

## Conclusion

The result of all this, I’m happy to say, has been working very well. At the end of the day, the Open Graph protocol is just a recommendation for using standard HTML `meta` elements to express information about your site in an agreed format.

I hope that after seeing this, even if you don’t decide to handle your own OG tags, at least the process has been demystified a bit.
