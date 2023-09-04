---
title: How to Resize Cloudinary Images in WordPress Timber Templates
slug: how-to-resize-cloudinary-images-in-wordpress-timber-templates
date: 2021-09-20T16:31:43.000Z
date_updated: 2021-09-20T16:31:43.000Z
tags:
  - filters
  - twig
  - timber
  - wordpress
  - cloudinary
  - images
excerpt: Timber’s resize filters don’t play nicely with the Cloudinary WordPress plugin. We added our own custom image optimizer function that check if an image is served from Cloudinary or WordPress and use the appropriate resize method.
canonical: https://cloudfour.com/thinks/how-to-resize-cloudinary-images-in-wordpress-timber-templates/
feature_image: /images/feature/wp-timber-cloudinary.png
---

We recently enabled the [Cloudinary WordPress plugin](https://cloudinary.com/documentation/wordpress_integration) for a client site. It modifies the way WordPress handles media by automatically syncing your images and serving them from Cloudinary with [optimizations](https://cloudinary.com/documentation/image_optimization). For images in blog posts, it works out of the box. However, our client’s site has a lot of custom templates, almost all of which use [Timber](https://upstatement.com/timber/) filters to [resize images](https://timber.github.io/docs/guides/cookbook-images/#arbitrary-resizing-of-images) and [convert to JPG format](https://timber.github.io/docs/guides/cookbook-images/#converting-images), like so:

{% raw %}

```html
<img src="{{ post.thumbnail.src|resize(640)|tojpg }}" />
```

{% endraw %}

Unfortunately, arbitrary resizing of images like this results in the resized images being served from WordPress rather than Cloudinary. Timber has a helpful section in their docs explaining that this is a [limitation of Timber when working with a CDN](https://timber.github.io/docs/guides/cookbook-images/#limitations-when-working-with-a-cdn), because WordPress doesn’t know about the generated images.

As a result, we had a choice: Drop the filters and get the image from Cloudinary, but receive the full-sized asset, often over 3000 pixels wide. Or resize it with Timber, but have the image be served from WordPress without Cloudinary’s optimizations.

Thankfully, resizing a Cloudinary image is simple. It works by adding URL parameters to specify things like image dimensions and cropping method.

What we needed was a way to modify the URL of the image if it was served from Cloudinary, or pass it through Timber’s filters if it wasn’t. To do this, we [added a custom Twig filter](https://timber.github.io/docs/guides/extending-timber/#adding-functionality-to-twig):

```php
function optimize_image( $url, $width, $height, $format) {
  $parsed_url = parse_url($url);
  if ( $parsed_url['host'] == 'res.cloudinary.com' ) {
    $result = optimize_cloudinary_image($url, $width, $height);
  } else {
    $result = optimize_timber_image($url, $width, $height, $format);
  }
  return $result;
}
```

This can be used the same way as the Timber filters:

{% raw %}

```html
<img src="{{ post.thumbnail.src|optimize_image(640, null, 'jpg') }}" />
```

{% endraw %}

Now we can send the image through a separate optimization function depending on whether the image is being served from Cloudinary or not.

You might think this step isn’t necessary — wouldn’t we know that all our images were served from Cloudinary? That’s not always true, however. For example, newly added images may take a bit of time to sync and be served from WordPress until they do. Not to mention that for local development and our staging environment, the Cloudinary plugin was disabled.

The Timber optimization function reproduces what was happening before with the `resize` and `tojpg` filters by calling the [PHP helper methods](https://timber.github.io/docs/reference/timber-imagehelper/) directly:

```php
function optimize_timber_image( $url, $width, $height, $format ) {
  $timber_image = TimberImageHelper::resize($url, $width, $height);
  if ($format === 'jpg') {
    $timber_image = TimberImageHelper::img_to_jpg($timber_image);
  }
  if ($format === 'webp') {
    $timber_image = TimberImageHelper::img_to_webp($timber_image);
  }
  return $timber_image;
}
```

The result is a resized image that can optionally be forced to JPG or WebP format.

The Cloudinary optimization function simulates the effect of the Timber filters by injecting the appropriate Cloudinary URL parameters:

```php
function optimize_cloudinary_image( $url, $width, $height ) {
  preg_match("/images\\\\/(.*?\\\\/)\\\\/?v\\\\d+\\\\//", $url, $matches);
  $old_transforms = $matches[1];
  $w = ',w_' . $width;
  $h = $height ? ',h_' . $height : '';
  $new_transforms = 'c_fill' . $w . $h . '/f_auto,q_auto/';
  if ($old_transforms) {
    $result = str_replace($old_transforms, $new_transforms, $url);
  } else {
    $result = str_replace('images/', 'images/' . $new_transforms, $url);
  }
  return $result;
}
```

A few things to notice here:

- There’s no `$format` passed in. That’s because we’re using Cloudinary’s `f_auto` to automatically serve the best file format the browser supports.
- We’re using `preg_match` to slice up the URL and find any existing transforms. We identify them as the bit of the URL between `images/` and the Cloudinary ID.
- We’re identifying the Cloudinary ID as the letter `v` followed by a string of digits. This is inferred in the Cloudinary docs but isn’t specified anywhere. The docs say “[You cannot use ‘v’ followed by numeric characters as a folder name.](https://cloudinary.com/documentation/upload_images#public_id)” That matches our observations and seems to be a [safe assumption](https://support.cloudinary.com/hc/en-us/community/posts/360006941639-How-to-programmatically-retrieve-public-id-from-URL-).

We construct our new transformations by adding the crop method, the specified width, the optional height, the [automatic quality](https://cloudinary.com/documentation/image_optimization#automatic_quality_selection_q_auto), and the [automatic format](https://cloudinary.com/documentation/image_optimization#automatic_format_selection_f_auto) parameters. Then we replace any existing transformations with our new transformations.

In a perfect world, we wouldn’t be doing this by manually hacking the Cloudinary URL. The Cloudinary WordPress plugin already has a [lot of methods](http://cloudinary.github.io/cloudinary_wordpress/index.html) that do things like “given a WordPress attachment ID, construct a Cloudinary URL.” Unfortunately, they don’t expose any of these methods. If they did, this function would be a lot simpler.

And there you have it! We’ve added a new `optimize_image` filter that we can use in our custom templates in place of the Timber image filters. Our filter will inject the transformations we want into a Cloudinary image, or use the Timber methods for WordPress images.
