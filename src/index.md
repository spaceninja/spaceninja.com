---
layout: layouts/base.webc
---

<article class="post">

# Scott Vandehey

- Level 24 Front-End Web Developer
- Level 14 Dungeon Master
- Human male
- Neutral Good
- Age 45

<half-tone dot-size="3px" photo-brightness="90%" photo-contrast="70%" photo-blur="1px">

{% include "partials/image.liquid"
  src: "scott/beard.png"
  alt: "A headshot of Scott Vandehey"
  sizes: media.mediaList.sizes
  widths: media.mediaList.widths
%}

</half-tone>

## Stats

- NERD 18 (+4)
- JOCK 12 (+1)
- HICK 10 (+0)
- GOTH 10 (+0)
- PREP 8 (-1)
- SKID 8 (-1)

## Skills

- +4 Storytelling
- +2 Public speaking
- +4 Writing
- +2 Teaching
- +4 Web standards
- +4 CSS
- +3 JavaScript
- +2 Code refactoring
- +1 Scrum
- +1 Baking

## Actions

- **Geek Out.** You can talk at great length about any of your preferred topics with no preparation. Any creature within earshot must roll to resist becoming enthused. Creatures with a high NERD stat may choose to fail this roll.
  - **Preferred topics:** UFOs, science fiction, 90's pop culture

## Equipment

- Hoodie
- Nerdy t-shirt
- Noise-cancelling headphones
- Macbook Pro
- Lofi hiphop stream
- Polyhedral dice

## Languages

- English
- CSS
- JavaScript

## Background

Scott Vandehey is a front-end architect and CSS specialist in Portland, Oregon with over 20 years experience building scalable user interfaces. His specialty is refactoring large code bases for maintainability and performance, and helping teams define best practices and workflow around CSS development. Between his education in graphic design and his experience working alongside programmers, he bridges the gap between design and development.

A running theme in his career has been helping others level up, and that’s most recently manifested in the Friday Front-End and CSS Basics twitter accounts and newsletter, which he uses to share development tips and links with the front-end community every day. His first book, “How to Find a Better Job in Tech,” was published in 2016.

</article>

<script>
  const styles = `
half-tone {
  --dot-size: 4px;
  --dot-color: #333;
  --dot-contrast: 2000%;
  --photo-brightness: 80%;
  --photo-contrast: 120%;
  --photo-blur: 2px;
  --blend-mode: hard-light;
  --dot-angle: 15deg;

  display: inline-block;
  filter: contrast(var(--dot-contrast));
  overflow: hidden;
  position: relative;
}

half-tone::before {
  background: radial-gradient(circle at center, var(--dot-color), #fff);
  background-size: var(--dot-size) var(--dot-size);
  content: '';
  inset: -25%;
  position: absolute;
  transform: rotate(var(--dot-angle));
}

half-tone img {
  margin: 0;
  mix-blend-mode: var(--blend-mode);
  filter:
    grayscale(1)
    brightness(var(--photo-brightness))
    contrast(var(--photo-contrast))
    blur(var(--photo-blur));
  width: 250px;
}
`;

class HalfTone extends HTMLElement {
  static observedAttributes = [
    "dot-size",
    "dot-color",
    "dot-contrast",
    "dot-angle",
    "photo-brightness",
    "photo-contrast",
    "photo-blur",
    "blend-mode",
  ];

  connectedCallback() {
    // Inject the styles if they haven't been yet
    if (!document.querySelector("#half-tone-styles")) {
      const stylesheet = document.createElement("style");
      stylesheet.id = "half-tone-styles";
      stylesheet.textContent = styles;
      document.head.append(stylesheet);
    }

    // Check for styling attributes, to be set as custom properties
    this.style.setProperty("--dot-size", this.getAttribute("dot-size"));
    this.style.setProperty("--dot-color", this.getAttribute("dot-color"));
    this.style.setProperty("--dot-contrast", this.getAttribute("dot-contrast"));
    this.style.setProperty("--dot-angle", this.getAttribute("dot-angle"));
    this.style.setProperty(
      "--photo-brightness",
      this.getAttribute("photo-brightness")
    );
    this.style.setProperty(
      "--photo-contrast",
      this.getAttribute("photo-contrast")
    );
    this.style.setProperty("--photo-blur", this.getAttribute("photo-blur"));
    this.style.setProperty("--blend-mode", this.getAttribute("blend-mode"));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.style.setProperty(`--${name}`, newValue);
  }
}

customElements.define("half-tone", HalfTone);

</script>
