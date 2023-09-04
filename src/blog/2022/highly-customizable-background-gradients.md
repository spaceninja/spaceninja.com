---
title: Highly Customizable Background Gradients
slug: highly-customizable-background-gradients
date: 2022-10-18T16:13:35.000Z
date_updated: 2022-10-18T16:13:35.000Z
tags:
  - components
  - gradients
  - customproperties
  - variables
  - css
excerpt: How to create a complex but highly customizable background gradient that can be modified easily using CSS custom properties.
canonical: https://cloudfour.com/thinks/highly-customizable-background-gradients/
feature_image: /images/feature/background-gradients.jpg
---

A recent project I worked on had a common design element across many pages: A cool-looking gradient background composed of multiple color “spotlights.” The colors of the spotlights varied from page to page, as well as their placement. The gradient only covered the header on some pages, while on others it extended further down… sometimes covering the entire page!

<p class="codepen" data-height="530" data-default-tab="result" data-slug-hash="KKRWvdO" data-user="spaceninja" style="height: 530px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/KKRWvdO">
  Highly Customizable Background Gradients</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Historically, this would have been a difficult challenge. Before browsers had good support for CSS radial gradients, you could only do this with background images. Each variation would require a new image, and the full-page versions would have suffered from performance problems or unsightly compression artifacts.

Even after CSS radial gradients arrived, the variations would have caused a problem. Likely, I would have created a `.bg-gradient` class, and added a bunch of modifiers like `.bg-gradient—full-bleed` to override the CSS in certain situations. The performance problem from the images would be gone, but you couldn’t easily create new variations without making new CSS modifier classes.

My preferred technique for something like this is to turn to CSS variables — aka, custom properties — to allow me to create a single CSS class with intelligent defaults that can be easily overridden. Check this out:

<!-- prettier-ignore -->
```css
.fancy-gradient {
  background-color: var(--gradient_bg_color);
  background-image: radial-gradient(
      var(--gradient_spot1_w) var(--gradient_spot1_h)
      at left var(--gradient_spot1_x) top var(--gradient_spot1_y),
      var(--gradient_spot1_color),
      transparent
    ),
    radial-gradient(
      var(--gradient_spot2_w) var(--gradient_spot2_h)
      at left var(--gradient_spot2_x) top var(--gradient_spot2_y),
      var(--gradient_spot2_color),
      transparent
    ),
    radial-gradient(
      var(--gradient_spot3_w) var(--gradient_spot3_h)
      at left var(--gradient_spot3_x) top var(--gradient_spot3_y),
      var(--gradient_spot3_color),
      transparent
    ),
    radial-gradient(
      var(--gradient_spot4_w) var(--gradient_spot4_h)
      at left var(--gradient_spot4_x) top var(--gradient_spot4_y),
      var(--gradient_spot4_color),
      transparent
    );
}
```

You can see that the color, size, and position of each color spotlight are defined as custom properties. We initially set those in the `:root` element, so anywhere this class is used, it will have the default values available. But you can easily override some or all of those custom properties on any page to change the background.

Something I love about custom properties is that they can be easily set via CSS, HTML, or JavaScript. They don’t require Sass or rebuilding the entire pattern library. You can easily set custom properties inline using an HTML `style` attribute. If someone on the dev team is already writing JavaScript for a page and doesn’t want to touch the CSS, they can set the custom properties directly in the JS. And, of course, they can be set directly in the site’s CSS.

Let me show you how easy it is:

<p class="codepen" data-height="530" data-default-tab="result" data-slug-hash="jOxLYQX" data-user="spaceninja" style="height: 530px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/jOxLYQX">
  Watermelon Variation</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```css
--gradient_bg_color: #ff426c; /* raspberry */

--gradient_spot1_color: #82002c; /* dark raspberry */
--gradient_spot2_color: #82002c;
--gradient_spot1_w: 80vw;
--gradient_spot2_w: 80vw;
--gradient_spot1_h: 30vh;
--gradient_spot2_h: 30vh;

--gradient_spot3_color: #009f78; /* aquamarine */
--gradient_spot4_color: #009f78;
```

To make a “watermelon” variation we’ve updated the colors of all the spotlights as well as the background to give a more fruity style. Then we changed the size of the top left and top right spotlights and set them to the same color to make them look more like a single shadow stretching across the top of the viewport.

<p class="codepen" data-height="530" data-default-tab="result" data-slug-hash="eYrEyoY" data-user="spaceninja" style="height: 530px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/eYrEyoY">
  Royal Rainbow Variation</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```css
--gradient_spot1_color: #db0072; /* rose */
--gradient_spot1_w: 50vw;
--gradient_spot1_h: 100vh;
--gradient_spot1_x: -10%;
--gradient_spot1_y: 80%;

--gradient_spot2_color: #ffe53e; /* yellow */
--gradient_spot2_w: 50vw;
--gradient_spot2_h: 100vh;
--gradient_spot2_x: 25%;
--gradient_spot2_y: 60%;

--gradient_spot3_color: #00ffe4; /* teal */
--gradient_spot3_w: 50vw;
--gradient_spot3_h: 100vh;
--gradient_spot3_x: 55%;
--gradient_spot3_y: 40%;

--gradient_spot4_color: #d150ff; /* purple */
--gradient_spot4_w: 50vw;
--gradient_spot4_h: 100vh;
--gradient_spot4_x: 90%;
--gradient_spot4_y: 20%;
```

This rainbow example goes further by adjusting the position of all four spotlights from the corners to display in a diagonal across the viewport, matching the angle of the text. Even though there are only four spotlights, the blending between them manages to produce a complex rainbow.

And for fun, here’s an interactive version. It will even show you the custom properties you need to override to create your version.

<p class="codepen" data-height="1250" data-default-tab="result" data-slug-hash="JjvJxQB" data-user="spaceninja" style="height: 1250px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/JjvJxQB">
  Highly Customizable Background Gradient Demo</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Conclusion

When I sat down to write this article, I realized that the point for me wasn’t “look at this cool gradient I built.” (Although it _is_ pretty slick, if I do say so myself.) It’s to encourage you (and remind myself) to look for opportunities to make the things you build customizable.

Even if you don’t expect it to be reused, it might open possibilities you weren’t expecting, or allow it to be used in new contexts. The easiest way to do this is when you find yourself hard-coding a value, consider making it a variable instead. I’ve never regretted making something customizable, but I’ve often had to refactor something that was only designed to be used in one way.
