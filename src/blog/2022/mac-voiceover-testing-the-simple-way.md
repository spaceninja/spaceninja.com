---
title: Mac VoiceOver Testing the Simple Way
slug: mac-voiceover-testing-the-simple-way
date: 2022-08-22T17:58:22.000Z
date_updated: 2022-08-22T18:00:23.000Z
tags:
  - screenreaders
  - testing
  - mac
  - voiceover
  - accessibility
excerpt: Learning VoiceOver can feel overwhelming, so I’m here to give you a simple, repeatable process you can follow to make testing with VoiceOver as easy as possible.
canonical: https://cloudfour.com/thinks/mac-voiceover-testing-the-simple-way/
feature_image: feature/voiceover-testing.jpg
---

<aside>
Learning VoiceOver can feel overwhelming, so I’m here to give you a simple, repeatable process you can follow to make testing with VoiceOver as easy as possible.
</aside>

Accessibility testing is an important part of the work we do at Cloud Four, as important as browser testing and code reviews. However, I’m embarrassed to admit that before I started here, it wasn’t something I did regularly.

Even after a [deep-dive training session](https://cloudfour.com/thinks/finding-empathy-learning-accessibility-together/) by my coworker Gerardo, I still felt overwhelmed. I could never remember how to start VoiceOver, or what keyboard commands to use. And more importantly, I wasn’t sure _how_ to test. When I tested a site in a browser, I knew to look for visual inconsistencies with other browsers or broken functionality. What was the equivalent for testing with a screen reader?

I’m going to give you what I would have benefited from: An easy-to-follow, repeatable guide to make testing with VoiceOver on a Mac as simple as possible.

This quick testing strategy won’t cover every detail of accessibility testing, and may not match how real users interact with your site. But it should be enough to help you get started, and become familiar with the basics. The more you practice, the more comfortable you’ll become, and the easier it will be to notice bugs and awkward experiences.

We resolved as a team to make VoiceOver testing a standard part of reviewing PRs. Following this process made that a possibility for me, and I hope it might help your team do the same.

> Note: In this document you’ll see me refer to the VoiceOver modifier, using the VO abbreviation. By default, the VoiceOver modifier is pressing the <kbd>Control</kbd> and <kbd>Option</kbd> keys at the same time. [VoiceOver keyboard commands](https://support.apple.com/guide/voiceover-guide/navigation-commands-cpvokys04/8/web/10.13) are a combination of the VoiceOver modifier and another key. For example, <kbd>VO</kbd>+<kbd>F8</kbd> opens the VoiceOver Utility.

## Enable VoiceOver

There are several ways to do this. First, you can use the VoiceOver keyboard shortcut: <kbd>Command</kbd>+<kbd>F5</kbd>. That works great, but I could never remember it.

Alternatively, you can go to _System Preferences_, _Accessibility_, _VoiceOver_, and check the “Enable VoiceOver” option. This is what I did most of the time, but it was just enough of a hassle to discourage me from testing.

Our goal is to remove barriers and make testing as easy as possible. So my favorite option, if you’re on a newer MacBook, is to triple-click the TouchID button. This is the system accessibility shortcut, which by default opens the [Accessibility Shortcuts panel](https://support.apple.com/en-us/HT202562).

To make things even easier, I’ve gone to _System Preferences_, _Accessibility_, _Shortcut_, and unchecked everything but VoiceOver, so triple-clicking the TouchID button starts VoiceOver right away, without showing me the panel first.

### Optional: Mute speech

As you might expect, enabling VoiceOver makes your computer start talking. If you’re wearing headphones, this is fine, but I’m often working in a shared space, and don’t want to bother other people. Since I’m a sighted user, I often use VoiceOver muted, relying on the visual caption panel, rather than listening to the narration. You can mute VoiceOver by opening the [VoiceOver Utility](https://support.apple.com/guide/voiceover-guide/use-voiceover-utility-vo28017/8/web/10.13), going to _Speech_, and checking the “Mute speech” option.

## Navigate interactive elements with the Tab key

Once I have VoiceOver enabled, the first thing I do is [navigate the site entirely with the Tab key](https://support.apple.com/guide/voiceover-guide/navigate-using-the-tab-key-vo2753/8/web/10.13). The <kbd>Tab</kbd> key lets you move between interactive elements on the page such as links, buttons, and form inputs.

Tabbing through your site will help you [test a lot of things](https://www.matuzo.at/blog/testing-with-tab/) in one pass. You can verify all interactive elements have a focus style, which is critical for keyboard users. You can ensure all your interactive elements are reachable by keyboard users (please don’t use `div`s for buttons). You can check that an off-screen or hidden element doesn’t get focused when it shouldn’t. If you do nothing else for accessibility testing, simply testing with the <kbd>Tab</kbd> key will get you a lot for little effort.

And now that you have VoiceOver enabled, a <kbd>Tab</kbd> test becomes even more useful because you’ll get to hear how it announces each interactive element.

The most common issue we discover during this test is that the spoken label for an interactive element doesn’t have enough context to understand it. For example, a link with the text “click here,” or a button that simply says “menu.”

## Navigation using the Rotor

After a <kbd>Tab</kbd> test, my next step is to [open the Rotor](https://support.apple.com/guide/voiceover-guide/navigate-using-the-rotor-mchlp2719/8/web/10.13) using <kbd>VO</kbd>+<kbd>U</kbd>. The rotor is a special menu in VoiceOver that lets you quickly understand the structure of a page.

You can configure what’s available in the Rotor using the [VoiceOver Utility](https://support.apple.com/guide/voiceover-guide/use-voiceover-utility-vo28017/8/web/10.13). For example, I’ve got mine configured to show links, articles, headings, form controls, and landmarks. For each of those, a tab will appear in the Rotor showing a list of those items on the page. You can navigate around the Rotor using the arrow keys.

This is a phenomenally useful way to check, at a glance, if your content is structured in a way that makes sense to a screen reader. By viewing the headings, you get a sense of the outline structure of the page. By viewing the links, you can ensure they all have a title that makes sense without visual context. And using the landmarks, you can ensure that the proper ARIA roles have been applied to your content.

The most common issue we discover during this test has to do with the structure of the page. We’ll find that we have a lot of articles that have no titles the screen reader can understand, or that our headings aren’t properly nested.

## Navigate all content using VO+→

Finally, I test a page by [navigating through all the content](https://support.apple.com/guide/voiceover-guide/by-dom-or-group-mode-vo2711/8/web/10.13#apdb9c85455de204) using <kbd>VO</kbd>+<kbd>→</kbd>. To be clear, this is not how most screen reader users will read the page, but it doesn’t take long, and it lets you confirm that everything VoiceOver announces makes sense.

You’d be surprised how often you find an unexpected issue that didn’t come up in the first two tests. Gerardo wrote a great post about an issue he found where an improperly marked-up sale price was resulting in VoiceOver reading [two different prices for every item in a store!](https://cloudfour.com/thinks/the-price-is-which/)

## File issues for anything that feels awkward

Don’t be surprised if you find a lot of ambiguous situations. Often what we find aren’t necessarily bugs, but simply an awkward experience for screen reader users. It’s okay if you don’t know the best way to address these! We tend to surface them in our **#accessibility** Slack channel first, then our team discusses the experience and possible ways to improve things.

## Learn more

I’ll leave you with one final bit of guidance. If you’re someone who doesn’t use a screen reader regularly, you should defer to people who do. When you’re unclear what the best solution would be for screen reader users, try asking them! If you can get an invite, the [A11y Slack](https://www.tpgi.com/anybody-can-be-an-a11y-slacker/) is very helpful, but there are also many [dedicated communities](https://www.a11yproject.com/resources/#community-help) to join.

And if you’d like to learn more about VoiceOver in particular, here are some of the resources I found most helpful:

- [Apple’s VoiceOver Getting Started Guide](https://support.apple.com/guide/voiceover-guide/welcome/web)
- [VoiceOver Keyboard Shortcuts on a Mac](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
  - Also available in a [single-page printer-friendly PDF version](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/voiceover-macos-guide.pdf)
- [Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
