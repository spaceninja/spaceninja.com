---
title: How We Use CI to Check Code Standards on Every PR
date: 2026-05-05
tags:
  - development
  - bestpractices
  - codereview
  - pullrequests
  - review
  - ci
  - cd
excerpt: Automating your code checks ensures every contribution meets standards, reduces the review burden, and increases confidence in AI-generated code.
canonical: https://cloudfour.com/thinks/ci-for-code-standards/
feature_image: feature/ci-standards.jpg
feature_alt: A cheerful-looking robot wearing a hard hat and holding a clipboard stands before a conveyor belt full of icons representing code changes, like a line inspector in a factory.
---

When I first heard the term continuous integration (CI), I was intimidated. As a former art major, I struggle with imposter syndrome when other devs rattle off terms I assume they picked up in computer science classes.

In this case, I was relieved to learn that CI is a complicated label for a basic concept: Developers should merge (integrate) their code back to the main branch as often as possible (continuously). This stands in contrast to a common scenario where devs work on a feature in isolation for so long that it drifts out of sync with the main code branch. When the time comes to merge, it creates a confusing mess.

CI is typically paired with another term, continuous deployment (CD), which says your main branch should be deployed automatically as changes are made. The idea is to avoid issues that arise from infrequent releases. When you have unreleased (or unreleasable) code in your main branch, it’s very difficult to make emergency bug fixes or urgent change requests.

So, CI means that devs regularly merge their code into the main branch, and CD means those merges automatically trigger a deployment. That’s CI/CD workflow in a nutshell. Sounds great, right?

## How Do You Ensure Code is Safe to Deploy?

You may have noticed a potential problem. If every commit is automatically deployed, then any bugs that are merged get deployed, too! By necessity, adopting a CI/CD workflow brings with it an expectation that your team should only merge code that’s safe to deploy.

The best way to address this concern is to require all code be [carefully reviewed](https://cloudfour.com/thinks/how-we-do-code-reviews-at-cloud-four/). Of course, those reviews take time, so teams typically invest in tooling to run automated quality control checks, like: Does the code compile without errors? Is it formatted to match the style guide? Do the tests pass? If any check fails, the changes are blocked until the issues are addressed. When most people talk about CI, they’re referring not only to the workflow, but also the tools that run those automated checks.

Note that automated checks are not a substitute for human review! Even if all the checks pass, there could be bugs that aren’t covered by tests or are difficult to automate, such as accessibility issues. The goal is to increase confidence by checking for obvious problems before a developer spends time reviewing it.

## Our Standard CI Setup

We work on a lot of projects, and have a fairly standard setup we use to keep things consistent for devs switching between them. It all starts in `package.json`, where we define a standard set of scripts to run our tests, [linters](https://cloudfour.com/thinks/code-linting-for-web-designers/), and type checkers. Here’s an example from a Vue project:

```json
// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest watch",
    "lint": "npm run lint:js && npm run lint:css && npm run lint:prettier",
    "lint:check": "npm run lint:js:check && npm run lint:css:check && npm run lint:prettier:check",
    "lint:js": "eslint . --fix",
    "lint:js:check": "eslint .",
    "lint:css": "stylelint --fix '**/*.{css,vue}'",
    "lint:css:check": "stylelint '**/*.{css,vue}'",
    "lint:prettier": "prettier . --write",
    "lint:prettier:check": "prettier . --check",
    "type-check": "nuxt typecheck"
  }
}
```

What those scripts actually do might vary. In a WordPress project, the `type-check` script could run PHPStan. In a project that uses Sass, the `lint:css` script would target `*.scss` files. The important part is the naming convention for the scripts. In any of our projects, a dev can confidently run `npm run lint` and trust that all the linters in the project will run. This sort of consistency makes life easier for devs, and makes them more likely to use these tools before putting code up for review.

The next step is to run those scripts automatically on every pull request. The CI tool we use most often is GitHub Actions.[^1] By creating a single file in the repository, we can ensure that every time a PR is opened, GitHub automatically runs a series of actions. Here’s an example of a GitHub Actions CI script from one of our projects:

[^1]: GitHub Actions is the tool we use most often, not because it’s the best, but because it’s integrated into GitHub, where our code already lives, and is easy to configure via a single file in the repo. In the past we’ve used Jenkins, Travis CI, Circle CI, GitLab CI, and Bitbucket Pipelines. They’re all fine. Pick the one that works best for your team and your stack.

{% raw %}

```yml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6
        with:
          persist-credentials: false
      - name: Use Node.js 24
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: Run Tests
        run: npm test
      - name: Run Lint
        run: npm run lint:check
      - name: Run Typing
        run: npm run type-check
      - name: Run Build
        run: npm run build
```

{% endraw %}

This script runs every time a PR is opened, and every time code is pushed to the `main` branch. It’s set to cancel any in-progress CI task if a new one is triggered. It checks out the code, installs the dependencies, and runs our npm scripts. We have all our repos configured to require that all status checks pass before merging. If any of the steps in our CI check fail, the PR is blocked and can’t be merged until the issues are addressed.

## CI Tooling is More Valuable in the AI Age

I’m a big believer in automated code checking. I can’t count the number of times it’s saved us. Imagine a senior dev who doesn’t think their tiny change warrants a full review, but is accidentally passing the wrong property type. (Perhaps, in this entirely fictional example, the dev’s name was Scott.) Or a designer who just wants to update the brand color, but unintentionally changes the CSS file from tabs to spaces. By running automated checks against every change, we’ve greatly increased our confidence. I love it.

And as more developers start experimenting with AI coding agents, these CI tools are becoming even more valuable. AI is improving, but it's still mostly operating at the level of an enthusiastic junior developer. Someone who knows how to code, but lacks real-world experience, and is perhaps a touch too eager to make clever changes to critical systems.

I enjoy working with Claude, but I’ve watched it confidently make sweeping changes without running the tests. It will create new functions that are very useful, but don’t follow our house style. So far, we’ve used Claude in an extremely hands-on way, like a pair programming session. The human dev has a good understanding of what’s changed, and can redirect.

But increasingly, I’m seeing my peers discuss using AI in a more hands-off fashion. They give it a directive, and allow it to run wild. They’re thrilled when the AI delivers, in an afternoon, more code than they could write in a week. But now they discover the real bottleneck is reviewing all that code.

In short, automating your code checks ensures every contribution meets your enforcable standards, reduces the burden of code review on other devs, and can help increase your confidence in AI-generated code.
