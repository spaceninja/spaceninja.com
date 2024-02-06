---
title: How to Publish an Updated Version of an npm Package
date: 2020-02-10T21:42:34.000Z
date_updated: 2020-02-10T21:42:34.000Z
tags:
  - howto
  - modules
  - packages
  - npm
excerpt: What’s typically involved in an npm version release? How can you determine the release process for an existing project? Can project maintainers do anything to make it easier for new contributors?
canonical: https://cloudfour.com/thinks/how-to-publish-an-updated-version-of-an-npm-package/
feature_image: feature/terminal.jpg
feature_source: https://unsplash.com/photos/eygpU6KfOBk
feature_credit: Pankaj Patel
---

Recently, I’ve been trying to do a bit more open source work, especially in the form of maintaining [Cloud Four’s npm packages](https://www.npmjs.com/org/cloudfour). However, as someone relatively new to the Operations side of things, I found myself getting lost about how exactly to release a new version of a package.[^1]

<aside>

🍿 Prefer video? [Check out this post on our YouTube channel!](https://youtu.be/Vi4gcv2H9jQ)

</aside>

Part of the problem was that these projects were created over many years, with multiple developers involved. Because standards and best practices evolve quickly, each project’s release process was configured differently. Some used a release helper tool like [npmpub](https://www.npmjs.com/package/npmpub), others had `prepublish` scripts, and others had nothing special at all.

None of this is bad, and I’m not trying to shame any other devs, but it did increase friction. Releasing a new version of any package was a little harder than it needed to be, since I had to figure out what process to use for each.

So I recently spent some time reading the npm docs and familiarizing myself with some of the most common release helper tools. I wanted get a better handle on what’s typically involved in the npm release process.

In this article, I’ll cover the most common release steps, how to determine the release process for an existing project, and recommendations for project maintainers.

1. [The “Standard” Release Process](#the-standard-release-process)
2. [Determining How to Release an Existing Project](#determining-how-to-release-an-existing-project)
3. [Recommendations for Project Maintainers](#recommendations-for-project-maintainers)
4. [Resources](#resources)

[^1]: As an aside, until recently, I mistakenly used the words [packages and modules](https://docs.npmjs.com/about-packages-and-modules) interchangeably. A **package** is a file or directory that is described by a `package.json` file. A **module** is any file or directory (typically found in the `node_modules` directory) that can be loaded by the Node `require()` function. So the npm registry contains _packages_, many of which contain Node _modules_.

## The “Standard” Release Process

Here is my understanding of the steps that are most commonly expected to be run when publishing a new version of an npm package.

1. Safety Checks:
   1. `git pull`
   2. `git status`
   3. `npm ci`
   4. `npm test`
2. Prepare the Release:
   1. `npm run build`
3. Update the Changelog
4. Update the Version Number:
   1. `npm version`
   2. Or by hand:
      1. Update version in `package.json` & `package-lock.json`
      2. `git commit -am '2.0.0'`
      3. `git tag v2.0.0`
5. Publish to npm:
   1. `npm publish`
6. Publish to Git:
   1. `git push`
   2. `git push --tags`
7. Create a GitHub Release (optional)

### 1. Safety Checks

The following steps are optional, but could save you a lot of trouble having to publish a bug fix after a bad release.

```shell
git pull
```

Check that you’re working on the `master` branch (or the branch you publish from), and ensure you’re not missing any commits from the repo.

```shell
git status
```

Confirm that you’ve got a clean working directory. You don’t want to see any uncommitted changes.

```shell
npm ci
```

The `ci` command will run a clean install of your Node modules, so you can validate that the versions you specify install cleanly.

```shell
npm test
```

If you have tests or linters, run them now, to make sure you don’t have any release-blocking problems in your code.

**Note:** It’s common to add some or all of these steps into a `preversion` or `prepublishOnly` script in `package.json`. [These scripts](https://docs.npmjs.com/misc/scripts) will be automatically run before the `npm version` or `npm publish` commands respectively. This will ensure that nobody forgets to run them.

### 2. Prepare the Release

If your package includes any resources that need to be compiled, now’s the time to run your build steps.

```shell
npm run build
```

This is the most common compile command, but your package may be configured differently. Check the documentation!

**Note:** If a build is required for your package, it’s a very good idea to add the build step to a [`prepublishOnly` script](https://docs.npmjs.com/misc/scripts). That way you can avoid the embarrassing situation of someone publishing a new version that doesn’t actually contain the new code.

### 3. Update the Changelog

I feel very strongly that every project should [keep a changelog](https://keepachangelog.com/). It allows users to see what noteworthy changes were made between releases, so it should be updated every time you publish a new version.

If your project already has a changelog, add a new entry for the version you’re about to publish. Follow the existing style, and remember that [changelogs are for humans](https://keepachangelog.com/en/1.0.0/#how), not machines. List what changed with this release, and why, with special attention paid to deprecations and breaking changes.

If your project doesn’t use a changelog, or prefers GitHub Releases (see below), consider adding one as part of this release. It’s never too late!

### 4. Update the Version Number

The easiest way to update your version number is to use the handy [`npm version`](https://docs.npmjs.com/cli/version.html) command. This will automatically update the version number in `package.json` and `package-lock.json`. It will also create a version commit and a new Git tag.

You’ll need to tell npm what type of release this is by specifying a valid [semantic versioning](https://semver.org/) type, such as `major`, `minor`, or `patch`. Then npm will update the appropriate part of your version number:

```shell
npm version minor
```

You could do this all by hand, if you prefer. For example, here’s what you would do for a minor release from version 2.0.0:

1. Update the version number to 2.1.0 in `package.json` & `package-lock.json`.
2. Commit the changes you just made: `git commit -am 'Bump version to 2.1.0'`
3. Make a new Git tag: `git tag v2.1.0`

However, an advantage of using `npm version` is you can configure it to run additional commands. Add a [`preversion` or `postversion` script](https://docs.npmjs.com/misc/scripts) to `package.json` with the commands you’d like to run before or after bumping the version.

For example, you could run the safety checks mentioned above in a `preversion` script so npm will only bump the version if the tests pass.

### 5. Publish to npm

Finally, once you’re confident this version is ready to release, you can [publish the updated package to npm](https://docs.npmjs.com/cli/publish).

```shell
npm publish
```

The `publish` command will add the updated package to the npm registry.

### 6. Publish to Git

You’ll also want to make sure your changes are promoted to the Git repo.

```shell
git push
```

Unfortunately, the `push` command doesn’t send tags. To push the new tag you made, you’ll need to run the `push` command again with the `--tags` flag:

```shell
git push --tags
```

**Note:** It can be a good idea to add these commands to a [`postpublish` script](https://docs.npmjs.com/misc/scripts), so that when someone releases code to npm, it’s automatically merged to Git at the same time.

### 7. Create a GitHub Release (optional)

[GitHub Releases](https://help.github.com/en/github/administering-a-repository/about-releases) are a proprietary feature that GitHub built on top of standard Git tags. They allow you to attach release notes to a tag.

I recommend that you copy the changes you made to the changelog earlier as the notes for your GitHub Release.

Some devs prefer GitHub Releases over maintaining a dedicated changelog file. However, [there are some downsides](https://keepachangelog.com/en/1.0.0/#github-releases) to this approach. Releases only exist in the GitHub web interface and are not very easy to discover. They are also a GitHub-only feature, so if you ever migrate to another version control provider, you’ll lose your release history.

Of course, [there’s no reason you can’t use both!](https://knowyourmeme.com/memes/why-not-both-why-dont-we-have-both)

### That Seems Like a Lot of Work!

No kidding! Judging by the many tools designed to help with releases, lots of devs feel the same way. Some of the most popular include [semantic-release](https://semantic-release.gitbook.io/semantic-release/), [release-it](https://www.npmjs.com/package/release-it), [np](https://github.com/sindresorhus/np), [npmpub](https://www.npmjs.com/package/npmpub), and [bump](https://github.com/fabiospampinato/bump).

Each tool addresses some of the pain points in the release process. You should evaluate helper tools carefully before deciding to add any to your process. Be aware that while a tool may automate some of the process, you’ll need to add clear documentation explaining how to use it, ideally in a [contributing guide](https://help.github.com/en/github/building-a-strong-community/setting-guidelines-for-repository-contributors).

There’s no clear industry standard, and many projects don’t have documented release procedures. This can make figuring out how to publish a new version tricky in a project you’re not familiar with.

Which brings us to the next topic:

## Determining How to Release an Existing Project

Now that we have a good understanding of the typical release steps, let’s talk about how to evaluate an existing project to determine what release process it uses.

### 1. Check the `README` and `CONTRIBUTING` Files

Start by looking at the `README` file. You’re not likely to find the release process here, because it’s intended for users, not contributors. However, there may be a link to a contributing guide.

If there isn’t, check for a `CONTRIBUTING.md` file. Most projects keep this in the root folder, but some move it to a `docs` folder or even the `.github` folder.

If you can’t find a contributing guide, or if it doesn’t document the release process, it’s time for the next step.

### 2. Ask Other Project Members

Someone has been handling releases before you. See if you can get in touch with the team and ask if anyone knows about the release process.

If you’re unsure who to ask, look at the commit history to see who’s name is on the last commit that bumped the version number.

If no one knows, or if you can’t get in touch with previous releasers, then it’s time for some detective work.

### 3. Look for Scripts in `package.json`

Start by looking in `package.json` for the `scripts` section. See if any of the scripts seem relevant.

Sometimes you’ll find a `release` or `publish` script that runs a release helper tool. If so, then you’ll want to try using this for releasing.

Or you might find some of the [publishing lifecycle scripts](https://docs.npmjs.com/misc/scripts), like `preversion`, `postversion`, `prepublishOnly`, or `postpublish`. If so, that’s a good indication that you’ll use the standard process outlined above, including the `npm version` and `npm publish` commands.

### 4. If All Else Fails, Follow the “Standard” Release Process

If you can’t find any documentation, and nothing indicates there’s anything custom about the release process, then you can follow the “standard” process outlined above.

Once you manage to get a successful release, it’s time to start thinking about the future. How can you improve the process for this project?

## Recommendations for Project Maintainers

Here are some things you can do to make it easier for new contributors to understand how to release a new version of your project.

### Document Your Release Process in a Contributing Guide

It’s a good idea to add a contributing guide to your project, so that new contributors can learn anything they need to know about how to work on it. That includes the release process.

GitHub has a [good introduction to adding a contributing guide](https://help.github.com/en/github/building-a-strong-community/setting-guidelines-for-repository-contributors). Typically, this lives in a `CONTRIBUTING.md` file to make it easy to find. If you put it anywhere other than the root folder, considering adding a link in the `README` as well.

### Document Your Release Helper Tools

Helper tools are great, but don’t assume that every contributor will be familiar with them. At the very least, add a link to the tool’s documentation from your contributing guide. Even better, explain exactly what steps you expect contributors to follow when using the tool.

For example, if you’re using a release tool that automates the process of updating the changelog, the contributing guide should explain what the result should look like and what a contributor using the tool can expect.

### Choose Release Helper Tools Carefully

In general, there’s a trade-off between a tool that abstracts some of the work away from contributors, and the extra overhead of those contributors having to learn how to use it.

If your team has more inexperienced contributors, a multiple-step release process could intimidate them or cause them to hesitate to release a new version. In this case, a helper tool might make things easier by reducing the number of steps they need to follow, and ensure they don’t skip a step by mistake.

On the other hand, if your team is mostly experienced open-source contributors, a release tool holding their hand might seem more annoying than helpful. In that case, limiting your helpers to a simple `preversion` or `prepublishOnly` script might make things easier, by hewing closer to the “standard” release process.

In the end, the best release process is the one that suits your team.

## Resources

- [How to make a beautiful, tiny npm package and publish it](https://www.freecodecamp.org/news/how-to-make-a-beautiful-tiny-npm-package-and-publish-it-2881d4307f78/)
- [Releasing a new version to GitHub](https://egghead.io/lessons/javascript-releasing-a-version-to-github)
- [Releasing a new version to npm](https://egghead.io/lessons/javascript-releasing-a-new-version-to-npm)
- [Automating releases with semantic-release](https://egghead.io/lessons/javascript-automating-releases-with-semantic-release)
- [Easy automatic npm publishes](https://blog.npmjs.org/post/184553141742/easy-automatic-npm-publishes)
- [These 6 essential tools will release, version, and maintain your NPM modules for you](https://hackernoon.com/these-6-essential-tools-will-maintain-your-npm-modules-for-you-4cbbee88e0cb)
- [How to publish packages to npm (the way the industry does things)](https://zellwk.com/blog/publish-to-npm/)
- [Learn how to develop and publish an npm package](https://auth0.com/blog/developing-npm-packages/)
- [How to test your new NPM module without publishing it every 5 minutes](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be)
