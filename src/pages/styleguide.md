---
title: Styleguide
slug: styleguide
permalink: styleguide/
date: 2014-02-18T18:53:23.000Z
date_updated: 2018-08-20T11:51:25.000Z
---

You're in! Nice. We've put together a little post to introduce you to the Ghost editor and get you started. Go ahead and edit this post to get going and learn how it all works!

## Getting Started

Writing in markdown is really easy. In the left hand panel of Ghost, you simply write as you normally would. Where appropriate, you can use _formatting_ shortcuts to style your content. For example, a list:

- Item number one
- Item number two
  - A nested item
- A final item

or with numbers!

1. Remember to buy some milk
2. Drink the milk
3. Tweet that I remembered to buy the milk, and drank it

### Links

Want to link to a source? No problem. If you paste in url, like http://ghost.org - it'll automatically be linked up. But if you want to customise your anchor text, you can do that too! Here's a link to [the Ghost website](http://ghost.org). Neat.

### What about Images?

Images work too! Already know the URL of the image you want to include in your article? Simply paste it in like this to make it show up:

![A Cat](https://source.unsplash.com/800x450/daily?cats)

Not sure which image you want to use yet? That's ok too. Leave yourself a descriptive placeholder and keep writing. Come back later and drag and drop the image in to upload:

![A bowl of bananas]

### Quoting

Sometimes a link isn't enough, you want to quote someone on what they've said. It was probably very wisdomous. Is wisdomous a word? Find out in a future release when we introduce spellcheck! For now - it's definitely a word.

> Wisdomous - it's definitely a word.

### Working with Code

Got a streak of geek? We've got you covered there, too. You can write inline `code` blocks really easily with back ticks. Want to show off something more comprehensive? 4 spaces of indentation gets you there.

    .awesome-thing {
        display: block;
        width: 100%;
    }

### Ready for a Break?

Throw 3 or more dashes down on any new line and you've got yourself a fancy new divider. Aw yeah.

---

### Advanced Usage

There's one fantastic secret about Markdown. If you want, you can write plain old HTML and it'll still work! Very flexible.

<input type="text" placeholder="I'm an input field!" />

That should be enough to get you started. Have fun - and let us know what you think :)

---

## Body Copy

Lorem ipsum dolor sit amet, [test link](http://example.com) adipiscing elit. **This is strong.** Nullam dignissim convallis est. Quisque aliquam. _This is emphasized._ Donec faucibus. **this is _strongly emphasized._** Nunc iaculis suscipit dui. 5<sup>3</sup> = 125. Water is H<sub>2</sub>O. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. <cite>The New York Times</cite> (That's a citation). <u>Underline.</u> Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.

<abbr title='Hyper Text Markup Language'>HTML</abbr> and <abbr title='Cascading Style Sheets'>CSS</abbr> are our tools. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. To copy a file type `COPY <var>filename</var>`. ~~Dinner's at 5:00.~~ <ins>Let's make that 7.</ins> This <s>text</s> has been struck. This ==text== has been marked.

<small>This footnote is made with the `small` element.</small>

---

### Horizontal Rules

We sometimes use the `hr` element to separate sections of the page, so we hide them using CSS. However, we sometimes want to use them inline to separate blocks of content, so we should turn them back on, like so.

---

## Headings

# H1: The **arsonist** has _oddly shaped_ feet

## H2: The human torch was denied a bank loan

### H3: 60% of the time, it works every time

#### H4: Jackdaws love my big sphinx of quartz

##### H5: The five boxing wizards jump quickly

###### H6: The quick brown fox jumps over the lazy dog

---

## List Types

### Definition List

<dl>
<dt>Definition List Title</dt>
<dd>This is a definition.</dd>
<dd>This is an alternate definition.</dd>
<dt>Definition</dt>
<dd>An exact statement or description of the nature, scope, or meaning of something: <em>our definition of what constitutes poetry</em>.</dd>
</dl>

### Ordered List

1. List Item 1
1. List Item 2
1. Nested List Item A
1. Nested List Item B
1. List Item 3

### Unordered List

- List Item 1
- List Item 2
  - Nested List Item A
  - Nested List Item B
- List Item 3

---

## Tables

<table>
  <tr>
    <th>&nbsp;</th>
    <th>Enterprise</th>
    <th>Enterprise D</th>
    <th>Galactica</th>
  </tr>
  <tr>
    <th>Captain</th>
    <td>James Kirk</td>
    <td>Jean-Luc Picard</td>
    <td>William Adama</td>
  </tr>
  <tr>
    <th>XO</th>
    <td>Spock</td>
    <td>William Riker</td>
    <td>Saul Tigh</td>
  </tr>
  <tr>
    <th>Doctor</th>
    <td>Leonard McCoy</td>
    <td>Beverly Crusher</td>
    <td>Doc Cottle</td>
  </tr>
  <tr>
    <th>Engineer</th>
    <td>Montgomery Scott</td>
    <td>Geordi LaForge</td>
    <td>Galen Tyrol</td>
  </tr>
</table>

---

## Preformatted Text

Typographically, preformatted text is not the same thing as code. Sometimes, a faithful execution of the text requires preformatted text that may not have anything to do with code. For example:

<pre>
“Beware the Jabberwock, my son!
The jaws that bite, the claws that catch!
Beware the Jubjub bird, and shun
The frumious Bandersnatch!”
</pre>

<pre>
! " # $ % &amp; ' ( ) * + , - . /
0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
@ A B C D E F G H I J K L M N O
P Q R S T U V W X Y Z [ \\\\ ] ^ _
` a b c d e f g h i j k l m n o
p q r s t u v w x y z { | } ~
</pre>

---

### Code

Code can be presented inline, like `<?php bloginfo('stylesheet_url'); ?>`, or within a `pre` block. Because we have more specific typographic needs for code, we'll specify Consolas and Monaco ahead of the browser-defined monospace font.

```
.container {
  float: left;
  margin: 0 -240px 0 0;
  width: 100%;
}
```

You can also get syntax highlighting by adding `class="language-XXXX"` to your `code` element, like so:

```html
<pre>
  <code class="language-css">
    p {
      color: red
    }
  </code>
</pre>
```

CSS Formatting:

```css
pre[class*='language-']::selection,
pre[class*='language-']::selection,
code[class*='language-']::selection,
code[class*='language-']::selection {
  text-shadow: none;
  background: #b3d4fc;
}

@media print {
  code[class*='language-'],
  pre[class*='language-'] {
    text-shadow: none;
  }
}
```

JavaScript Formatting:

```javascript
for (var i = 1; i <= 100; i++) {
  if (i % (3 * 5) === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
```

And many more!

---

## Figures

Figures are usually used to refer to images:

<figure>
  <img alt='' src='https://source.unsplash.com/800x450/daily?dogs'>
  <figcaption>
    <h4>Figure Heading</h4>
    <p>This is a placeholder image, with supporting caption.</p>
  </figcaption>
</figure>

Here, a part of a poem is marked up using figure:

<figure>
  <p>&#8216;Twas brillig, and the slithy toves<br />Did gyre and gimble in the wabe;<br />All mimsy were the borogoves,<br />And the mome raths outgrabe.</p>
  <figcaption>
    <small><cite>Jabberwocky</cite> (first verse). Lewis Carroll, 1832-98</small>
  </figcaption>
</figure>

---

## Blockquotes

Let's keep it simple. Be sure to style the citation.

> Good afternoon, gentlemen. I am a _HAL 9000_ computer. I became operational at the H.A.L. plant in Urbana, Illinois on the 12th of January 1992. My instructor was Mr. Langley, and he taught me to sing a song. If you'd like to hear it I can sing it for you.
> <small><cite>[HAL 9000](http://en.wikipedia.org/wiki/HAL_9000)</cite>, 2000: A Space Odyssey</small>

And here's a bit of trailing text.
