---
title: Write Alt Text Like You’re Talking To A Friend
date: 2024-04-22
tags:
  - accessibility
  - batman
  - heists
  - race
  - alt
excerpt: “There was this dog wearing safety glasses, surrounded by chemistry equipment, saying ‘I have no idea what I’m doing.’”
canonical: https://cloudfour.com/thinks/write-alt-text-like-youre-talking-to-a-friend/
feature_image: alt-text/alt-text-cover.jpg
feature_alt: Batman laughing and describing a meme he saw to Commissioner Gordon, who looks unamused.
---

If you take nothing else away from this post, I want you to remember this: **Write alternative text as if you’re describing the image to a friend.**

I find people often get too wrapped up in what the “rules” are for alternative text. Sure, there are lots of things to be aware of, but almost all of them are covered under this simple guideline. If you were talking to a friend on the phone\* and wanted to describe [a meme you saw](https://knowyourmeme.com/photos/234739-i-have-no-idea-what-im-doing), you might say “There was this dog wearing safety glasses, surrounded by chemistry equipment, saying ‘I have no idea what I’m doing.’”

Keep it brief, but informative! Give the most important information and leave out unimportant details.

\*I know, I know, no one actually _talks_ on the phone anymore. If the very idea is stressing you out, you can replace “describing a meme over the phone” with “describing a meme to your getaway driver as you flee the scene of your latest heist, pursued by the detective that’s been hot on your heels since the job in Naples, so she’s understandably stressed and doesn’t want to look at a funny dog picture on your phone while she’s driving.”

## Context matters

Of course, context informs your description. If I was describing the chemistry dog meme to a chemistry major, I might want to emphasize all the things the dog is doing wrong. If I was describing it to someone who works in a hazardous spill response team, I might mention that the dog is pouring one of the mystery fluids into a coffee mug. As an example, let’s consider this image from a Batman movie.

{% image "alt-text/batsignal.jpg", "A frame from Christopher Nolan’s Batman movies of Commissioner Gordon standing on the rooftop preparing to light the batsignal." %}

A fan-run Batman wiki, where the audience is likely familiar with the characters, might use this as alternative text:

> Commissioner Gordon, wearing his signature trenchcoat, stands near the batsignal, considering whether to light it, alerting Batman.

In contrast, an article about cinematography, where the author chose this image as an example of a framing technique and Batman isn’t the primary focus, might highlight other features of the image.

> In this shot, director Christopher Nolan has framed Commissioner Gordon, played by Gary Oldman, pensively looking away from the unlit batsignal towards the sky, with the city visible behind him, reminding the viewer of the stakes inherent in his decision to summon Batman.

And if Batman had a social media account, he might take a slightly different approach.

> Gordon looking goofy AF after I dipped out while he was talking again LOL

All of these are valid alternative text choices for audiences in certain contexts.

## You don’t need to say it’s an image

Most screenreaders will say “image” or “graphic” before reading the alternative text, so starting with “Image of X” is redundant. The only time you need to mention the image itself is if the medium matters, such as artwork and diagrams. For example, “a charcoal sketch of a cute kitten,” “the blueprints for the mansion we’re going to rob,” or “A chart showing a 50% decline in sales over three years.”

## But you should include punctuation

Eric Bailey reminds us to [add punctuation to our alternative text](https://thoughtbot.com/blog/add-punctuation-to-your-alt-text). If your alternative is only a single sentence, it might feel strange to include punctuation. But remember that it won’t be read in isolation, it will be read along with the surrounding text. Ending your sentence with a proper period or other punctuation will communicate to the screen reader how to transition from the alternative text to the following text.

## Should alternative text describe race?

Sometimes! Like everything, it’s contextual. I highly recommend reading “[The case for describing race in alternative text attributes](https://ux.shopify.com/the-case-for-describing-race-in-alternative-text-attributes-a093380634f2)” by Tolu Adegbite, and “[Thoughts on skin tone and text descriptions](https://tink.uk/thoughts-on-skin-tone-and-text-descriptions.md-notes-on-synthetic-speech/)” by Léonie Watson. They both point out that by not mentioning race, we may be unintentionally reinforcing the idea that the unspoken default is white.

Think of it the same way we encourage the adoption of gender pronouns in profiles even for cisgender people. It’s not about whether anyone might be confused about what your pronouns are. It’s about normalizing the idea that everyone has pronouns and they may not match your expectations.

## Decorative images don’t need alternative text, but your image probably isn’t decorative.

It’s true that purely decorative images are allowed to use an empty string for their `alt` attribute. However, as Eric Bailey points out, [your image is probably not decorative](https://www.smashingmagazine.com/2021/06/img-alt-attribute-alternate-description-decorative/). In a nutshell, the term “decorative” means the image *does not visually communicate information*, not that it is used as decoration.

A spacer GIF is decorative. Image borders are decorative. A button that only contains an icon image is _not_ decorative. This photo of the safe that we’ll be cracking in the mansion is _not_ decorative. A company’s logo is _not_ decorative.

### What about a person’s avatar, displayed next to their name?

This is a tricky case. If you have a person’s photo displayed right next to their name, and the alternative text only contains their name, then the screen reader will hear the person’s name twice, which adds no value. For example, at the top of this page, you can see my avatar next to my name. We’ve opted to leave the `alt` attribute empty on the avatar, because we don’t want screen reader users to hear “Image, Scott Vandehey, Link, Scott Vandehey.”

But… it’s not quite that simple. It depends on what the image shows. In “[Writing great alt text: Emotion matters](https://jakearchibald.com/2021/great-alt-text/),” Jake Archibald makes the case that an avatar photo of himself on a conference site that showed him hiding behind a plant actually contained information that _should_ be expressed in the alternative text, and opted for “Jake Archibald hiding behind a plant.”

As usual, context matters, and when in doubt, try reaching out to real users of assistive technology for opinions.

## Conclusion

I know I started out by saying you only need to remember one guideline, and then gave you, like, seven. But I stand by what I said. Don’t stress about crafting the perfect alternative text. Just write it the way you would describe the photo of the bag of glistening diamonds you just stole from the Duke of Chauntelburry as you drive along the coast after finally shaking the detective, the wind blowing through your hair, with your getaway driver still chuckling about that dog-doing-chemistry meme you described to her earlier.

## Learn More:

- Perkins School for the Blind, “[How to Write Alt Text and Image Descriptions for the visually impaired](https://www.perkins.org/resource/how-write-alt-text-and-image-descriptions-visually-impaired/)”
- The A11y Project, “[Are You Making These Five Mistakes When Writing Alt Text?](https://www.a11yproject.com/posts/are-you-making-these-five-mistakes-when-writing-alt-text/)”
- Axess Lab, “[Alt-texts: The Ultimate Guide](https://axesslab.com/alt-texts/)”
- Bureau of Internet Accessibility, “[8 Common Image Alt Text Mistakes to Stop Making](https://www.boia.org/blog/8-common-image-alt-text-mistakes-to-stop-making)”
- Carie Fisher, “[Accessible Images For When They Matter Most](https://www.smashingmagazine.com/2020/05/accessible-images/)”
- Steve Faulkner, “[The Perils of Using Double Quotes Inside Alt Text](https://codepen.io/stevef/pen/XWQWgrj)”
- Geoff Graham, “[Just How Long Should Alt Text Be?](https://css-tricks.com/just-how-long-should-alt-text-be/)”
- Stefan Judis, “[The CSS ‘content’ Property Accepts Alternative Text](https://www.stefanjudis.com/today-i-learned/css-content-accepts-alternative-text/)”
- Shawn Lauriat, “[How Learning ASL Improved My Alt Text](https://www.youtube.com/watch?v=gHOYghYYNIM)”
- Veronica Lewis, “[Seven Myths About Alt Text](https://veroniiiica.com/seven-myths-about-alt-text/)”
- Elaina Natario, “[Alt vs Figcaption](https://thoughtbot.com/blog/alt-vs-figcaption)”
- Scott O’Hara, “[Contextually Marking Up Accessible Images and SVGs](https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html)”
- Adrian Roselli, “[Long Alt](https://adrianroselli.com/2024/04/long-alt.html)”
- Wren, “[An Attempted Guide to Writing Effective Alt and Descriptive Text for Art](https://mannequinrentals.help/2024/03/21/an-attempted-guide-to-writing-effective-alt-and-descriptive-text-for-art/)”
