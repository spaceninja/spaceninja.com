---
title: Trust Your Designer, But Review Their Code
slug: trust-your-designer-but-review-their-code
date: 2015-01-30T22:46:17.000Z
date_updated: 2018-09-18T05:05:13.000Z
tags:
  - trust
  - design
  - web development
feature_image: /images/feature/mac-glasses.jpg
feature_source: https://unsplash.com/photos/YoadQb46v6k
feature_credit: Medium Rare
---

It can be awkward when your designer says they want to work directly in code. You want to protect the high quality of your front-end layer, but you don’t want to seem territorial or untrusting. You fear saying yes, at the risk of watching your carefully organized files fill up with sloppy and untested code. How can you give access while still maintaining standards?

I saw a great tweet recently that neatly summarized some thoughts I’ve had about the blurring lines of responsibility for front-end code in our industry:

<blockquote class="twitter-tweet" lang="en"><p>End goal isn&#39;t: All designers do production-ready code. (If so, yay!)&#10;&#10;End goal is: Designers understand the medium. Can do prototypes, etc.</p>&mdash; Nathan Smith (@nathansmith) <a href="https://twitter.com/nathansmith/status/557604954085789697">January 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

For you younglings who think this is obvious, let me regale you with a tale of how things were in the bad old days. Your designer would hand you a Photoshop file with 700 unlabelled layers for a site design much wider than the most common screen resolution. (“Looks great on my macbook!”) Even though you never had the opportunity to review it for technical feasibility, the comp was already approved by the client, and there’s no budget to make any changes.

You would curse their name, and proceed with the work of adapting their unrealistic design to the hard realities of the browser. Layouts would shift, font rendering would be different, and compromises would be made. You’d do everything you could, but at the end of the day, what they asked for was unrealistic. Then the designers would complain about how the developers messed up their perfect design, and everyone would be irritated.

Well, those days of carefully siloed skillsets are long-gone, and good riddance. Today’s developers are familiar with design techniques like grid systems and adaptive layouts, while designers are as likely to deliver a CSS file as a photoshop comp. Some of the designers I’ve worked with lately are as excited as I am about new front-end techniques like responsive images, HTML5 form enhancements, and flexbox layouts.

And that’s fantastic! Trust me, a designer who understands the constraints of the medium is much easier to work with than one who doesn’t. If they want to design directly in the browser, or craft a Sass mixin, you should encourage that.

But there is a problem that can arise when designers write their own front-end code. They don’t usually have the same depth of knowledge about browser support, best practices, or standards that you do.

At the end of the day, this is where a skilled front-end developer shines. Anyone can write CSS. The mark of a true professional is producing reliable, maintainable, performant, and accessible code. You have spent the past _N_ years diving deep. You’re a specialist. Your designer is also a specialist, but they don’t have your domain knowledge.

There’s an Arab proverb about a man who left his camel outside the mosque while he prayed. When he came out to find it missing, he was upset. His imam asked why he didn’t tie it up, and he said he put his trust in God. The imam replied “Trust in God, but tie your camel.”

That’s why I explain to our designers that while I’m excited for them to work directly in the browser, it’s my responsibility to maintain the high quality of our front-end layer. As such, I may need to modify their code to match our industry’s best practices.

Conversely, I understand that they are responsible for bringing high quality design to our product, and I will respect their decisions. I won’t make changes to a design without consulting them and explaining why I think it should be altered.

Just as siloing domain knowledge strictly between designers and developers didn’t work, neither will letting everyone write code with no oversight. Clearly defined responsibilities allow everyone to use the best tools for the job and ensure everyone’s work is held to the highest standard.

Trust your designer, but review their code.
