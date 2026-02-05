---
title: 'Getting Your Article Shared: Tips from Ten Years of Newsletter Curation'
date: 2026-02-05
tags:
  - html
  - social
  - newsletters
  - opengraph
  - promotion
excerpt: Some tips to make it easier to get your article shared in newsletters and social media, such as OG tags, a good sharing image, and some gotchas to watch out for.
canonical: https://cloudfour.com/thinks/getting-your-article-shared-tips-from-ten-years-of-newsletter-curation/
feature_image: getting-your-article-shared/sharing-feature.jpg
feature_alt: Illustration of a bland grey door in a bland grey hallway, with the word “meh” on the door — which conceals the fact that on the other side of the door is a bright, colorful nature scene of a deer resting beside a waterfall — exciting content hidden behind a boring door.
---

For over ten years now, I’ve been sharing front-end links with the community via a newsletter and social media account called [Friday Front-End](https://fridayfrontend.com). Every week, I bookmark 20–30 articles, and pick the best ones to include. In that time, I’ve learned some things I want to pass along to you: Recommendations to make your article more likely to be shared in newsletters and social media accounts like the one I run.

There’s loads of great content out there, and it’s funny how often someone puts the work into crafting an excellent post, but misses out on all the things that make it easy to widely share.

To understand what people like me are looking for, consider the format of a typical Friday Front-End post:

> <img src="{{ 'getting-your-article-shared/sharing-example.jpg' | imgPath }}" alt="Illustration of a code editor with a cartoon-style word bubble containing “?!” as if the code editor is saying something surprising." sizes="{{ media.mediaList.sizes }}" eleventy:widths="{{ media.mediaList.widths }}" style="margin:0">
>
> Your Exciting Post About #CSS: “Here’s a short quote from your article to interest people to read it.” https://example.com/

Pretty simple, right? A featured image, then the title, followed by a short quote, the URL, and a hashtag for the primary focus of the article (for Friday Front-End, this will almost always be #CSS, #JavaScript, or #a11y).

Now, here are the things you can do to make your post easier to share:

## Add Open Graph tags

If you take just one thing from this post, make it this. Adding OG (Open Graph) tags to your post gets you the most bang for your buck. Here’s what OG tags look like:

```html
<meta property="og:url" content="https://example.com/" />
<meta property="og:title" content="An exciting post about CSS" />
<meta
  property="og:description"
  content="Here's a short description of this exciting post about CSS"
/>
<meta property="og:image" content="https://example.com/thumbnail.jpg" />
```

There are more tags you could use, but you get the idea. In a nutshell, a long time ago, Facebook came up with a standard for describing your web page so their crawlers could understand it. They used that information to make little preview cards of a link when someone shared your page. The concept spread quickly, and now pretty much every social network out there will use your OG tags to make a preview card.

Even better, tools that people like me use to manage their social media accounts and newsletters, like [Buffer](https://buffer.com) or [Curated](https://www.curated.co), also understand them. That means I can simply pass them your post’s URL, and they automatically extract useful information like the title and thumbnail, which makes my job much easier.

### Note: add Open Graph tags about your post, not your site

A surprisingly common problem I run into is a great post that does have OG tags, but they describe the person’s _site_ as a whole, rather than the individual _post_ I’m trying to share. This might feel better than nothing, but it actually backfires because when I share the link to your post, the preview card might show information about your site, rather than the actual post. (e.g., “Sandra’s Awesome CSS Blog” vs “An Exciting Post About CSS.”). If the goal of the preview card is to convince readers to click through, then you definitely want the card to show information about your post, not your site as a whole.

### Learn more about Open Graph tags:

- [Open Graph specification](https://ogp.me)
- [IndieWeb Open Graph documentation](https://indieweb.org/The-Open-Graph-protocol)
- [Yoast SEO Open Graph documentation](https://developer.yoast.com/features/opengraph/functional-specification/)
- [How We Added Open Graph Tags to CloudFour.com](https://cloudfour.com/thinks/how-we-added-open-graph-tags-to-cloudfour-com/)

## Add a sharing image

A well-chosen sharing image can be the perfect teaser for your post, something that catches the audience’s attention and makes them want to click through to learn more. If you have a great sharing image, it absolutely increases the likelihood that I will share your post, and that readers will click through.

However, I understand not everyone is lucky enough to work with a talented cartoonist like my coworker Tyler, who has created some of the best sharing images here on Cloud Four. If that’s the case for you, I recommend a visit to [Unsplash](https://unsplash.com), which has an excellent collection of free images that you can use for your sharing image, often just for the cost of giving the creator an image credit at the bottom of your post.

Another increasingly common approach is to automatically generate sharing images for your posts by creating an image of the post’s title. This is better than no sharing image, but unless they’ve got a bit of design flair, it can feel bland or even repetitive, since the post title will usually be displayed near the post thumbnail in the preview card.

One thing I see people do that is actually _worse_ than providing no sharing image is to use a single sharing image for every page on your site, typically the site logo or a big photo of yourself. When readers see these seemingly random images in the preview card for your post, it can feel unintentional.

And to be clear, I’m not saying that a hand-crafted illustration is always better than a stock photo or a generated title card. For example, A stock photo of a footpath worn in the grass of a public space for a post about [“paving the cowpaths”](https://www.w3.org/TR/html-design-principles/#pave-the-cowpaths) for user accessibility is great. A stock photo of a boat anchor on a post about CSS anchor positioning is less interesting.

Here’s [some excellent advice on choosing stock photos](https://ia.net/topics/is-every-picture-worth-1000-words) for your post.

## Use a descriptive title

It’s always frustrating to share a well-written post with a title that communicates nothing about the topic of the post. Let me give you an example with two titles for a hypothetical post about the flexibility of CSS custom properties to allow users to override your theme’s default colors:

- You Can Go Your Own Way
- How to Empower Developers with Custom Properties

I understand if you feel the second title is bland or even boring. But you know what it does well? It tells me what the post is about. The first example might be clever in context, but if I can’t understand it until after I’ve read the post, then it’s failing to convince me to read in the first place.

## Add a blurb

Something I love, and will often copy directly into Friday Front-End posts, is when the author provides a TL;DR (Too Long; Didn’t Read) summary at the top of the post. Call it whatever you want: a blurb, a description, an excerpt, or a summary. The point is that it’s a short, punchy description that summarizes your post and convinces me to read.

There’s a sweet spot for length. Too short, and you won’t communicate enough. Too long, and I’ll just have to trim it to make it fit in a social media post. Here are two extreme examples:

- How to override theme colors with custom properties.
- CSS custom properties are a powerful tool that can empower developers and users alike. In this article, I’m going to show you how to make your theme fully customizable through the use of custom properties, discuss their limitations, explore browser support, and encourage you to adopt this fantastic tool into your arsenal.

The first is certainly an efficient description of the post topic. But it’s actually too short. There’s nothing there to convince me to read it. The second, on the other hand, is too verbose. I get distracted before I even finish reading it.

As a rule of thumb, I like to aim for 140 characters — a completely arbitrary length that happens to be half the length of a post on a certain social media site I don’t use anymore. That’s short enough to be easy to share in a social media post (along with the title and URL), but long enough to be able to tease the contents of the post.

## Use canonical URLs properly

Okay, this one’s getting into the weeds a bit, but it’s something to check on your site. Some CMS tools will automatically add a canonical URL tag. This is really useful if you have a post with multiple valid URLs, or if you’re syndicating content from one site to another, and want to make sure all the SEO traffic goes to the original site.

```html
<link rel="canonical" href="https://example.com" />
```

However, a surprisingly common problem I see is that a post will have a canonical URL tag that points to the _homepage_ of the site rather than the _post_ itself. This is an insidious issue because you can still go to the URL directly, but tools that understand the canonical URL will link to the wrong place.

I’m particularly aware of this because some of the tools I use to save links, like [Instapaper](https://www.instapaper.com/), will save the canonical URL if one is available. Which means when I go to review my links later, what’s actually been saved is a seemingly random link to someone’s homepage. If I’m lucky, I can skim their recent posts and remember the title of the post I tried to save, but sometimes I can’t figure it out, and their post doesn’t get shared.

So, please take a moment to view the source on one of your posts and, if you see a canonical URL tag, make sure it’s pointing to the correct URL.

## Add a date

This last tip is perhaps more specific to the front-end industry, but since web technologies change so quickly, it’s important to know that you’re not unintentionally sharing some out-of-date information. If you show the date your post was published somewhere, it’s easy for me to check that I’m not accidentally linking to something written a long time ago, which may no longer be valid.

## Conclusion

Putting out a weekly newsletter means I’m in the unusual position of getting a high-level overview of the most popular web development content being shared every week. It means I can spot some trends, see what people are interested in (or struggling with). It also means I see a wide variety of sites and how well they interact with common social media sharing tools. I hope this list of tips helps you avoid putting a lot of work into writing a post, only to see it struggle for views because it’s not easy to share.
