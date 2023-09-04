---
title: How to Automatically Update Your JavaScript Dependencies
slug: auto-update-js-dependencies
date: 2020-02-01T22:25:39.000Z
date_updated: 2020-02-10T21:43:22.000Z
tags:
  - development
  - security
  - renovate
  - maintenance
  - npm
excerpt: One frustrating aspect of the modern JavaScript ecosystem is keeping all your dependencies up to date. Thankfully, there are automated tools that can handle this thankless task for you.
canonical: https://cloudfour.com/thinks/auto-update-js-dependencies/
feature_image: /images/feature/renovate-me.jpg
feature_source: https://unsplash.com/photos/FQmwJSK0vB8
feature_credit: Mark de Jong
---

One frustrating aspect of the modern JavaScript ecosystem is keeping all your dependencies up to date. Thankfully, there are automated tools that can handle this thankless task for you.

If you need a good reason to keep your dependencies updated, consider the security of your project. For example, [in 2019 a critical vulnerability was discovered in lodash](https://snyk.io/blog/snyk-research-team-discovers-severe-prototype-pollution-security-vulnerabilities-affecting-all-versions-of-lodash/), a library used by over 4 million projects on GitHub. If your project uses [lodash](https://lodash.com/), and you didn’t update, you could have a security problem you don’t even know about.

There are other reasons as well, including compatibility with other libraries. By default when you install an npm module, it says to use _at least_ the version that you installed. But it doesn’t stop developers from using newer versions as they are released. This can cause problems if a newer version contains breaking changes.

Although it’s a good practice, updating dependencies takes time and effort and is a relatively thankless job. In other words, it’s a perfect target for automation!

There are several tools to handle this, including [Renovate](https://renovate.whitesourcesoftware.com/), [Greenkeeper](https://greenkeeper.io/), and [Dependabot](https://dependabot.com/). This article is going to focus on Renovate, because it was enthusiastically recommended by a coworker who’s a bit of a stickler for workflow tools. However, I’ve also used Greenkeeper, and they all work in roughly the same way.

Renovate constantly monitors the dependencies in your project. When a new version of a dependency is released, it opens a Pull Request (PR) to upgrade to the new version. Then you decide whether or not to merge the PR. You can even configure Renovate to [automatically merge](https://docs.renovatebot.com/noise-reduction/#automerging) certain types of updates!

By reducing the friction associated with dependency updates, Renovate makes it more likely that updates are applied in a timely fashion.

## 1. Add the Renovate GitHub App

The first step is to add Renovate to your stack. They offer integrated apps for [GitHub](https://github.com/marketplace/renovate) and [GitLab](https://gitlab.com/renovate-bot), and even a [self-hosted CLI tool](https://www.npmjs.com/package/renovate). Follow the directions to install the app, and then choose which Git repos you want to monitor.

Renovate will check your repo for a package manager config file, such as `package.json`. If it finds one it understands, it will open a PR to configure Renovate for your project.

## 2. Approve the Onboarding Pull Request

Once installed, the first PR that Renovate sends to your project is a minimal set of changes to add the Renovate configuration file.

[Here’s an example of the onboarding PR](https://github.com/cloudfour/core-hbs-helpers/pull/62). The description does an excellent job of letting you know how Renovate will be configured and what to expect after it’s merged.

Renovate starts you off with a reasonable set of defaults. However, if you want to change anything (for example, to limit when or how many PRs it can open per day), you can edit the Renovate config file on the branch before merging.

In terms of what to expect next, our project was a bit behind on some dependency versions, so it let me know it would open several PRs to update those. You're likely to see something similar.

## 3. Add the Renovate Badge (Optional)

> We need to talk about your flair… You do want to express yourself, don’t you?

If you’d like, you can add a badge to your `README` file so visitors know you’re keeping your dependencies up to date.

Copy and paste the [following code](https://github.com/renovatebot/renovate/issues/534) to the top of your `README` file, being sure to replace the user name and repo name.

```markdown
[![Renovate Status](https://badges.renovateapi.com/github/username/your-repo-name)](https://renovatebot.com/)
```

When you’re done, there should be a nice green badge at the top of your repo’s landing page, just like this one:

[![Renovate Status](https://badges.renovateapi.com/github/cloudfour/stylelint-config-cloudfour)](https://renovatebot.com/)

## 4. Update Your Continuous Integration Configuration (Optional)

If you use a Continuous Integration (CI) tool like [Travis](https://travis-ci.org/) or [Circle CI](https://circleci.com/), you may need to update the CI config file to work with Renovate’s branches.

For example, some of our projects use CI to automatically run tests on PRs. But we don’t want it to run on every commit to every branch, so it’s restricted to the `master` branch.

To allow tests to run for Renovate PRs, you’ll need to whitelist the Renovate branch name. Here’s what that looks like in a `travis.yml` file:

```yml
# Trigger a push build on master and renovate branches + PRs build on every branches
# Avoid double build on PRs (See https://github.com/travis-ci/travis-ci/issues/1147)
branches:
  only:
    - master
    - /^renovate.*$/
```

## 5. Review the New Batch of Pull Requests

Shortly after merging the onboarding PR, you should see some more PRs opened: One to pin your dependencies, and possibly more to update any out-of-date dependencies.

Earlier I mentioned the problem with npm allowing developers to use newer versions of a dependency than what you required. Pinning your dependencies means changing your list to require a specific version.

[Pinning dependencies is a complex topic](https://docs.renovatebot.com/dependency-pinning/), but I would argue that in most cases, it’s a good idea because it makes it more explicit what versions your project has been tested with.

Renovate may also open several PRs to update your dependencies to the most recent versions. How many PRs you get depends on how up-to-date your project is.

One nice touch — you don’t need to delete the branches for all these PRs. Renovate will clean up after itself a few minutes after the PR is merged!

### How to Review a Dependency Update Pull Request

Deciding whether to merge a dependency update PR is going to depend on how you want to test the update. If your project is a simple npm module with good test coverage, you might be happy to approve if all the tests pass.

On the other hand, if your project is a more complicated app, or you’re not confident the tests cover everything, you may need to check out the branch and test manually.

For web apps, if you’re using a tool like [Netlify Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/), you may have a preview environment that automatically builds for each PR, in which case you can just test there until you’re confident everything is working.

One useful bit of information that can inform this decision is the new version number of the updated dependency. Most npm packages follow the [Semantic Versioning](https://semver.org/) rule: Major.Minor.Patch. So upgrading from 12.0.0 to 12.0.1 would be a patch release, while upgrading to 13.0.0 would be a major release.

As a rule of thumb, minor and patch releases are not supposed to contain breaking changes, so they’re more likely to be safe to merge. Conversely, if you see a major version change, you should be prepared to test more rigorously.

### What if the Dependency Update Breaks Something?

If the tests on the PR don’t pass, or if your testing reveals a problem, then you’ll need to find a way to fix the issue before merging. You can check out the PR branch locally, make any changes necessary, and then push your changes to the branch.

The Renovate PR will usually include a “[Release Notes](https://github.com/cloudfour/stylelint-config-cloudfour/pull/53)” section that pulls from the dependency’s changelog. Reading these notes can be helpful when figuring out what changes you might need to make.

## 6. Update Your Project’s Version (Optional)

There’s [no clear answer](https://github.com/semver/semver/issues/148) for when to bump the version number of your project with regards to dependency updates.

The main thing to consider is that your project’s version number tells your users when things have changed. Do your users care about every dependency update?

For example, unless you’re releasing an ESLint plugin, your users likely don’t care if the version of ESLint your project consumes is updated.

The guideline we’ve been following is to make a major point release of a project if a dependency has a major point release. If a dependency has a non-breaking minor release, we typically don’t bother updating our version number. That may not make sense for your project, so consult with your team about how you’d like to handle this.

## Congratulations!

You’ve solved a time-consuming problem with automation! Go get yourself a treat as you watch the dependency update PRs roll in!

**Note:** This was originally posted on [my work blog](https://cloudfour.com/thinks/auto-update-js-dependencies/), and I'm re-posting it here for archival purposes.
