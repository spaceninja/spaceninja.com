---
title: What's the Point of Standup Meetings?
date: 2021-06-02T16:23:31.000Z
date_updated: 2021-06-02T16:23:31.000Z
tags:
  - standup
  - meetings
  - scrum
  - agile
  - project-management
  - process
excerpt: If your daily standup meeting has turned into “justify your salary” time, something’s gone wrong.
canonical: https://cloudfour.com/thinks/whats-the-point-of-standup-meetings/
feature_image: feature/scrum.jpg
feature_source: https://unsplash.com/photos/cK2UBBg4JI4
feature_credit: Quino Al
---

It’s no secret around the office that I’m a bit of a process wonk. In the past, I’ve been certified as a scrum master, and I have _opinions_ about agile workflows. So it may surprise you to learn that when a former coworker explained how the daily standup meetings at her company were a waste of time, I agreed with her! …Then I explained the trick to fix them.

If you’re in a hurry, here’s the primary takeaway: **The point of a daily standup meeting is so the team can check their progress towards a shared goal.** If it’s turned into “justify your salary” time, something’s gone wrong.

For the rest of this post, I’m going to be referring to Scrum things like story points and sprints. But standup meetings have become a standard part of our industry, even for teams that don’t use Scrum. Regardless of what process your team uses, the purpose of the standup meeting should apply, as long as the team has a shared goal they’re working towards. For Scrum, that will be the sprint backlog. Elsewhere, it might be a feature release or a client milestone. Either way, what I’m about to say should be applicable.

## What is a standup meeting for?

In Scrum, there are a small set of prescribed rituals that help the team increase transparency, inspect progress, and adapt their approach. The most important of these is the daily scrum, or “standup,”[^1] a short daily meeting where the project team[^2] plans their work for the next day and checks their progress towards a sprint goal.

The standup meeting is not for the engineering manager[^3] to make sure people are doing their work. It is not for team members to tally the hours they’ve spent, or give status updates to clients. **It is a meeting _by_ and _for_ the project team to plan their work for the day and check progress toward their goal.**

So how do they do that? By answering the three questions and reviewing metrics.

## What are the three questions?

To help the team inspect their confidence level, everyone should answer three questions:

1. What did I do yesterday that helped the team **meet the sprint goal**?
2. What will I do today to help the team **meet the sprint goal**?
3. Do I see any impediment that prevents me or the team from **meeting the sprint goal**? (Often phrased as “Do I have any blockers?”)

### What did you do, and what will you do?

You may have noticed I’ve highlighted “meet the sprint goal” in all three. This is the key point that I think a lot of teams lose track of. If you did something yesterday that wasn’t related to the sprint goal, then it doesn’t affect our confidence that we can meet our sprint goal. Everything you say in the standup meeting should help answer the question: “is our team going to be able to deliver on the commitment we’ve made?”

A problem I’ve often seen with standup is it becomes “justify your salary” time. Some team members may feel paranoid they will be judged by an apparent lack of progress, so they give _lengthy_ updates to ensure they sound busy. “Well, I wrote an email, and I was in three meetings, and I reviewed several PRs from another team, and I wrote a bunch of tickets…” All of those are fine, but none of them are relevant to the sprint goal.

It should be safe for a team member to not have an update at standup. If they don’t feel they can be honest about why they’re unable to contribute toward the sprint goal, then the team may not discover the issue until it’s too late to course-correct.

### Do you have any blockers?

How your team addresses blockers depends on your process. In traditional Scrum, addressing blockers is the responsibility of the scrum master, so the team can stay focused. In other workflows, this may fall to an engineering manager, project manager, or even the team itself. The point is not _how_ they get addressed, but that issues are raised as early as possible.

What qualifies as a blocker? Anything that jeopardizes the team’s ability to meet their goal. These might be individual or team level:

- If you need to update a database, but don’t have access.
- If the team is working on a feature that will impact another team.
- If the changes you’re making may lead to collisions with another developer.
- If you opened a PR two days ago and it hasn’t been reviewed yet.
- If a story turned out to be more complex than originally estimated.

Any of these might put the team in danger of failing to deliver the work they committed to. As a result, they’re all legitimate blockers and should be raised in standup. The earlier potential issues are raised, the better the chance they can be addressed, and the team can accomplish their goal.

## What metrics are worth checking?

So, now we know standup is a meeting where the team plans their work for the next day and checks their progress towards a sprint goal. When everyone is done answering the three questions, they should have a clear understanding of what tasks to focus on today. But how do they check their progress? That’s where metrics come in.

There are a lot of options when it comes to seeing if the team is making progress at the expected rate. I won’t go into too much detail here, but in a nutshell, you want something that will let you easily tell if the team is where they expect to be. Two of the most common metrics are velocity and a burndown chart:

- [Burndown Chart](https://blog.zenhub.com/tracking-sprint-progress-with-scrum-burndown-charts/): A burndown chart shows the work completed over time compared to an ideal trend line. I’m a big fan of this because it is clear at a glance if the team is on target (their work tracks the trend line), ahead of schedule (their work drops below the trend line), or falling behind (their work extends beyond the trend line). Most project management tools can generate a burndown chart, including [Jira](https://www.atlassian.com/agile/tutorials/burndown-charts) and [Trello](https://blog.trello.com/what-is-a-burndown-chart).
- [Velocity](https://www.atlassian.com/agile/project-management/metrics#:~:text=Velocity): In Scrum, velocity is a rolling average of how many story points the team completes in a sprint. It’s useful as a planning tool to determine how much work to accept in a sprint, but also for checking progress during the sprint. If your team’s velocity is 30 points, then you know by the midpoint of the sprint they should have completed roughly 15 points of work. Keeping an eye on that can help surface problems earlier in the sprint.

What metrics will be most valuable for your team will vary depending on what process you use. Look for something easy to understand and quick to review. The goal is that your team should be able to check this metric at the end of standup, and it should increase their confidence in whether they’re on track to meet their goal.

## What makes a standup useful?

If you feel your standup meetings are not valuable, consider the following:

- Standup is a meeting _by_ and _for_ the project team to plan their work for the day and check progress toward their goal.
- Ask the three questions, and make sure the answers are relevant to the team’s goal.
- Review your metrics to confirm the team is making progress as expected.

At the end of standup, the project team should be able to confidently answer “Are we on course to deliver the work we’ve committed to?”

## References

- [Let’s Talk About Scrum](https://www.youtube.com/watch?v=HdHU3D0QgW8) (video)
- [The Scrum Guide: Daily Scrum](https://scrumguides.org/scrum-guide.html#daily-scrum)
- [Standups for agile teams](https://www.atlassian.com/agile/scrum/standups)
- [Rules and Best Practices for the Daily Scrum / Stand-up meeting](https://scrumguru.wordpress.com/2012/01/31/rules-and-best-practices-for-the-daily-scrum-stand-up-meeting/)

[^1]: Often called a “standup” meeting because everyone is supposed to stand to encourage a faster meeting. I don’t recommend enforcing this rule [because it’s ableist](https://www.panopto.com/blog/the-worst-advice-for-running-more-effective-meetings/) and not compatible with distributed teams.
[^2]: Scrum uses the term “dev team” which always bugged me when I was a designer. If your team includes non-dev contributors, consider using “project team” or something similarly inclusive.
[^3]: Scrum says that the only attendees of this meeting should be the project team and the scrum master. It explicitly states that if anyone else attends, such as a product owner or engineering manager, the scrum master is expected to ensure they don’t disrupt the meeting. Often, management can have a disruptive effect simply by being present. If your team feels they cannot honestly assess their progress (or lack of) with management in the room, it may be time to ask them to step out. Be prepared to have an honest conversation about finding another way to increase their visibility into the team’s work.
