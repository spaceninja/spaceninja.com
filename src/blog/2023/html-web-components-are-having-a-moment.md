---
title: HTML Web Components Are Having a Moment
date: 2023-11-29
date_updated: 2023-11-29
tags:
  - web-components
excerpt: Everyone’s talking about HTML Web Components, and I think it’s the start of something magical!
canonical: https://cloudfour.com/thinks/html-web-components-are-having-a-moment/
feature_image: feature/html-web-components.png
---

One nice thing about running a [front-end newsletter](https://fridayfrontend.com) is that you get to keep a sort of birds-eye view of what’s happening across the industry as a whole. A common pattern I see is the people who live on the bleeding edge of what’s possible, like [Rachel Andrew](https://front-end.social/@rachelandrew), [Una Kravets](https://front-end.social/@Una), [Jen Simmons](https://front-end.social/@jensimmons), and [Miriam Suzanne](https://front-end.social/@mia), tend to write about exciting new things that then get shared around the community and see gradual adoption over time.

A less common pattern is to see a technology that everyone agrees is great, but struggles to catch on until someone writes something that manages to crystalize the pitch in a way that gets widespread adoption. These inflection points can be really exciting, seeing an idea sweep across the community like wildfire. A good example is [Ethan Marcotte](https://follow.ethanmarcotte.com/@beep)’s original [Responsive Web Design](https://alistapart.com/article/responsive-web-design/) article from 2010. All the pieces already existed, but Ethan put them together in a way that clicked for people and attached the name that came to define a generational shift in web design.

Well, I think one of those moments is happening right now! If you’ve missed the buzz around “HTML Web Components,” then consider this a nudge from me to check out any of these excellent articles that have appeared on the topic in the last few weeks:

- [Blinded by the Light DOM](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/) by Eric Meyer
- [HTML Web Components](https://adactio.com/journal/20618) by Jeremy Keith
- [“Shadow DOM is not a good default”](https://buttondown.email/cascade/archive/006-shadow-dom-is-not-a-good-default/) by Robin Rendle
- [HTML Web Components](https://blog.jim-nielsen.com/2023/html-web-components/) by Jim Nielsen
- [HTML Web Components: An Example](https://blog.jim-nielsen.com/2023/html-web-components-an-example/) by Jim Nielsen
- [HTML Web Components are Just JavaScript?](https://www.oddbird.net/2023/11/17/components/) By Miriam Suzanne
- [An Attempted Taxonomy of Web Components](https://www.zachleat.com/web/a-taxonomy-of-web-component-types/) by Zach Leatherman
- [Messin’ Around With Web Components](https://www.leereamsnyder.com/web-component-and-somehow-also-js-101) by Lee Reamsnyder
- [The Elevator Pitch for Web Components](https://gomakethings.com/the-elevator-pitch-for-web-components/) by Chris Ferdinandi

I don’t know about you, but I read every one of those articles, and for the first time, web components “clicked” for me. Suddenly, I understood how they could fit into our workflow, and where they’d be a good addition. I was excited about web components in a way I’d never been before.

Of course, as [Jason pointed out](https://front-end.social/@grigs/111490293915212046), web components are hardly new, and people have been writing about them for some time ([including us here at Cloud Four!](https://cloudfour.com/topics/web-components/)). Here are just a few examples from my [web component bookmarks](https://pinboard.in/u:spaceninja/t:webcomponents/), which date back to 2018:

- [Web Components Are Easier Than You Think](https://css-tricks.com/web-components-are-easier-than-you-think/) by John Rhea
- [Mighty Morphin’ Web Components](https://cloudfour.com/thinks/mighty-morphin-web-components/) by Tyler Sticka
- [Building an Accessible Image Comparison Web Component](https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/) by Paul Hebert
- [Web Components as Progressive Enhancement](https://cloudfour.com/thinks/web-components-as-progressive-enhancement/) by Paul Hebert
- [HTML With Superpowers](https://htmlwithsuperpowers.netlify.app) by Dave Rupert
- [Let’s Talk About Web Components](https://bradfrost.com/blog/post/lets-talk-about-web-components/) by Brad Frost

I’m embarrassed to admit that I read all of those articles, but didn’t really get the appeal at the time. My colleague [Paul](https://cloudfour.com/is/paul/)’s posts are probably the best example: I read them, thought they were brilliant, looked at the code for his image comparison component, and went “Wow, great stuff.” He even described what we now call HTML Web Components in everything but name. But it didn’t _click_. I didn’t feel like it was something I could do. Until recently, my experience with web components was best summed up by Lea Verou’s article [The Failed Promise of Web Components](https://lea.verou.me/blog/2020/09/the-failed-promise-of-web-components/), where she pointed out the dependency on JavaScript and the complexity of web components as a deterrent.

Eric mentions the complexity of the shadow DOM as a barrier to entry in [Blinded by the Light DOM](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/), but his article was the first time I really grasped that all the shadow DOM stuff was optional, and the JavaScript setup that had seemed so overwhelming in the past, suddenly seemed quite approachable.

And it’s clearly not just me. Eric’s post showed me that web components could be simpler than I thought. Jeremy came up with a brilliantly approachable name with “HTML web components.” And everyone else who wrote about them in the following weeks added to the growing sense that, yes, this was a thing that I could do, that had clear value, and I began looking for opportunities to use them.

It didn’t take long. [Jason](https://cloudfour.com/is/jason-grigsby/)’s been tinkering with 3D models for AR applications and asked me to find a way to lazy load [model-viewer](https://modelviewer.dev/) widgets so someone reading a blog post wouldn’t need to download a multiple-megabyte file on page load. It was an excellent opportunity to use a web component to enhance the behavior, and with a bit of assistance from [Tyler](https://cloudfour.com/is/tyler/), we produced [Lite Model-Viewer](https://lite-model-viewer.netlify.app/). It’s not the most groundbreaking thing, and it’s an incredibly specific use case. But it was easy, fun, and a great way to get some hands-on experience.

I suspect that in a few years’ time, we’ll look back at this month, and especially Jeremy and Eric’s articles as an inflection point. Similar to how Ethan managed to make responsive web design accessible to more people, I think we’re looking at the same thing happening right now for web components.
