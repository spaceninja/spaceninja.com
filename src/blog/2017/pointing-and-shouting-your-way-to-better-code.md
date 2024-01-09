---
title: Pointing and Shouting Your Way to Better Code
date: 2017-04-01T08:00:00.000Z
date_updated: 2018-09-18T05:11:20.000Z
tags:
  - satire
  - software-development
  - code-review
  - shouting
  - efficiency
  - process
  - japan
feature_image: feature/pointing-and-calling.jpg
feature_source: https://commons.wikimedia.org/w/index.php?curid=10632684
feature_credit: SoHome Jacaranda Lilau
---

Time and again we turn to the Japanese for inspiration to improve process and efficiency. Toyota's [lean manufacturing](https://en.wikipedia.org/wiki/Lean_manufacturing) processes gave us the concept of [_kaizen_](https://en.wikipedia.org/wiki/Kaizen) (continuous improvement), as well as the [_kanban_](https://en.wikipedia.org/wiki/Kanban) scheduling system, both of which have dramatically influenced modern software practices. It's only natural that the newest method taking Silicon Valley by storm is [_shisa kanko_](https://en.wikipedia.org/wiki/Pointing_and_calling) (pointing and calling), an occupational safety technique created by Japanese train drivers in the early 1900s.

The system is simple and tends to look silly to Westerners, but it has been demonstrated to [reduce mistakes by nearly 85 percent](http://www.atlasobscura.com/articles/pointing-and-calling-japan-trains) for simple tasks! Anything that effective, however silly it may seem, is worth a closer look.

It works on the principle of associating vocal calls with a physical motion to reinforce the mental action of confirming the task is complete. For example, a train driver will physically point to the speedometer and say out loud "speed check, 80." Staff checking that the station is free of obstructions will sweep their arm to physically gesture the full length of the platform before verbally announcing it's clear.

Pointing and calling requires a person to coordinate the action between their brain, eyes, hands, mouth and ears. It also helps prevent carelessness when performing the same task repeatedly, when a worker's attention might otherwise wander.

Which brings us to software development. How many times have you sat in a meeting, listening to the same admonishment from an engineering manager about code quality? Perhaps you have a strict pull request and code review process. Maybe the code reviewers are held accountable for code that ships under their approval along with the person who wrote it. Perhaps your team even engages in some good-natured [public shaming](http://codingwithempathy.com/2017/01/10/rituals-of-shaming-in-the-software-industry/) for developers who break the build.

I'd be willing to bet mistakes still happen. Software developers are often overloaded. Open office plans are full of distractions. A developer needs to finish their own work, help review other's code, attend meetings, and help plan upcoming work. Deadlines loom, and pressure builds until even your best workers take shortcuts: pushing an urgent bugfix to master that hasn't been properly reviewed. Committing code with no tests. Approving code reviews without actually running the code.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/9LmdUz3rOQU" frameborder="0" allowfullscreen></iframe>

Enter the "Point and Shout" method. (We're Americans, shouting was the natural next step in the process.) Now, instead of writing code quietly and posting in the company Slack channel requesting a code review, a developer must coordinate their attention with physical and verbal confirmations to ensure they're following the process. Imagine the following:

Alice has written some code. When she's ready to put her code up for review, before she hits the button to post it, she points to her passing tests in a terminal window and calls out "TESTS PASSING!" Then she points to her well-written commit message and calls out "INFORMATIVE COMMIT MESSAGE WRITTEN!" Finally, she points to the button and calls out "PUSHING CODE FOR REVIEW!"

Bob hears all this (how could he not, he sits right next to Alice!), and opens her code review. He pulls her branch, tests the change in the browser, verifies the tests are passing and reads her code. He sees some changes she should make and leaves a helpful comment. Before submitting, he points to his well-written and informative comments and calls out "POSTING FEEDBACK TO ALICE'S CODE REVIEW!"

Feedback given, Bob turns to his own code review, posted earlier that morning. It's been approved by two other developers, which means he has permission to merge his code to master. He points to the first comment and calls out "FIRST APPROVAL," then to the second and calls out "SECOND APPROVAL!" Finally, he points to the merge button and calls out "MERGING TO MASTER!"

Developers who work from home may initially be reluctant to follow this process. That's why we recommend teams adopt an "always on video" rule. Ensure every remote member of your team joins a video conference call every day so the rest of the team can see that they're participating in the new culture of focus and attention.

Similarly, we recommend not allowing your team to make exceptions even when working late at night. Encourage your on-call workers to step outside to avoid bothering their spouses or roommates. Then they should call the secondary on-call person and announce their steps over the phone. If the neighbors complain, I've found you can usually just blame it on a passing drunk. It'll take the pressure off you, and gives your neighbor something to complain about at the next NIMBY protest against building affordable housing.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/xpkrIu2p_iM" frameborder="0" allowfullscreen></iframe>

As you can see, the Point and Call method is a natural fit with software development. Just imagine how many fewer mistakes your team will make when they adopt the point-and-call process in your office! It may seem silly at first, but soon you will associate the constant shouting with dramatically reduced bug counts and no more late-night rollbacks.

We encourage you to adopt it today at your company. Before you know it, you'll be reading breathless profiles of trendy startups abandoning agile development in favor of pointing and shouting. Get on board before this train leaves the station!
