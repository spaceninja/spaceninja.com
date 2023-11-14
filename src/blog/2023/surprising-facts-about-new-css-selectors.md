---
title: Surprising Facts About New CSS Selectors
date: 2023-11-07
tags:
  - css
  - pseudo-classes
  - selectors
  - specificity
excerpt: 'I set out to learn a bit about how CSS nesting works, especially the new & selector, and I ended up on a deep dive into the :is() selector and its siblings.'
canonical: https://cloudfour.com/thinks/surprising-facts-about-new-css-selectors/
feature_image: feature/new-selectors.png
---

I went down a bit of a rabbit-hole recently learning about [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting), specifically regarding the new `&` selector. I heard that it behaves like the `:is()` selector, and in the course of researching, I learned a lot about how these new selectors work.

The first thing to know is that `is()` and its siblings `:not()`, `:has()`, and `:where()` are a new[^1] type of selector called [functional pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes%23functional_pseudo-classes). We’ve had simple pseudo-classes like `:hover` for a long time, but the ability to pass a selector list as a parameter is what distinguishes these four into a new category.

[^1]: There may be some graybeards in the audience who are saying “Now wait just a minute here, `:not()` isn’t new, it was added back in IE9!” Yes, technically `:not()` is the older sibling here, introduced in the [Selectors Level 3](https://www.w3.org/TR/2018/REC-selectors-3-20181106/) specification. The rest were introduced in [Selectors Level 4](https://w3c.github.io/csswg-drafts/selectors/%23negation). However, at the same time, `:not()` was changed from only accepting a simple selector to accepting a selector list like the others, so it’s easiest to think of it as a complete rewrite and consider these selectors as a group.

Here’s a quick review of the new selectors we’ll be discussing today, and then we’ll dive into the surprising things I learned:

- The [Matches-Any Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:is), `:is()`, accepts a comma-separated list of selectors and matches any element that can be selected by one of the items in the list. For example, `:is(article, section, aside) h1` will match any `h1` element that is contained in an `article`, `section`, or `aside` element.
- The [Negation \(or Matches-None\) Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:not), `:not()`, represents elements that do not match a list of selectors. For example, `li:not(:last-child)` will select any list item that is not the last item in the list.
- The [Relational Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), `:has()`, is a way to select a parent element based on its children or siblings. For example, `h1:has(+ p)` will only apply to `h1` elements that are immediately followed by a `p` element.
- The [Specificity-adjustment Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:where), `:where()`, behaves like the `:is()` selector, but its specificity is always zero.
- The [Nesting Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector), `&`, represents the elements matched by the parent rule in CSS Nesting, and behind the scenes, it’s treated as an `:is()` selector.

## Specificity

One of the most interesting properties of these new selectors is how they interact with specificity. A deep dive on specificity is beyond the scope of this article, but it’s enough to understand that an ID is more specific than a class, which is more specific than an element selector.

<!-- prettier-ignore -->
```css
#unique { color: red; }
.intro { color: orange }
p { color: green; }
```

<!-- prettier-ignore -->
```html
<p class="intro" id="unique">This will be red</p>
```

The paragraph will be red, because the ID selector is the most specific.

So what happens with a pseudo-class that accepts a comma-separated list of selectors, like `:is()`, `:not()`, and `:has()`? The specificity of the pseudo-class is determined by the most specific selector in the list.

<!-- prettier-ignore -->
```css
:is(#unique, p) { color: red; }
.intro { color: green; }
```

<!-- prettier-ignore -->
```html
<p class="intro">This will also be red</p>
```

You might expect the paragraph to be green, because it doesn’t have the `#unique` ID. But in this case, the most specific item in the list is the ID, so that will be the specificity of the `:is()` selector. As a result, even though the ID doesn’t apply in this case, it still affects the specificity.

One interesting variation on this behavior is the `:where()` selector, which behaves exactly the same as the `:is()` selector, except it _always_ has zero specificity.

<!-- prettier-ignore -->
```css
:where(#unique, .intro) { color: red; }
p { color: green; }
```

<!-- prettier-ignore -->
```html
<p class="intro" id="unique">This will be green.</p>
```

This is especially useful if you’re writing CSS that you want to be easy to override, such as the default styles in a WordPress theme or a third-party library.

## Forgiving Selector Lists

When you construct a [selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list) in standard CSS, if any selector in the list is invalid — such as `.valid-class, :invalid-pseudo-class` — the entire style block will be ignored.

Now, you might be thinking “Who would add an invalid selector to their CSS?” An example of when you might have to do this is browser-prefixed selectors. Say if you wanted to use the `:fullscreen` pseudo-class, but needed to support some older browsers that only understand the webkit prefixed version. You would need to write this:

<!-- prettier-ignore -->
```css
:-webkit-full-screen { border-color: green; }
:fullscreen { border-color: green; }
```

If you tried to use a comma-separated list, then a browser that doesn’t understand `:fullscreen` would fail. As a result, you have to duplicate the style block for each selector.

Thankfully, most of the new pseudo-classes, like `:is()` and `:where()`, accept what the specification calls a [forgiving selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list#forgiving_selector_list), meaning any invalid selectors in the list will be ignored, but the valid ones will still be used.

<!-- prettier-ignore -->
```css
:is(.valid-class, :invalid-pseudo-class) { ... }
```

The browser will ignore `:invalid-pseudo-class` but still apply the rule to `.valid-class`.

Unfortunately, the `:not()` pseudo-class uses the unforgiving selector list, so adding any invalid selectors to the list will cause the entire style block to be ignored. However, there’s a rather silly solution: Just wrap the selector list in an `:is()` pseudo-class:

<!-- prettier-ignore -->
```css
:not(:is(.valid-class, :invalid-pseudo-class)) { ... }
```

This has the effect of letting `:is()` strip any invalid selectors from the list, and pass the remaining selectors on to `:not()`.

Until recently, the `:has()` pseudo-class also used the forgiving selector list, but they had to [revert this in late 2022 to avoid a conflict with jQuery](https://github.com/w3c/csswg-drafts/issues/7676#issuecomment-1341347244). Now, if you might have an invalid selector being passed to `:has()`, you can use the same `:has(:is())` trick to prevent it from breaking.

## Things to Note

There are a few things about these new selectors that may surprise you if you’re not careful. Here are a few that I’ve noticed:

- You can’t select pseudo-elements using the new selectors. Writing  `a:is(::before, ::after)` won’t work. [The reason for this is complicated](https://github.com/w3c/csswg-drafts/issues/2284#issuecomment-364580632).
- Be careful! `.a .b .c`￼is not the same as `.a :is(.b .c)`. The first matches any `.c` that is a child of `.b` that is a child of `.a`. The second matches any `.c` that is a child of `.a` and `.b`, regardless of order! [Learn more in this excellent post](https://www.bram.us/2023/01/17/using-is-in-complex-selectors-selects-more-than-you-might-initially-think/) by Bramus Van Damme
- The `:not()` selector will match everything that is "not an X". For instance, `body :not(table) a` will still apply to links inside a `<table>` , since `<tr>`, `<tbody>`, `<th>`, `<td>`, `<caption>`, etc. can all match the `:not(table)` part of the selector.
- You may come across older articles saying that `:not()` can only accept simple selectors, and if you need to target multiple items, you’d chain them like `:not(.foo):not(.bar)`. This is outdated. The syntax has since been updated in version four of the selectors specification to accept a selector list, so you can now do `:not(.foo, .bar)`.
- You can [test for support of the new selectors](https://polypane.app/blog/where-is-has-new-css-selectors-that-make-your-life-easier/#browser-support) by using the `selector()` function in a `@supports` rule, like so: `@supports selector(:is(*))`. Although the `selector()` function is relatively new itself, [it has excellent support](https://caniuse.com/mdn-css_at-rules_supports_selector).

## Nesting Selector

Okay, let’s talk about the reason I went down this rabbit hole at all — the `&` nesting selector! This new selector was added for [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting) (though it can be used in other contexts, such as [CSS Scoping](https://developer.chrome.com/articles/at-scope/#the-difference-between-scope-and-inside-scope)). When used in CSS Nesting, the `&` will be replaced with the parent style rule’s selector, with the same specificity as if they were wrapped with `:is()`.

<!-- prettier-ignore -->
```css
a {
  &:hover { color: rebeccapurple; }
}

/* will be treated like */
:is(a):hover { color: rebeccapurple; }
```

In most cases this won’t make a difference, it’s just interesting to note, but it could produce some unwanted side effects.

<!-- prettier-ignore -->
```css
#card, .card {
  .featured & { color: cornflowerblue; }
}

/* will be treated like */
.featured :is(#card, .card) { color: cornflowerblue; }
```

Since the `&` selector includes an ID, the resulting rule will use the specificity of the ID. So be aware of the potential for unexpected specificity conflicts when using `&`.

It’s also worth noting that since the nesting selector behaves like the `:is()` selector, it also can’t represent pseudo-elements.

<!-- prettier-ignore -->
```css
a, a::before, a::after {
  color: red;

  &:hover { color: blue; }
}

/* will be treated like */
a, a::before, a::after {
  color: red;
}
a:hover {
  color: blue;
}
```

As you can see, the pseudo-elements are ignored in the hover state in the final rule.

## Conclusion

I set out to learn a bit about how CSS nesting works, especially the new `&` selector, and I ended up on a deep dive into the `:is()` selector and its siblings. I learned much more than I expected to, and came away with a better understanding of how they interact with specificity, and why some are more forgiving than others. I hope this was as useful for you.
