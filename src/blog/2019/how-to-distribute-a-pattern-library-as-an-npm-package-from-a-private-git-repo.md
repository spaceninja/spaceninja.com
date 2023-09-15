---
title: How to Distribute a Pattern Library as an npm Package from a Private Git Repo
date: 2019-04-15T17:00:00.000Z
date_updated: 2019-04-28T19:58:02.000Z
tags:
  - pattern libraries
  - development
  - web development
  - software development
  - oauth
  - heroku
  - github
  - git
  - build
  - npm
canonical: https://cloudfour.com/thinks/how-to-distribute-a-pattern-library-as-an-npm-package-from-a-private-git-repo/
feature_image: feature/npm-keyboard.jpg
feature_source: https://unsplash.com/photos/oZMUrWFHOB4
feature_credit: Paul Esch-Laurent
---

So you’ve got a pattern library: Congratulations! The next step is making it possible for other people to use those patterns. You could simply provide download links for the CSS and other assets, but then your users can’t easily get any updates to the pattern library. Instead, you should consider making it available as an npm package.

However, this can be a lot more complicated if your pattern library lives in a private Git repository, because npm packages are public by default. Private npm packages are available, but they cost money and aren’t an option for every team. I went through this recently, and it was complex enough that I thought documenting it in a blog post would be useful.

1. [Make your pattern library an npm package](#makeyourpatternlibraryannpmpackage)
   1. [Add a package.json file if you don’t have one](#addapackagejsonfileifyoudonthaveone)
   1. [Expose your main JS and CSS files](#exposeyourmainjsandcssfiles)
   1. [Dependencies vs devDependencies](#dependenciesvsdevdependencies)
   1. [Only publish your compiled assets](#onlypublishyourcompiledassets)
1. [Distribute your npm package from Git](#distributeyournpmpackagefromgit)
   1. [Use the “prepare” script to build your library](#usethepreparescripttobuildyourlibrary)
   1. [Tag your releases](#tagyourreleases)
   1. [Update your README](#updateyourreadme)
1. [Allow your server to access your private Git-hosted npm package](#allowyourservertoaccessyourprivategithostednpmpackage)
   1. [Create a GitHub “Machine User” with read-only access](#createagithubmachineuserwithreadonlyaccess)
   1. [Generate an access token](#generateanaccesstoken)
   1. [Set the token as an environment variable](#setthetokenasanenvironmentvariable)
   1. [Add the Heroku GitHub netrc buildpack](#addtheherokugithubnetrcbuildpack)
1. [Conclusion](#conclusion)

---

## Make your pattern library an npm package

To begin with, I’m going to assume the following about your pattern library:

- The pattern library is stored in a Git repo (this article is based on a private GitHub repo, but the process should work equally well for any Git repo).
- Your pattern library has a build step. It doesn’t matter what that build step is, as long as we can trigger it from the command line, e.g., `npm run build`.
- Your pattern library assets live in a `dist` folder. If they don’t, you’ll need to adapt the instructions to match your setup.

Now let’s configure your pattern library as an npm package.

### Add a package.json file if you don’t have one.

The `package.json` file is what tells npm that your Git repo contains an npm package. If you already have one, just move on to the next step. If you’ve never done this before, don’t be intimidated. It’s just a standardized collection of JSON attributes that describe how to build your package. You can get started by typing `npm init` from the command line and answering the questions it asks you.

- [Creating a package.json file](https://docs.npmjs.com/creating-a-package-json-file)
- [How to create your first Node Module](https://codeburst.io/how-to-create-and-publish-your-first-node-js-module-444e7585b738)

### Expose your main JS and CSS files

The `main` field in `package.json` should be pointed at your pattern library’s primary JavaScript file. This is so that if a user installs your pattern library from npm, they can use `require('your-pattern-library')` and your library’s exports will be returned.

If your package doesn’t export anything, then the `main` field doesn’t really apply and you can ignore it.

You should also add a `style` field to `package.json`, pointing at your main CSS file. This exposes your pattern library’s CSS, similar to the way `main` works, but for CSS. This is a non-standard field, but more and more pattern library packages are adding it, and some tools know to look for it.

- [Package.json “style” attribute](https://jaketrent.com/post/package-json-style-attribute/)
- [PR discussion to add “style” to Bootstrap](https://github.com/twbs/bootstrap/pull/12441)

### Dependencies vs devDependencies

For a standard JS-based npm module, the question of what’s a dependency vs a devDependency is simple. If a module is used in your bundle, it’s a dependency. Normally, that means things like Sass are listed as a devDependency.

For an npm package like our pattern library, it’s a little less clear. I got bitten by this when we tried to use our pattern library package on production. It seems obvious in hindsight, but production environments won’t install your devDependencies. In our case, that meant the pattern library wouldn’t build.

Anything required for your build to succeed should be listed as a dependency. Anything that’s not (such as listing) can be a devDependency. In our case, that means practically everything is a dependency, leaving linters and not much else as a devDependency.

- [dependencies or devDependencies?](https://silvenon.com/blog/dependencies-or-devdependencies)

### Only publish your compiled assets

This one is a little confusing, but basically, you want to give opposite instructions to Git and npm.

For Git, you’ll want to list your `dist` folder in your `gitignore`. That’s because it’s bad form to commit compiled assets to your Git repo.

But for npm, it’s just the opposite. No one installing your package needs the source files, they only care about the compiled assets. You can use the `files` field in `package.json` to tell npm to ignore everything _except_ your `dist` folder.

```json
"files": ["dist/**/*"],
```

- [Package.json “files” field](https://docs.npmjs.com/files/package.json#files)
- [How do you use the “files” property in package.json?](https://stackoverflow.com/a/41285281)

---

## Distribute your npm package from Git

Now you should have a Git repo that contains a properly configured `package.json`, which means it can be installed with npm.

If your Git repo is public, and you don’t mind your pattern library being available to the public as well, then you're basically done. You can [publish your package on npm](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) which allows anyone to install it with `npm install your-pattern-library`.

However, if your Git repo is private, then you have two options. You can [publish a private package on the npm registry](https://docs.npmjs.com/creating-and-publishing-private-packages), but this requires being part of a [paid npm org](https://www.npmjs.com/products/orgs).

If that’s not a possibility, then your last option is to install your npm package directly from the Git repo. However, this requires a few additional steps:

### Use the “prepare” script to build your library

When you host your package on npm, you explicitly run a `publish` command, which runs locally and has access to your compiled assets. That way npm gets your compiled assets and doesn’t need to know anything about your build process.

But when you install your package directly from Git, those compiled assets aren’t there, because we’ve added them to the `gitignore` file.

I thought the only option to work around this was to commit our `dist` folder to Git. Thankfully, before I did that, I stumbled across a [great article](https://blog.jim-nielsen.com/2018/installing-and-building-an-npm-package-from-github/) that introduced me to the `prepare` script in `package.json`.

In a nutshell, this is an npm script that will run before the package is installed. It can do anything, including run your build script. As a result, whenever someone installs your package, npm will automatically grab all the dependencies and run your build step. Now your compiled assets are available, without needing to be checked into Git.

The only downside is that installing your package takes a bit longer because it has to run the build step. Personally, I think the trade-off is worth it to keep our Git repo clean, but [some people feel differently](https://medium.com/@maxf/its-ok-to-put-compiled-front-end-assets-in-git-9b41abdb803a). You’ll need to talk to your team about what approach is right for you.

- [Package.json “prepare” script](https://docs.npmjs.com/misc/scripts)
- [Installing and Building an npm Package from Github](https://blog.jim-nielsen.com/2018/installing-and-building-an-npm-package-from-github/)

### Tag your releases

When your package is hosted with npm, you get semantic versioning for free. Just bump your version number in the `package.json` file and publish to npm. Anyone who’s installed your package can opt into new versions automatically, or choose what semantic versioning (SemVer) upgrade pattern to follow.

When you install an npm package from Git, it works a little differently. By default, it will just clone whatever’s in the `master` branch, and never receive any updates (because it doesn’t know about them).

However, you can also specify a “commit-ish”, which will tell npm to look for a commit or tag that matches. You can even use npm-style SemVer matching:

```shell
npm install <git remote url>#semver:<semver>
```

If you’re using GitHub, you can even use a shorthand version:

```shell
npm install <githubname>/<githubrepo>#semver:<semver>
```

To take advantage of this feature, you’ll need to start tagging your releases in Git. [Fully explaining tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) is beyond the scope of this article, but luckily npm gives us an easy tool:

```shell
npm version patch
```

Running that command will bump the version number in `package.json` for a patch release, make a Git commit for that change, and add a Git tag.

Unfortunately, `git push` doesn’t push your tags by default, so you’ll need to do the following to push both the new commit and the tag to your repo:

```shell
git push && git push --tags
```

There you have it! Now you have a tagged release in your Git repo that any npm users can access and use SemVer to opt into or out of.

I can also recommend [Bump](https://github.com/fabiospampinato/bump), a handy npm package that lets you run a single command to do everything associated with a version change. It will update your project’s version, update (or create) the changelog, make a Git commit and tag, and optionally make a GitHub release.

- [npm “install” command](https://docs.npmjs.com/cli/install.html)
- [npm “version” command](https://docs.npmjs.com/cli/version)
- [Understanding npm Versioning With Git Tags](https://medium.com/@barberdt/understanding-npm-versioning-with-git-tags-ce669fc93dbb)

### Update your README

Now that you’ve set up tagged releases, make sure your README has an “Installation” section that outlines how to install from the Git repo using SemVer. I’d recommend adding something like the following:

````markdown
To consume the pattern library in your app, we recommend installing via npm. If you want to install a specific version range, you can:

```
npm install --save your-name/your-repo#semver:^0.3.1
```
````

---

## Allow your server to access your private Git-hosted npm package

We’re almost done. At this point, you’ve converted your pattern library to an npm package and made it available to install directly from your private Git repo. As long as it only needs to be installed by devs who have access to your repo, you’re golden.

But in our case, we wanted to deploy the style guide that builds with our pattern library to a Heroku site. And that meant figuring out how to give Heroku access to our private Git repo.

If you search for solutions, you’ll find a lot of people saying you need to create an access token, and then you add that to the Git URL in `package.json`. However, committing access tokens to a repo—even a private one—is a bad idea.

Instead, you can configure your server to use the access token from an environment variable, which isn’t under version control. Here’s how we did that for Heroku.

### Create a GitHub “Machine User” with read-only access

You’ll need to create a new Git account and grant that account read-only permissions to your repo. This is important! Don’t generate the access token from your account, or the token will have write access.

GitHub refers to these accounts as “Machine Users” because they’re intended exclusively for automation and will never be used by a human.

- [Managing GitHub Deploy Keys: Machine Users](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users)

### Generate an access token

The process for this will be different depending on your Git provider. For GitHub, you can do it from the terminal using this command:

```shell
curl -u 'my-read-only-user' -d '{"scopes":["repo"],"note":"GITHUB_AUTH_TOKEN for Heroku deplyoments","note_url":"https://github.com/timshadel/heroku-buildpack-github-netrc"}' https://api.github.com/authorizations  # Github API call
```

- [GitHub: Easier builds and deployments using Git over HTTPS and OAuth](https://github.blog/2012-09-21-easier-builds-and-deployments-using-git-over-https-and-oauth/)
- [GitHub: Creating a personal access token for the command line](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
- [GitHub: Authorizing OAuth Apps](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

### Set the token as an environment variable

You can set environment config variables from the Settings page of your Heroku app. You’ll want to add a new variable called `GITHUB_AUTH_TOKEN` and set its value to the access token you just created for your read-only user. You can do this via the Heroku UI or from the command line:

```shell
heroku config:set GITHUB_AUTH_TOKEN=<my-read-only-token>
```

- [Heroku: Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)

### Add the Heroku/GitHub netrc buildpack

Lastly, you’ll need to add the [heroku-buildpack-github-netrc](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-github-netrc) buildpack to your Heroku app. This buildpack configures Heroku to access your private Git repo via OAuth using the access token variable you just created. You can do this via the Heroku UI or from the command line:

```shell
heroku create --buildpack https://github.com/fs-webdev/heroku-buildpack-netrc.git
```

Once it’s added, make sure this buildpack comes before the standard Node one, or your app’s build will break because it can’t access your repo.

- [Heroku buildpack: Github private repo access via ~/.netrc](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-github-netrc)

---

## Conclusion

You’ll make life a lot easier by making your Git repo public and hosting your package in npm’s public repo.

If a public Git repo is a non-starter, then consider paying for a private package on npm. That costs money, but it’s definitely easier than everything I’ve just described.

But if you can’t do that, then it’s good to know that you can serve your npm package from a private Git repo. Just be prepared to jump through a lot of hoops to make it happen.

If you think I’ve missed something, or if there’s a better way to accomplish what I’ve described, please let me know! I’d love to make this process simpler.

<small><strong>Note:</strong> This was originally posted on <a href="https://cloudfour.com/thinks/how-to-distribute-a-pattern-library-as-an-npm-package-from-a-private-git-repo/">my work blog</a>, and I'm re-posting it here for archival purposes.</small>
