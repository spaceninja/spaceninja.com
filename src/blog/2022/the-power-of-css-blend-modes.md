---
title: The Power of CSS Blend Modes
date: 2022-09-13T17:07:54.000Z
date_updated: 2022-09-16T21:42:16.000Z
tags:
  - blend-mode
  - filters
  - css
excerpt: I knew CSS blend modes could create some cool effects, but even so, a CodePen I saw recently left me shocked at what they’re capable of.
canonical: https://cloudfour.com/thinks/the-power-of-css-blend-modes/
feature_image: css-blend-modes/css-filters-layers-rainbow@2x.jpg
hide_feature_image: true
---

<p class="codepen" data-class="aspect-ratio--4x3"  data-default-tab="result" data-slug-hash="gOvXodv" data-user="scottkellum">
  <span>See the Pen <a href="https://codepen.io/scottkellum/pen/gOvXodv">
  Apple inspired Pride clock</a> by Scott Kellum (<a href="https://codepen.io/scottkellum">@scottkellum</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

This [Apple-inspired pride clock](https://codepen.io/scottkellum/pen/gOvXodv) demo, by [Scott Kellum](https://codepen.io/scottkellum), really caught my eye. I could see it was HTML text for the numbers, but I wasn’t sure how he created the radial line effect. When I dug into the code, I was shocked by how little CSS it took to create the effect. Here’s a layered breakdown to make it easier to visualize:

<img src="{{ 'css-blend-modes/css-filters-layers-rainbow@2x.jpg' | imgPath }}" alt="A diagram showing the layers used to create a rainbow lined effect with CSS.">

The bottom-most layer is a simple repeating radial gradient, alternating between gray and white:

```css
background: repeating-radial-gradient(
  circle at -150% -25%,
  #fff,
  #777 0.025em,
  #fff 0.05em
);
```

If you’re not familiar with the syntax, this says “make a gradient going from white, to gray at the midpoint, and back to white, then repeat that gradient radiating from the origin point, which is offscreen.” That’s what gives us the first layer in the illustration above.

The second layer is just some HTML text displaying the current time. The text is rotated (to roughly match the angle of the radial gradient), blurred, and a bit see-through:

```css
filter: blur(0.0125em);
transform: rotate(6deg);
opacity: 0.46;
```

When you stack those two layers together, you get the third layer in the diagram.

Here’s where it gets interesting. The fourth layer uses the same repeating radial gradient, but rather than alternating between white and gray, it steps through the rainbow, with hard color stops so there’s no blending.

This rainbow layer gets a blend mode, which causes it to act as a filter on the layers behind it:

```css
mix-blend-mode: lighten;
```

That’s all it takes to produce the fifth layer in the diagram, which colorizes the background lines and the text.

And the final step is perhaps the simplest of all: The container for the entire thing gets an extreme contrast filter applied:

```css
filter: contrast(2000%);
```

This forces all the gray colors in the background and the text to pure black or white — and anywhere they overlap, gets that neat effect that makes the line look like it’s thickening or thinning to make the numbers, while the rainbow overlay makes each line into a single solid color.

**Edit:** Scott pinged me on Twitter and let me know [I got the order slightly wrong here](https://twitter.com/ScottKellum/status/1570885117941514240). The contrast filter is applied _before_ the color layer, because the contrast impacts how the colors are rendered. Thanks, Scott!

It’s elegant! Just a few lines of CSS and a simple set of layers are converted into something much more complex! It immediately got me thinking: could I use this technique to make a photo filter?

## Radial Engraving Filter

<p class="codepen" data-class="aspect-ratio--4x3" data-default-tab="result" data-slug-hash="wvymgba" data-user="spaceninja">
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/wvymgba">
  CSS Radial Engraving Photo Filter</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

[My first experiment](https://codepen.io/spaceninja/pen/wvymgba) was basically replicating the radial lines effect from the previous example and applying it to a photo to make a sort of radial engraving effect, similar to what you might see on a bank note or a [newspaper hedcut](https://en.wikipedia.org/wiki/Hedcut).

<img src="{{ 'css-blend-modes/css-filters-layers-radial@2x.jpg' | imgPath }}" alt="A diagram showing the layers used to create a radial engraving effect with CSS.">

The first step is exactly the same. Create a repeating radial gradient that goes behind the image:

```css
background: repeating-radial-gradient(
  circle at 0 -25%,
  #fff,
  #333 0.25em,
  #fff 0.5em
);
```

I set a different origin point and a darker shade of gray, but it’s otherwise the same.

Next, I positioned the image on top and added some filters. I converted the image to grayscale, tweaked the brightness and contrast a bit, and applied a bit of a blur (this effect works better with softer focus).

<!-- prettier-ignore -->
```css
filter:
  grayscale(1)
  brightness(90%)
  contrast(150%)
  blur(3px);
```

Then I applied a blend mode of hard-light, which let the background gradient bleed through the entire photo.

```css
mix-blend-mode: hard-light;
```

What you see in the third layer is the result, which should look similar to the previous example before the rainbow overlay and contrast were added.

The final step is still an extreme contrast filter applied to the entire container:

```css
filter: contrast(500%);
```

And hey presto! Look at that! A convincing woodcut or engraving effect applied to a photo from just a few lines of CSS!

But it got me thinking. Being a comic book fan, I wondered… could this same technique produce a [halftone](https://en.wikipedia.org/wiki/Halftone) filter?

## Halftone Filter

<p class="codepen" data-class="aspect-ratio--4x3"  data-default-tab="result" data-slug-hash="oNEOXRZ" data-user="spaceninja" >
  <span>See the Pen <a href="https://codepen.io/spaceninja/pen/oNEOXRZ">
  CSS Halftone Filter</a> by Scott Vandehey (<a href="https://codepen.io/spaceninja">@spaceninja</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I’m pleased to say the answer is yes!

<aside>

**Update:** This halftone filter is [now available as a web component!](https://github.com/spaceninja/half-tone)

</aside>

<img src="{{ 'css-blend-modes/css-filters-layers-halftone@2x.jpg' | imgPath }}" alt="A diagram showing the layers used to create a halftone effect with CSS.">

My second experiment made only one change to the formula. Rather than a radial gradient to make lines in the background, I used a single gradient “dot” as a repeating background.

```css
background: radial-gradient(circle at center, #333, #fff);
background-size: 0.5em 0.5em;
transform: rotate(20deg);
```

By setting a background size, the single gray circle gradient I’ve defined is repeated across the entire canvas. The rotation is optional, but halftone dots can look unnatural if they’re straight. (When halftone is used for color images, each color is always offset a few degrees from the others to avoid a [moiré pattern](https://en.wikipedia.org/wiki/Moir%C3%A9_pattern).)

When these uniform dots are overlaid with the photo and run through an extreme contrast filter, the same effect happens — all shades of gray are forced to either pure black or pure white. But rather than thickening and thinning of lines, it now results in the size of the dots growing and shrinking!

## Conclusion

I couldn’t be more pleased with these experiments. I consider myself pretty well informed about what CSS is capable of, but I was shocked to discover how easily you can create something like an engraving or halftone photo filter using just a few lines of CSS!

Either of these could be fun effects for a design like an old newspaper page or a xeroxed punk show flyer.

Have you created any cool filters using CSS blend modes?

<aside>

💡 Sidenote: Even the [illustrations for this blog post](https://codepen.io/tylersticka/pen/oNqoJqd) were created by [Tyler](https://cloudfour.com/is/tyler/) using CSS!

</aside>
