---
title: When to Nest CSS
date: 2023-10-05
tags:
  - css
  - nesting
excerpt: 'CSS nesting is great, but should be used with caution. As a rule, if a selector will work without being nested, don’t nest it. However, there are certain situations where nesting can make things easier to understand.'
canonical: https://cloudfour.com/thinks/when-to-nest-css/
feature_image: feature/css-nesting.jpg
---

With the recent news that [CSS nesting is now available in the major evergreen browsers](https://caniuse.com/css-nesting), our team was discussing how it [differs from nesting in Sass](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting), and the question came up — When should you use nesting?

There’s a simple answer and a slightly more complicated answer. The simple answer is “avoid nesting.” The more practical, but also more complex answer is “nest pseudo-selectors, parent modifiers, media queries, and selectors that don’t work without nesting.”

Let’s discuss it a little bit, but first, I’ll give my standard disclaimer: This is what works for our team, it’s not a carved-in-stone standard, and you’re welcome to ignore this advice if it doesn’t work for your situation.

## Avoid Nesting

We use [modular CSS](https://spaceninja.com/2018/09/18/what-is-modular-css/) naming conventions like [BEM](https://en.bem.info/methodology/naming-convention/) and [SUIT](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md). One thing these all have in common is a recommendation to decrease the specificity of your selectors whenever possible. This leads to practical guidance like avoiding ID selectors in favor of class selectors and avoiding cascading selectors whenever possible.

Here’s a practical example. If you’ve got a `.button` class and you’ve got a modifier to make it larger, like `.button.is-large`, that’ll work great — until someone adds a rule saying that buttons in the sidebar should be extra-large (`.sidebar .button`). Now even if you put the `.is-large` modifier on your sidebar button, it won’t change, because the sidebar rule came later in the stylesheet, and they’re equal specificity. Suddenly you’re caught in an arms race, updating the modifier to use `!important` or specificity hacks like `.button.button.is-large`.

When using BEM, we’d solve this by making two modifiers for the button: `.button--large` and `.button--x-large`. Now all the selectors have the same specificity, and problems are easier to solve.

As a result, our rule of thumb for nesting CSS selectors is **if a selector will work without being nested, then do not nest it**.

## What Should Be Nested

Of course, there are some selectors that _must_ be nested to work properly. Pseudo-classes, pseudo-elements, and certain modifier classes (like `.is-active`). As well, we prefer to nest media queries to improve the readability of our stylesheets. Finally, sometimes we use nesting to add styles relative to a parent modifier, and we prefer to nest those in the child selector to make them easier to find.

### Pseudo-Classes & Attribute Selectors

```css
/* without nesting */
a {
  color: red;
}

a:hover,
a:focus {
  color: blue;
}

a[aria-current='page'] {
  color: green;
}
```

```css
/* with nesting */
a {
  color: red;

  &:hover,
  &:focus {
    color: blue;
  }

  &[aria-current='page'] {
    color: green;
  }
}
```

In this case, nesting the pseudo-classes and attribute selectors increases the readability of the stylesheet and doesn’t change the specificity of the selector, so it’s an easy win.

### Pseudo-Elements

```css
/* without nesting */
blockquote {
  position: relative;
}

blockquote::before {
  content: "💬"
  left: -1em;
  position: absolute;
  top: 0;
}
```

```css
/* with nesting */
blockquote {
  position: relative;

  &::before {
    content: "💬"
    left: -1em;
    position: absolute;
    top: 0;
  }
}
```

Similar to the pseudo-class, this is a clear win for readability without increasing the specificity.

### Certain Modifier Classes

```css
/* without nesting */
.nav-link {
  color: red;
}

.nav-link.is-active {
  color: blue;
}
```

```css
/* with nesting */
.nav-link {
  color: red;

  &.is-active {
    color: blue;
  }
}
```

If this came up in a PR, my first question would be “Can we rename `.is-active` to a BEM or SUIT-style modifier class? The current name makes it sound like a utility class that can be used anywhere, but it’s actually specific to the `.nav-link` component. Changing it to `.nav-link--active` would communicate this, decrease specificity, and avoid nesting.”

That said, sometimes you don’t have control over a modifier class. This can happen if it’s being added by a third-party script or a WordPress plugin, for example. In that case, if you can’t change the modifier class, nesting at least improves the readability.

### Media Queries

```css
/* without nesting */
h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

@media (min-width: 40em) {
  h1 {
    font-size: 4em;
  }

  h2 {
    font-size: 3em;
  }
}
```

```css
/* with nesting */
h1 {
  font-size: 2em;

  @media (min-width: 40em) {
    font-size: 4em;
  }
}

h2 {
  font-size: 1.5em;

  @media (min-width: 40em) {
    font-size: 3em;
  }
}
```

Nesting media queries is one of my favorite uses of nesting, and this simplified example really doesn’t do it justice. In the real world, there are often dozens of rules under each of the selectors, so the non-nested media query can end up _way_ down the stylesheet, making maintenance difficult, since the rules that affect a single selector are scattered around the file.

Nesting media queries is a clear win for readability, and does not affect specificity at all.

### Parent Modifiers

```css
/* without nesting */
.card {
  background: white;
  color: black;
}

.card__title {
  font-weight: 700;
}

.theme--dark .card {
  background: black;
  color: white;
}

.theme--dark .card__title {
  font-weight: 600;
}
```

```css
/* with nesting */
.card {
  background: white;
  color: black;

  .theme--dark & {
    background: black;
    color: white;
  }
}

.card__title {
  font-weight: 700;

  .theme--dark & {
    font-weight: 600;
  }
}
```

Just like modifier classes, when you have an element you’re styling that needs to behave differently based on a parent selector, it makes things much easier to read when you can nest the changes directly, rather than having them occur further down the file.

### Cascade Layers?

When I wrote this, my coworker asked about nesting cascade layers. I’m going to level with you here: cascade layers are such a new feature that I haven’t used them anywhere yet. At a casual glance, I _think_ you can nest layer declarations like media queries, and it would probably add the same benefits. That said, I’m not confident enough to make a recommendation.

## Conclusion

CSS nesting is a great addition to the language, but it should be used with caution. Nesting increases specificity, which can lead to maintenance problems if you’re not careful. We recommend using a modular CSS naming convention like BEM or SUIT, which reduces the need for nesting in the first place. As a rule, **if a selector will work without being nested, then do not nest it.** However, there are certain situations (such as pseudo-selectors and media queries) where nesting can make things easier to understand.
