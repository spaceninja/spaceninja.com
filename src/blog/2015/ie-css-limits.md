---
title: The Many Exciting CSS Limits of Internet Explorer
date: 2015-03-31T22:15:00.000Z
date_updated: 2018-08-20T11:51:25.000Z
tags:
  - web-development
  - internet-explorer
  - css
excerpt: IE has a number of limits in the way it loads CSS, which can cause your styles to not be applied if you exceed them.
feature_image: feature/bliss.jpg
---

Internet Explorer has a number of limits in the way it loads CSS, which can cause some of your styles not to be applied if you unknowingly exceed them.

## IE9 and lower

- A stylesheet may contain up to [4095 selectors](http://codepen.io/spaceninja/full/gbyMLv/)
- A document may load up to [31 stylesheets](http://john.albin.net/ie-css-limits/)
- A stylesheet may @import up to [31 other stylesheets](http://codepen.io/spaceninja/full/qEwNxr/)
- @import nesting is limited to [4 levels deep](http://codepen.io/spaceninja/full/EaJyRg/)
- <small>This is goofy, but you can [load 31 stylesheets that each import 31 others](http://john.albin.net/ie-css-limits/993-style-test.html), for a total of 961. And each of those imported stylesheets could import 31 more, and so on, up to a depth of 4, for a total of 31<sup>4</sup> (or 923,521), but I don't have a test case for that.</small>

## All versions of IE

- Font-family names may be up to [31 characters long](http://codepen.io/spaceninja/full/zxXBJK/)
- <small>This has been [fixed in Edge](https://twitter.com/frankolivier/status/704725553715150848)!</small>

## IE10+

- A stylesheet may contain up to [65,534 selectors](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx)
- A document may load up to 4095 stylesheets
- @import nesting is limited to 4095 levels (due to the 4095 stylesheet limit)
- <small>The [IE10 Dev Guide](https://msdn.microsoft.com/en-us/library/ie/hh920762.aspx) says the limits for IE10 have been removed _entirely_, but [in the comments](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx?PageIndex=1#comments) of his blog post on the IE limits, Eric Law says these limits for IE10 are accurate. Again, I don't have a test case for this.</small>

It can be easy to hit the 4095 selector limit if you're aggregating all your CSS into one file, especially if you include a framework like Foundation. Similarly, for years now, Drupal has included a feature to aggregate CSS files specifically to avoid the 31 imported stylesheet limit.

I put this post together because I couldn't find a single definitive reference or collection of test cases, and I was seeing some <abbr title="Fear, Uncertainty, and Doubt">FUD</abbr> on Stack Overflow threads.

## But Why?

Eric Law (former IE program manager) [explains the source of the limits](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx):

> Internally, all software must decide how much storage space to allocate for a given variable, and all storage space is inherently limited by the memory and disk available.
>
> In the case of IE, the data storage chosen was a 32bit integer [to identify, sort, and apply the cascading rules], which provides high-performance. ...The integer’s 32bits are split into five fields: four sheetIDs of 5 bits each, and one 12bit ruleID. The 5 bit sheetIDs results in the 31 @import limit, and the 12 bit ruleID results in the 4095 rules-per-sheet limitation.
>
> While these limits are entirely sufficient for most sites, there are some sites (particularly when using frameworks and controls) that can encounter the limits, requiring workarounds.
>
> In IE10, the allocation of the bits in that 32bit integer was adjusted to better meet the needs of real-world pages, and in practice, we'd never seen a page which did not work with the new allocation pattern.
>
> My guess is that other browsers are either using a 64bit integer, which has an increased memory and CPU cost, or they had a smarter allocation of bits within a 32bit store—like IE10's—to start with.

## Tools:

- [Bless](http://blesscss.com/) will split your stylesheets to avoid the 4095 selector limit.
- [Parker](https://github.com/katiefenn/parker) is a stylesheet analysis tool. It runs metrics on your stylesheets and will report on their complexity.

## Test Cases:

- [4095 selector limit](http://codepen.io/spaceninja/full/gbyMLv/)
- [31 stylesheet limit](http://john.albin.net/ie-css-limits/)
- [31 @import limit](http://codepen.io/spaceninja/full/qEwNxr/)
- [4 nested @import limit](http://codepen.io/spaceninja/full/EaJyRg/)
- [font-family length limit](http://codepen.io/spaceninja/full/zxXBJK/)

## References:

- [Stack Overflow: Internet Explorer's CSS rules limits](http://stackoverflow.com/questions/9906794/internet-explorers-css-rules-limits)
- [Stack Overflow: How are media queries counted in IE's CSS selectors limit?](http://stackoverflow.com/questions/25052610/how-are-media-queries-counted-in-ies-css-selectors-limit/25089619)
- [John Albin: 31 Reasons to Hate Internet Explorer](http://john.albin.net/css/ie-stylesheets-not-loading)
- [IE Internals Blog: Stylesheet Limits in Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx)
- [Microsoft Knowledge Base: A webpage that uses CSS styles does not render correctly in Internet Explorer](http://support.microsoft.com/en-us/kb/262161)
- [IE10 Dev Guide: Removal of style sheet limits](https://msdn.microsoft.com/en-us/library/ie/hh920762.aspx)
- [Reddit: Did you know IE9 has a 31 character limit for font-family names in CSS?](http://www.reddit.com/r/webdev/comments/1dfrsn/did_you_know_ie9_has_a_31_character_limit_for/)
