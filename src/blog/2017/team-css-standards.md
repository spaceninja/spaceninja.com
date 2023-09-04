---
title: How to Define CSS Standards for a Team
slug: team-css-standards
date: 2017-02-02T01:00:00.000Z
date_updated: 2018-12-11T00:22:30.000Z
tags:
  - style guides
  - standards
  - sass
  - css
feature_image: /images/feature/css-standards.jpg
---

> “We’re going through a major redesign of our app and every page is given to one person on the team to complete from end-to-end, including creating the HTML structure and styling, and everyone is doing everything their own way. Do you have tips/tricks/blog posts/books that you’d recommend for getting into creating and enforcing a SASS project/structure?”

I’ve been where you are now, and it’s no fun. Trying to get a wide group of developers to consensus without an existing set of code standards or a style guide is like herding cats. I think your best bet is to shift your focus to laying the framework for consensus and standards moving forward. You’ll still have wild divergences between current parts of the app, but as things get touched in the future, whether for bug fixes or refactoring, you can ask “does this match our CSS standards?”

**Step one:** Make sure the team understands what modular CSS is and why it’s a good idea. Not to toot my own horn, but I think [this presentation](https://youtu.be/Ty5jtMZXbmk) I gave does a good idea of easing devs into the concept. Beyond that, I’d loudly recommend the [SMACSS](https://smacss.com/) book to the team. I’ve had good luck with getting a manager to start a mandatory book club where everyone on the team has to read a book and come to a meeting discussing it.

**Step two:** Once there is some degree of consensus around the advantages of modular CSS, put together your team’s code standards. You can either write your own, or just adopt another team’s wholesale. I’d strongly recommend Harry Robert’s [CSS Guidelines](http://cssguidelin.es/), perhaps supplemented with Hugo Giraudel’s [Sass Guidelines](https://sass-guidelin.es/).

I’ve been working on the [CSS Standards document for Tempest](https://github.com/saymedia/css-standards), and I’m overall pleased with it. It’s very much a work of compromise, attempting to document and standardize several years of existing code practices. If I were starting from scratch, I’d probably push hard to just switch to the [BEM naming convention](http://getbem.com/naming/) and the [StyleLint default formatting rules](https://github.com/stylelint/stylelint-config-standard). Not because they’re the best possible standards, but because they’re established standards, which are easier to agree to.

**Step three:** Create a [pattern library](http://styleguides.io/). Getting your patterns documented and listed in a central place is good for two reasons: First, it helps your designers see what already exists and avoid duplication. Second, it helps your developers begin to think in terms of reusable modules versus unique pages.

As for general purpose Sass tips, I only have a few:

1. Extends are pointless and possibly dangerous. [Use mixins instead](http://csswizardry.com/2016/02/mixins-better-for-performance/).
2. Use variables for everything. Ideally, you hardly ever see a hard-coded number in a Sass file. This makes it _way_ easier to avoid magic numbers, and is a handy stick to beat during code reviews.
3. Keep your variables in a central `_variables.scss` file so they’re easy to find, and to help the team remember that variables in Sass are global.
4. Include a single `main.scss` file in your app, which is only responsible for loading other Sass partials. This helps encourage your team to write smaller, better scoped Sass files and avoid bloat.
5. In a perfect world each module should stand alone and not be influenced by others. If each module has its own Sass partial, a handy way to enforce this is to randomly change the order the partials are loaded in now and then. If things breaks, then you know your modules are leaky.

This is a very broad topic with many wildly divergent viewpoints. What matters more than anything is getting your team to agree to standards, regardless of what the standards are. At the end of the day you can’t stop a dev from going rogue and doing their own thing, but it’s much easier to reign them in if the team has at least agreed on how things _should_ be done.
