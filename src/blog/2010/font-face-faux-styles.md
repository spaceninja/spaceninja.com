---
title: How to use @font-face to avoid faux-italic and bold browser styles
date: 2010-11-29T15:57:00.000Z
date_updated: 2018-09-18T05:18:59.000Z
tags:
  - typography
  - css
  - web development
original: http://metaltoad.com/blog/scott
feature_image: font-face-faux-styles/type-drawer.jpg
feature_source: https://unsplash.com/photos/zFz3jThypsA
feature_credit: Fabien Barral
---

Did you know that if you declare a custom font using `@font-face`, the browser will try to fake the bold and italic styles if it can't find them? This is a clever little feature that avoids a scenario where a designer specifies a font and is then confused that bold and italics don't work, but it can be very confusing if you actually have a bold or italic version of the font. In this article, I'll walk you through how to properly load your font files to avoid the browser's faux-italic and faux-bold styles.

<aside>

(If you're not interested in an explanation of the problem or the bad solution recommended by most font-embedding services, go ahead and skip down to [The Right Solution](#skip-right-solution).)

</aside>

## The Problem

First, to clarify: A _font_ is a file containing a particular _typeface_, which is a particular weight or style of a _type family_. eg, `garamond-bold.ttf` is the font copy of Garamond Bold, a typeface from the Garamond family. In CSS terms, you load a font file using `@font-face` declarations, which append that font to a `font-family`.

The problem, as you can see in this screenshot, is that if you only load one font into the family, then the browser doesn't know what to do when it's asked to render a bold or italic section using that font. It solves this by creating a faux-bold style by stretching the letters horizontally, and a faux-italic style by slanting the letters.

<figure>

<img webc:is="eleventy-image" :src="imgPath('font-face-faux-styles/problem.png')" alt="Comparing the browser's faux italic and bold styles to the true fonts">

<figcaption>

Figure A: Comparison of faux browser styles and true typefaces

</figcaption>
</figure>

The browser's brute-force approach to creating these faux styles leaves a lot to be desired. In particular, note the proper italic font includes a variant lowercase 'a' without the ascender, and bold characters have an even thickness to the stroke, rather than the wider vertical strokes on the faux-bold.

## The Wrong Solution

The common technique shared by many font services like FontSquirrel or WebINK is to create additional `@font-face` declarations, creating a new `font-family` definition for each font weight and style. Then you apply the regular font to the target, and write rules to apply the bold or italic fonts on any nested elements, like so:

<!--prettier-ignore-->
```css
@font-face {
    font-family: 'UbuntuRegular';
    src: url('Ubuntu-R-webfont.eot');
    src: url('Ubuntu-R-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-R-webfont.woff') format('woff'),
         url('Ubuntu-R-webfont.ttf') format('truetype'),
         url('Ubuntu-R-webfont.svg#UbuntuRegular') format('svg');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'UbuntuItalic';
    src: url('Ubuntu-RI-webfont.eot');
    src: url('Ubuntu-RI-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-RI-webfont.woff') format('woff'),
         url('Ubuntu-RI-webfont.ttf') format('truetype'),
         url('Ubuntu-RI-webfont.svg#UbuntuItalic') format('svg');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'UbuntuBold';
    src: url('Ubuntu-B-webfont.eot');
    src: url('Ubuntu-B-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-B-webfont.woff') format('woff'),
         url('Ubuntu-B-webfont.ttf') format('truetype'),
         url('Ubuntu-B-webfont.svg#UbuntuBold') format('svg');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'UbuntuBoldItalic';
    src: url('Ubuntu-BI-webfont.eot');
    src: url('Ubuntu-BI-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-BI-webfont.woff') format('woff'),
         url('Ubuntu-BI-webfont.ttf') format('truetype'),
         url('Ubuntu-BI-webfont.svg#UbuntuBoldItalic') format('svg');
    font-weight: normal;
    font-style: normal;
}
.test {
  font-family: UbuntuRegular, arial, sans-serif;
}
.test em {
  font-family: UbuntuItalic, arial, sans-serif;
}
.test strong {
  font-family: UbuntuBold, arial, sans-serif;
}
.test strong em {
  font-family: UbuntuBoldItalic, arial, sans-serif;
}
```

However, doing that actually results in what you see here, where the browser still applies its own faux bold and italic styles on top of the hard-coded bold and italic fonts you defined.

<figure>

<img webc:is="eleventy-image" :src="imgPath('font-face-faux-styles/worst.png')" alt="Double-italic and bold styles">

<figcaption>

Figure B: Faux browser styles applied on top of proper italic and bold fonts

</figcaption>
</figure>

To solve that problem, you reset `font-weight` and `font-style` on the nested styles to disable the faux browser styles.

```css
.test {
  font-family: UbuntuRegular, arial, sans-serif;
}
.test em {
  font-family: UbuntuItalic, arial, sans-serif;
  font-style: normal;
}
.test strong {
  font-family: UbuntuBold, arial, sans-serif;
  font-weight: normal;
}
.test strong em {
  font-family: UbuntuBoldItalic, arial, sans-serif;
  font-style: normal;
  font-weight: normal;
}
```

And it seems to work perfectly! Your custom bold and italic fonts are loaded properly, and the faux styles are nowhere to be seen! The problem is that if your custom font doesn't load for some reason, the browser is no longer applying bold or italic styles to the fallback font.

<figure>

<img webc:is="eleventy-image" :src="imgPath('font-face-faux-styles/wrong.png')" alt="Fallback font with no bold or italics">

<figcaption>

Figure C: No bold or italic styles if custom font fails to load

</figcaption>
</figure>

So I think we can agree that this solution doesn't work. It requires a lot of CSS to override built-in browser styles, and it breaks completely when the custom font doesn't load. Luckily, there's a better solution:

## The Right Solution

Instead of defining separate `font-family` values for each font, You can use same `font-family` name for each font, and define the matching styles, like so:

<!--prettier-ignore-->
```css
@font-face {
    font-family: 'Ubuntu'; /* regular */
    src: url('Ubuntu-R-webfont.eot');
    src: url('Ubuntu-R-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-R-webfont.woff') format('woff'),
         url('Ubuntu-R-webfont.ttf') format('truetype'),
         url('Ubuntu-R-webfont.svg#UbuntuRegular') format('svg');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Ubuntu'; /* italic */
    src: url('Ubuntu-RI-webfont.eot');
    src: url('Ubuntu-RI-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-RI-webfont.woff') format('woff'),
         url('Ubuntu-RI-webfont.ttf') format('truetype'),
         url('Ubuntu-RI-webfont.svg#UbuntuItalic') format('svg');
    font-weight: normal;
    font-style: italic;
}
@font-face {
    font-family: 'Ubuntu'; /* bold */
    src: url('Ubuntu-B-webfont.eot');
    src: url('Ubuntu-B-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-B-webfont.woff') format('woff'),
         url('Ubuntu-B-webfont.ttf') format('truetype'),
         url('Ubuntu-B-webfont.svg#UbuntuBold') format('svg');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'Ubuntu'; /* bold italic */
    src: url('Ubuntu-BI-webfont.eot');
    src: url('Ubuntu-BI-webfont.eot?#iefix') format('embedded-opentype'),
         url('Ubuntu-BI-webfont.woff') format('woff'),
         url('Ubuntu-BI-webfont.ttf') format('truetype'),
         url('Ubuntu-BI-webfont.svg#UbuntuBoldItalic') format('svg');
    font-weight: bold;
    font-style: italic;
}
```

Then all you need to do is apply that single `font-family` to your target, and any nested bold or italic styles will _automatically_ use the correct font, and still apply bold and italic styles if your custom font fails to load.

<figure>

<img webc:is="eleventy-image" :src="imgPath('font-face-faux-styles/right.png')" alt="correct fonts, with fallback styles">

<figcaption>

Figure D: Properly defined italic and bold fonts with fallback styles

</figcaption>
</figure>

You can see a live example of these problems and the final solution on the [demo page](http://oscorp.net/projects/font-face/).

### Seriously, Microsoft?

<figure>

<img webc:is="eleventy-image" :src="imgPath('font-face-faux-styles/font_face_comparison.png')" alt="Comparing font-face rendering between Mac and Win XP">

<figcaption>

Figure E: Comparison of @font-face on Macintosh and Windows XP

</figcaption>
</figure>

Also, I know it's old news that type rendering on Macintosh is better than Windows, but seriously, when I see results like this (look at the lowercase 'd' - it's a travesty!), I consider telling my clients it's not worth it, because their beautiful custom fonts are going to look awful to over half the visitors to their website. I've heard Windows 7 has better rendering, but I don't have a copy to test. All I can do at this point is trust that things will continue to improve, and enjoy how pretty things look on my Mac.
