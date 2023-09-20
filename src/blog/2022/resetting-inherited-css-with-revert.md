---
title: Resetting Inherited CSS with “Revert”
date: 2022-03-23T16:53:29.000Z
date_updated: 2022-03-23T16:53:29.000Z
tags:
  - revert
  - reset
  - initial
  - inherit
  - css
canonical: https://cloudfour.com/thinks/resetting-inherited-css-with-revert/
feature_image: feature/robot-replace-code.png
---

For a recent project, we needed to take a small web application and embed it inside a client’s existing site. Typically, this means inheriting the site’s styles. However, in this case, the client wanted this app to follow a new design system that hadn’t been applied to the site yet.

That raised some issues for us. First, we needed to make sure none of the CSS we wrote for the new design would leak out to affect the rest of the site. Second, we had to ensure that none of the existing styles from the site affected our app. I’ll break down the steps we followed, but in a nutshell: [`all:revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) is a wonderful feature!

## Scoping our styles

All our styles needed to be scoped to a selector for our outermost element. Since we were using SCSS, this just required nesting:

```scss
// Everything must be scoped to our app!
.our-app-wrapper {

  // Our app styles
  ...
}
```

By doing this, we could ensure that none of the styles we wrote would affect the rest of the client’s site.

## Resetting the client’s styles

Preventing the existing styles from affecting our app was a bit trickier. Typically, the way we’d solve this problem is to review the CSS from the client’s site, and craft a reset stylesheet that would undo anything from their site that could affect us. Here’s an example of what that looks like:

```scss
.our-app-wrapper {

  // Client style overrides
  font-size: 16px; // client sets to 62.5%
  line-height: normal; // client sets to pixel values

  a {
    font-weight: inherit; // client sets to bold
    text-decoration: underline; // client disables underlines
  }

  h1, h2, h3, h4, h5, h6, p, label {
    font-family: inherit; // client sets the font on each element
    line-height: inherit; // client has some very small line-heights
  }

  // Our app styles
  ...
}
```

That’s just a small sample, but you get the idea. First, we unset the client’s styles inside our app’s wrapper, and then we could define our styles as if we were in a stand-alone app.

This works but is cumbersome and annoying to maintain. Thankfully, for this project, the client had dropped support for IE. That opened the door to using a wonderful CSS property that I’d never been able to use before due to a lack of IE11 support.

## all: revert;

Here’s the new hotness:

```scss
.our-app-wrapper {

  // Client style overrides
  all: initial;

  * {
    all: revert;
  }

  // Our app styles
  ...
}
```

In two lines of CSS, we manage to do everything our old reset stylesheet did!

The first thing to notice here is `all:revert`, which targets every element inside our app and resets everything to the browser’s default styles. Check out the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) for more information. Effectively, every element inside our app behaved like we were starting clean!

There is one gotcha, which is that the browser default for things like `color` and `font-size` is to inherit what was set on the parent. If you set `all:revert` on the `body`, that would be fine, but in our case, we’re only allowed to target our app’s wrapper element, so we’d still inherit a lot of values.

As a result, we went for the more aggressive `all:initial` on our app’s wrapper. The difference between the two is nicely summarized on MDN:

<aside>

**Note:** The [`revert`](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) keyword is different from and should not be confused with [`initial`](https://developer.mozilla.org/en-US/docs/Web/CSS/initial), which uses the [initial value](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value) defined on a per-property basis by the CSS specifications. In contrast, user-agent stylesheets set default values on the basis of CSS selectors. For example, the  initial value for the `display`  property is `inline`, whereas a normal user-agent stylesheet sets the default `display` value of `<div>`s to `block`, of `<table>`s to `table`, etc.

</aside>

By setting our app’s wrapper to `initial`, we were effectively removing all styles that would have been inherited, and allowing our app to move on in a clean state.

And it was just that simple!

## Well, almost…

We quickly noticed a problem. Our app uses SVGs for illustrations. They work great, and we’re really happy with them. But after I added the `revert` rules, they all disappeared!

It turns out that `all:revert` also affected all the `fill` attributes on our SVGs. This had the potential to be a serious problem. We could exclude SVGs from our `revert` styles, but then we’d have to deal with any CSS the client’s site was applying to SVGs. On the other hand, if we left the `revert` rule alone, we’d have to manually reset every `fill` rule using CSS. That would have been a maintenance nightmare.

Thankfully, they weren’t targeting SVGs, except for use elements. After reviewing our app, we only had one instance of a use element with a fill attribute, so we opted to reset that one fill by hand with CSS.

That meant our final reset stylesheet looked like this:

```scss
.our-app-wrapper {
  // Client style overrides
  all: initial;

  :where(*:not(svg, svg *), use) {
    all: revert;
  }

  // Our app styles
  use#figure-bg {
    fill: #fff;
  }
}
```

That’s a little complex, let me break it down:

First, we’ve replaced our `*` selector with `*:not(svg, svg *)`, which selects everything except svg elements and their children. This is so we don’t revert the fill values for most SVGs.

Next, we’ve wrapped the entire selector in `:where()`. [The `:where()` selector always has a specificity of `0`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), while `:not()` takes on the specificity of its contents. This caused a problem for us when we later used a `*` selector to apply `box-sizing` and found it overridden by the `:not()` selector applying `revert`. So, by wrapping the entire thing in `:where()`, we keep our specificity low, to avoid conflicts with our own code.

Then we’ve added `use` to the selector so that `use` elements will still get `revert` even though we’ve excluded SVG.

Finally, we target our single `use` element that has a fill and re-apply it manually.

## Revert is useful, but be careful!

All in all, I’m pleased I got a chance to use `all:revert`. It’s a powerful CSS ability that I’ve been aware of, but never had a chance to use due to browser support. Now that I have, I can say that it works great, but you do have to be a bit careful around values that can still be inherited like `display`, and also of values you don’t want to revert, like SVG `fill` attributes.
