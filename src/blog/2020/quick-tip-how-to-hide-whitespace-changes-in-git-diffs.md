---
title: 'Quick Tip: How to Hide Whitespace Changes in Git Diffs'
date: 2020-04-20T21:31:25.000Z
date_updated: 2020-04-20T21:31:25.000Z
tags:
  - whitespace
  - gitlab
  - github
  - diffs
  - git
excerpt: If you’ve ever had to review a PR where the only code change is adding a wrapper element, you’ll be familiar with the pain of reviewing what appears to be a massive change but is actually trivial.
canonical: https://cloudfour.com/thinks/quick-tip-how-to-hide-whitespace-changes-in-git-diffs/
feature_image: hide-whitespace/hide-whitespace.jpg
---

If you’ve ever had to review a pull request where the only code change is adding or removing a wrapper element, you’ll be familiar with the pain of reviewing what appears to be a massive change but is actually trivial.

[In this example](https://github.com/spaceninja/git-demo/pull/5/files) I've added a wrapper element and removed some inner elements. By default, it looks like I changed almost every line. That's because git is highlighting every line that had an indentation change. When I hide whitespace changes, it becomes quite clear what I added and removed.

Most Git hosting services support the ability to hide whitespace changes by adding `?w=1` as a URL parameter. Let's explore how to hide whitespace changes for some of the big players.

## GitHub

You can [hide whitespace changes for GitHub diffs](https://github.blog/2011-10-21-github-secrets/) in two ways. First, click the gear icon near the top of the page and check the “Hide whitespace changes” option.

{% image "hide-whitespace/github-whitespace.png" "Screenshot of the GitHub UI, showing the “hide whitespace changes” option." %}

Or, you can add `?w=1` to the URL.

## GitLab

You can [hide whitespace changes for GitLab diffs](https://docs.gitlab.com/ee/user/project/merge_requests/reviewing_and_managing_merge_requests.html#ignore-whitespace-changes-in-merge-request-diff-view) in two ways. First, click the “Hide whitespace changes” button near the top of the page.

{% image "hide-whitespace/gitlab-whitespace.png" "Screenshot of the GitLab UI, showing the “hide whitespace changes” button." %}

Or, you can add `?w=1` to the URL.

## Bitbucket

You can [hide whitespace changes for Bitbucket diffs](https://bitbucket.org/blog/new-year-new-features#:~:text=Ignore%20whitespace%20in%20diffs%20via%20URL) by adding `?w=1` to the URL.
