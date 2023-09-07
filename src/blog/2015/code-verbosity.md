---
title: Code Verbosity
slug: code-verbosity
date: 2015-12-16T23:49:00.000Z
date_updated: 2018-08-20T11:51:25.000Z
tags:
  - refactoring
  - web development
  - css
feature_image: feature/verbosity.jpg
---

Recently I was refactoring some CSS, and I found something like this code snippet:

```css
body {
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.4;
}

h1 {
  font-family: serif;
  font-size: 36px;
  font-weight: bold;
}
```

Ugh, I thought, why so many lines? Let's use the shorthand syntax! So I refactored many instances of this code through our project and ended up with code like this:

```css
body {
  font: 14px/1.4 sans-serif;
}

h1 {
  font: bold 36px serif;
}
```

But there's a problem! Turns out when you use the shorthand syntax, any values you don't pass in get reset to their initial values. That's fine for things like bold and italic, but in this case I was accidentally resetting my `line-height` to `1`! Luckily, it was an easy fix using the `inherit` property.

```css
body {
  font: 14px/1.4 sans-serif;
}

h1 {
  font: bold 36px / inherit serif;
}
```

Of course, we use Sass, so the code actually looked like this:

```scss
$size-body: 14px;
$font-body: sans-serif;
$size-header: 36px;
$font-header: serif;
$weight-header: bold;

body {
  font: #{$size-body}/ 1.4 $font-body;
}

h1 {
  font: $weight-header $size-header/inherit $font-header;
}
```

Now the shorthand syntax has two problems. Firstly, with all those variables the shorthand syntax is actually _more_ difficult to read. Secondly, the shorthand `line-height` syntax looks like math. In order to keep Sass from trying to divide my `font-size` by my `line-height`, I have to wrap the variable in `#{}`, and even then it still looks like math to human developers.

So, as I see it, I have three options:

### 1. Use the Sass font shorthand

```scss
body {
  font: {
    family: $font-body;
    size: #{$size-body};
  }
  line-height: 1.4;
}

h1 {
  font: {
    family: $font-header;
    size: $size-header;
    weight: $weight-header;
  }
  line-height: inherit;
}
```

No one like this option. The Sass shorthand syntax means we're not writing recognizable CSS anymore, and it makes it more difficult to sort properties alphabetically. Moving on:

### 2. Use font shorthand, but set line-height separately.

```scss
body {
  font: #{$size-body} $font-body;
  line-height: 1.4;
}

h1 {
  font: $weight-header $size-header $font-header;
  line-height: inherit;
}
```

This isn't bad, but it feels inelegant, and those font shorthand rules are still really difficult to read with all the Sass variables.

### 3. Set each value separately.

```scss
body {
  font-family: $font-body;
  font-size: $size-body;
  line-height: 1.4;
}

h1 {
  font-family: $font-header;
  font-size: $size-header;
  font-weight: $weight-header;
  line-height: inherit;
}
```

Hey, this is great! Everything's nice and readable, and we can sort alphabetically again. Of course, you may have noticed the "problem" with this option:

It's the same code we started with.

Refactoring can be frustrating, because you can end up rejecting clever or space-saving solutions in favor of more readable or maintainable solutions. I was reminded of these quotes:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I&#39;m always a fan of making your code more verbose (and as a result, increase filesize some) to ensure it&#39;s easy to follow by others.</p>&mdash; Kyle Weems (@cssquirrel) <a href="https://twitter.com/cssquirrel/status/621697714556809216">July 16, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I have literally never regretted a choice to make some code more verbose. DRY, but verbose. <a href="https://t.co/8FKSjYKmDB">https://t.co/8FKSjYKmDB</a></p>&mdash; Ⓣab Ⓐtkins-Ⓑittner (@tabatkins) <a href="https://twitter.com/tabatkins/status/621699695304314881">July 16, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In the end, I'm not refactoring this code for my own immediate benefit. I'm refactoring while thinking of the poor slob who inherits this code months or years from now when I'm not around to explain it anymore. If breaking a shorthand up makes the code more readable, that's a trade-off I'm willing to make… especially after seeing the alternatives.

---

**Update:** Thanks to [Webucator](https://www.webucator.com/) for making a video from this post. You can see it and other educational videos on the [Webucator YouTube channel](https://www.youtube.com/user/WebucatorInc). They also offer [CSS training](https://www.webucator.com/webdesign/css.cfm).\_

<iframe width="1280" height="720" src="https://www.youtube.com/embed/-Jb1VjVjUXY" frameborder="0" allowfullscreen></iframe>

<small>Disclaimer: I was not paid for this link and have no business relationship with Webucator. I have not taken their CSS training, and this link does not constitute an endorsement on my part.</small>
