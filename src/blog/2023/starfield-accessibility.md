---
title: Starfield’s Accessibility Problems
date: 2023-09-19
tags:
  - accessibility
  - games
  - kiosks
  - starfield
excerpt: 'Starfield has a lot of computers to interact with: Ship controls, desktop terminals, and information kiosks. And they all have accessibility problems.'
canonical: https://cloudfour.com/thinks/starfield-accessibility/
feature_image: starfield/starfield-kiosk-na-1.png
hide_feature_image: true
---

I’ve been playing a lot of *Starfield* lately, the new game from Bethesda Studios, and I really enjoy it. Flying my little spaceship around, pretending to be Naomi Nagata from *The Expanse*, and digging the NASA-punk design aesthetic is a lot of fun. But there’s one little thing that bothers me.

In the game, you interact with a lot of computers. Ship controls, desktop terminals, and information kiosks abound. And I have yet to interact with a single one that didn’t have some sort of accessibility problem.

To be clear, I’m not talking about the game itself — [though it has its share of accessibility woes](https://www.gamesradar.com/starfield-accessibility-verdict/) — I’m talking about the ability to use the in-game computer UIs. Let me show you some examples:

{% image "starfield/starfield-kiosk-ryujin.png", "Screenshot of an in-game kiosk showing news about Ryujin Industries. Below a block of marketing text, there are two buttons: “Celebrating 20 Years” and “Now Hiring.” One of the buttons is dark red, and one is bright red. There is no way to tell which is focused." %}

There are a lot of information kiosks in *Starfield*, and they suffer from a common accessibility problem — insufficient focus indicators. Here we have a kiosk with only two options, using the Ryujin Industries brand color of red. Quick question: which button is active right now? There’s literally no way to tell.

When building websites in the real world, this is a common problem. For sighted users with a mouse, highlighting a button by changing color when they hover over it is fine, because the user knows where their mouse is. But for low-vision users or keyboard users, we add a focus ring to make it clear which button is active. Ryujin Industries may have an accessibility lawsuit in their future.

{% image "starfield/starfield-kiosk-na-1.png", "Screenshot of an in-game kiosk labelled “New Atlantis Information.” A set of four buttons is centered in the screen, the first highlighted in a slightly lighter color. An easily-missable scrollbar is to the left of the buttons, indicating there are more just off-screen." %}

Here’s another example, from the big city of New Atlantis, one of the first places you visit in the game. Although they have the same insufficient focus indicator, it’s less of a problem because there’s more than one button, so it’s at least clear which one is colored differently. But there’s another, sneakier problem here. How many buttons are available?

{% image "starfield/starfield-kiosk-na-2.png", "Screenshot of the same in-game kiosk labelled “New Atlantis Information.” A set of four buttons is still centered in the screen, but it has been scrolled down to reveal the final two buttons in the list that were not visible at first. There is easily enough space on screen to show all six buttons at once." %}

Surprise! It’s *six*. That’s right, there were two buttons scrolled off-screen. Now, technically, there is a scrollbar, but I can tell you that I didn’t notice it until I took these screenshots. It’s that tiny thin grey line to the left of the buttons.

This is a bad design for a few reasons. First, the thinness of the scrollbar means it’s easy to miss. The fact that it’s using the same thickness and muted grey as *all the other decorative lines* in the background aggravates the problem. Finally it’s on the left side, which is non-traditional for left-to-right languages.

I would suggest moving the scrollbar to the right, making it thicker and tweaking the colors to stand out a bit more. Or even consider ditching the scrollbar entirely. There’s plenty of room on the screen to show all six buttons.

Oh, and I’d get rid of those four dots at the bottom of the list. They look like an ellipsis, which makes me think I’m supposed to be able to expand it to see more, but it’s just a design element.

Perhaps because the scrollbar is so hard to notice, the designer of this next screen did away with it entirely, opting to use pagination instead.

{% image "starfield/starfield-kiosk-na-read.png", "Screenshot of an in-game kiosk labelled “Welcome to New Atlantis.” A large block of text describing the city is shown below, with a simple set of pagination controls indicating there are two pages and you’re viewing the first." %}

To their credit, the pagination controls aren’t hidden away, though there are still some problems here.

They certainly don’t have enough contrast, making them difficult to read for low-vision users, and the current page indicator, like the buttons, is only indicated by a color change. This could be addressed by darkening the text on the controls and by making the active page indicator a bit larger than the others.

{% image "starfield/starfield-desktop.png", "Screenshot of an in-game desktop computer interface. A set of four file icons are shown on the desktop, with one highlighted, showing it’s active. A window is open to the right of the icons, showing the text of the active file. The text has the same easy-to-miss left-hand scrollbar as discussed earlier." %}

Lastly, we have a view of the standard *Starfield* desktop computer interface. Files and folders are shown on the desktop and can be activated to open a window showing the contents. The active file is only indicated via color, but the contrast change is strong enough that it may be sufficient.

But let’s turn our attention to the window showing the text of the file. Oh dear, our low-contrast skinny left-hand scrollbar has returned. There is (practically) no indication to the user that they’re missing the last bit of the file. The scrollbar recommendations I made before apply here, but in addition, they might consider adding a [scroll shadow](https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/) along the bottom to hint to the user that there’s more to read just off-screen.

I love *Starfield*, but I find it depressing that even in a game emphasizing hope and human achievements, they couldn’t imagine a world with accessible user interfaces.
