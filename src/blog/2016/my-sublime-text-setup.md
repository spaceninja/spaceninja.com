---
title: My Sublime Text Setup
date: 2016-09-20T23:18:31.000Z
date_updated: 2018-09-18T05:07:03.000Z
tags:
  - editors
  - sublime text
  - howto
excerpt: I've put a bit of work into customizing my Sublime Text setup. It's mostly based on a set of tips from Wes Bos, who literally wrote the book on becoming a Sublime Text power user.
feature_image: feature/sublime-text.png
---

I've put a bit of work into customizing my Sublime Text setup. It's mostly [based on a set of tips](http://wesbos.github.io/Sublime-Text-Power-User-Talk/) from Wes Bos, who literally [wrote the book](https://sublimetextbook.com/) on becoming a Sublime Text power user.

## [Material Theme](https://packagecontrol.io/packages/Material%20Theme)

This is a UI theme (not a color scheme), which changes the appearance of the editor itself.

### [Material Theme Appbar](https://packagecontrol.io/packages/Material%20Theme%20-%20Appbar)

In addition, Material Theme offers an addon to enable a color-tinted application bar that extends the Material design style.

## [Cobalt2 Color Scheme](https://packagecontrol.io/packages/Theme%20-%20Cobalt2)

This is Wes Bos' enhanced version of the Cobalt color scheme that ships with many editors. In particular, it has support added for a number of Sublime plugins and linters.

He uses it in all of his screencasts, and it looks lovely, with great colors and contrast, and lots of usable features like visible line guides.

## [Inconsolata Font](http://levien.com/type/myfonts/inconsolata.html)

Inconsolata has been my go-to programming font for years. It's simple and easy to read, but it also has a few nice typographic flares such as the lowercase letter "t" that make it a pleasure to use.

## Packages

This is a small collection of Sublime plugins that enhance the editor and make it easier to make the changes you need.

- [AlignTab](https://packagecontrol.io/packages/AlignTab) — I use this all the time in my CSS to align multiple properties so they're easier to read.
- [Bracket Highlighter](https://packagecontrol.io/packages/BracketHighlighter) — Highlights the opening and closing brackets for whatever chunk of code you're currently editing. Very useful.
- [Color Highlighter](https://packagecontrol.io/packages/Color%20Highlighter) — Attempts to preview any CSS colors in your current document, either by highlighting the text or by adding a color swatch to the gutter.
- [Sidebar Enhancements](https://packagecontrol.io/packages/SideBarEnhancements) — Adds a slew of new options to the right-click menu in the sidebar, including new file/folder, open with, rename, move, delete, etc.
- [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter) — Excellent linting built right into your editor. We have [jshint](https://packagecontrol.io/packages/SublimeLinter-jshint) and [stylelint](https://packagecontrol.io/packages/SublimeLinter-contrib-stylelint) config files in our projects, so I've also got the SublimeLinter packages for those installed.
- [Trailing Spaces](https://packagecontrol.io/packages/TrailingSpaces) — Simple plugin to highlight and automatically remove trailing spaces from any lines in your files.

## [Syncing](https://packagecontrol.io/docs/syncing)

Finally, I [sync my sublime configuration](https://packagecontrol.io/docs/syncing) between multiple computers using dropbox. Works great to make sure my work and personal laptop are still set up the way I like, and changes I make to one sync to the other.
