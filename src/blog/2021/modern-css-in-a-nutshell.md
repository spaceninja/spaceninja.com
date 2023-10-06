---
title: Modern CSS in a Nutshell
date: 2021-11-23T17:30:30.000Z
date_updated: 2021-11-23T17:30:30.000Z
tags:
  - variables
  - sass
  - postcss
  - grid
  - flexbox
  - customproperties
  - css
excerpt: A friend recently shared his frustration with CSS development. I responded to him with a high-level overview of the current state of CSS. If you’re feeling a bit out of touch with modern CSS development, I hope this helps. You’d be surprised how much you can do with vanilla CSS nowadays!
canonical: https://cloudfour.com/thinks/modern-css-in-a-nutshell/
feature_image: feature/fallback-code.png
hide_feature_image: true
---

A friend recently shared his frustration with CSS development:

> I think it’s time to admit I have no idea how CSS works anymore. Not even counting the CSS-in-JS stuff, which seems straightforward. Just the regular things that have been added since around 2015 I haven’t kept up with. Pre/post-processors make it so you can use new things sooner, I think? Also in Sass, I never used `@use`, `@mixin` and `@extend` thoroughly enough to learn them. It’s annoying that I was really on top of CSS and now it’s kinda unrecognizable.

I responded to him with a high-level overview of the current state of CSS, and I thought I’d share it here as well. What follows is just my opinion, and naturally, will not cover every nuance of every project’s needs. But if you, like my friend, are feeling a bit out of touch with modern CSS development, I hope this helps. If there’s a high-level takeaway, it’s this: **You’d be surprised how much you can do with vanilla CSS nowadays!**

Pre-processors like [Sass](https://sass-lang.com) are less useful than they used to be, but still enjoy widespread usage. If you’ve gone this long without using them, you can probably safely ignore them at this point, because just about everything Sass added has come to vanilla CSS (like [variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)) or is in the process (like [nesting](https://www.w3.org/TR/css-nesting-1/)).

Post-processors like [PostCSS](https://postcss.org) used to be a requirement if for no other reason than [Autoprefixer](https://github.com/postcss/autoprefixer). But with the [death of IE11](https://twitter.com/cramforce/status/1443962459723755533), Autoprefixer is effectively no longer needed. I think most teams that had a PostCSS-based workflow were using it to [opt into advanced CSS features](https://preset-env.cssdb.org/) before they had great browser support. However, I’ve found fewer cases where we needed PostCSS, because so many things are either supported now or will be soon. Again, if you’ve gone this long without diving into it, you can probably safely ignore it.

My friend mentioned already having a handle on [CSS-in-JS](https://css-tricks.com/a-thorough-analysis-of-css-in-js/), which is really just a buzzword for a CSS delivery mechanism. If your entire workflow is centered on JavaScript, some people prefer to manage their CSS with the same tools. It’s become increasingly common, especially in React projects. That said, there are _many_ different flavors, and until you work on a project that uses one, I would say it’s good enough to understand the basic concept, and then learn the syntax of the particular flavor your project uses when you need to know it.

Beyond what my friend mentioned, there are three killer features I strongly recommend learning. Getting these down will get you a _lot_ of what you need from modern CSS. In no particular order:

[**CSS Custom Properties**](https://css-tricks.com/a-complete-guide-to-custom-properties/), aka CSS Variables: You declare a variable like `--color-brand: #ff0000;` and then you can use it elsewhere: `.brand { color: var(--color-brand); }`. Variables were the single most compelling reason to use Sass, and now they’re in vanilla CSS with fantastic browser support. Plus, because Sass variables were only evaluated once when the Sass was processed, CSS variables are actually _more_ powerful, [because they’re dynamic!](https://css-tricks.com/making-custom-properties-css-variables-dynamic/)

[**Flexbox**](https://css-tricks.com/snippets/css/a-guide-to-flexbox/): Anytime you need to handle CSS layout along a single axis (such as the items in your primary navigation, or an icon with text in a button), you should be looking to Flexbox. The old joke that it’s impossible to vertically center things in CSS was [solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/demos/vertical-centering/). The syntax is a bit tricky, but once you’ve used it a few times, you’ll never go back. It’s fantastic.

[**CSS Grid**](https://css-tricks.com/snippets/css/complete-guide-grid/): Anytime you need to handle CSS layout for more than just a single line of items, you should look to CSS Grid. This is the newest kid on the block, but it already enjoys excellent browser support. Anything you would have done with a table layout back in the day, you’ll do with CSS Grid now. In some cases, it can even handle single-axis things better than Flexbox, but it’s worth having both in your toolbox. If you’re having trouble deciding which to use, [here’s some great advice from Rachel Andrew](https://www.smashingmagazine.com/2018/10/flexbox-use-cases/).

If you learn those three things, you’re really capable of a **lot** with CSS.

For anything beyond that, I’d recommend following [CSS Tricks](https://css-tricks.com/) and [Smashing Magazine](https://www.smashingmagazine.com/) for a good high-level overview of the front-end world. Of course, if you’ll pardon a bit of self-promotion, [Cloud Four’s blog](https://cloudfour.com/thinks/) and the [Friday Front-End](https://twitter.com/fridayfrontend) and [CSS Basics](https://twitter.com/cssbasics) twitter accounts aren’t too shabby either. 😉

One thing I’d like to push back on is the idea that you need to know _everything_ about CSS. That was arguably possible 10 years ago, but it’s certainly not any more. You wouldn’t expect to know everything about JavaScript or any other programming language. Similarly, with CSS you should have a high-level understanding of what’s possible, and a willingness to look up specific techniques as they become applicable to your tasks.

The short version of everything I just said is that CSS is **much** more powerful now than it was even just a few years ago. You can go a **long** way with vanilla CSS nowadays.
