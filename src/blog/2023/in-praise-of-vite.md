---
title: In Praise of Vite
date: 2023-03-28T15:35:06.000Z
date_updated: 2023-03-28T15:35:06.000Z
tags:
  - webpack
  - vite
  - javascript
  - development
excerpt: The single best feature of Vite, as far as I’m concerned, is its simplicity. Compared to the nightmare of configuring WebPack and Babel? Vite is delightfully easy to use.
canonical: https://cloudfour.com/thinks/in-praise-of-vite/
feature_image: feature/unicorn-hearts-vite.png
---

I consider myself a fairly capable developer. I even enjoy working with the infrastructure that powers our projects. I love setting up our design tokens, preprocessors, linters, and other tools that help us write better code. That said, there’s one thing that causes me to break into a sweat: configuring complex build tools like Webpack and Babel.

These tools, while undeniably powerful, are some of the most arcane and difficult to work with I’ve ever used. I’m sure there are people out there who are rolling their eyes at me, and find this stuff completely understandable. I’m happy for you! But I don’t think I’m alone in feeling this way.

Let me share an example Webpack config from a Nuxt project we maintain (feel free to just skim past this, I’m just making a point about complexity):

```javascript
/* nuxt.config.js */
module.exports = {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      /**
       * Transpile All Node Modules
       */
      const jsRule = config.module.rules.find((rule) => rule.test.test('.js'));
      // don't transpile babel helpers and core-js
      jsRule.exclude = /(core-js|babel)/;
      const babelOptions = jsRule.use[0].options;
      if (isClient) {
        // By default, babel will assume all modules are ES modules. This would
        // lead babel to inject ES imports even in commonjs files.
        // Source Type unambiguous forces babel to check each file individually
        // and decide whether it is commonjs or an ES module.
        babelOptions.sourceType = 'unambiguous';
      }

      /**
       * Allow vue-loader to transform assets in `data-srcset` and `data-src`
       * as well as `srcset` and `src`.
       *
       * @see https://dev.to/ignore_you/minify-generate-webp-and-lazyload-images-in-your-vue-nuxt-application-1ilm
       */
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src'];
        vue.transformAssetUrls.source = ['data-srcset', 'srcset'];
      }

      /**
       * Allow Inline SVGs
       *
       * Nuxt has a single rule for all image types that uses `file-loader`.
       * This rule says "For SVG images with the inline parameter,
       * use `vue-svg-loader` instead."
       *
       * @see https://vue-svg-loader.js.org/faq.html#how-to-use-both-inline-and-external-svgs
       */
      const svgRule = config.module.rules.find((rule) =>
        rule.test.test('.svg')
      );
      svgRule.test = /\.(png|jpe?g|gif|webp)$/;
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              // babel loader is run after the svg files are transpiled into vue
              // components (webpack runs loaders bottom-to-top)
              {
                loader: 'babel-loader',
                options: babelOptions,
              },
              {
                loader: 'vue-svg-loader',
                options: {
                  svgo: false,
                },
              },
            ],
          },
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      });

      /**
       * Run ESLint on save
       */
      if (isDev && isClient) {
        // eslint-disable-next-line global-require
        const ESLintPlugin = require('eslint-webpack-plugin');
        config.plugins.push(
          new ESLintPlugin({
            extensions: ['js', 'vue'],
          })
        );
      }
    },
  },
};
```

Believe it or not, that’s a relatively simple and well-documented config. We only needed to add a few things, and the devs who added them left helpful comments and links to documentation. Still, when something goes wrong? It’s a nightmare trying to figure out why and how to fix it.

And that’s why I’ve been so thrilled with [Vite](https://vitejs.dev/) (pronounced “veet,” French for “quick”), a modern dev environment and build tool that completely replaces Webpack. I could bore you with details like how it takes advantage of browser-native [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) to support [dependency pre-bundling](https://vitejs.dev/guide/dep-pre-bundling.html) and [hot-module replacement](https://vitejs.dev/guide/features.html#hot-module-replacement), or how it was originally created to speed up Vue, but has been converted to a framework-agnostic tool, or that in just two years it’s grown to over [3 million downloads per week](https://www.npmjs.com/package/vite). But frankly, you’d be better served checking out [Vite’s features page](https://vitejs.dev/guide/features.html).

What I want to rave about is what I consider the best feature of Vite. The thing that’s had the most dramatic impact on the way I work, and why it’s so useful to me. I want to talk about Vite’s _simplicity_.

Remember that “simple” Webpack config? Here’s the Vite config from the same project after we upgraded:

```javascript
/* nuxt.config.js */
import svgLoader from 'vite-svg-loader';
export default defineNuxtConfig({
  vite: {
    plugins: [svgLoader({ svgo: false })],
  },
});
```

That’s it! That’s the whole thing! All the same features, but with only a single line of config to load a plugin to inline SVGs.

Compared to Webpack, Vite is delightfully easy to use. As an opinionated tool, it simply handles most of the things we need right out of the box. Your config file is likely to be minimal. In many cases, it’s only used to load plugins that help Vite understand how to process things like Vue single-file components or inlining SVGs. On several of my [simpler side projects](https://github.com/spaceninja/excuse-generator), there’s no config file _at all!_

At the most basic level, Vite only cares about your entry file — the `index.html` file that lives at the root of your app. Any CSS or JS files you load from there will be processed by Vite.

- Want to use Sass? Install Sass with npm, and Vite will automatically process any Sass files you link to.
- How about PostCSS? No problem! Just add a PostCSS config file, and Vite will figure it out.
- Need to load some information from a JSON file? Can do! Vite allows you to directly import it into your JS file.
- TypeScript? You got it! Just use the `*.ts` extension, and Vue will handle everything for you.

To do all these things in older projects using Webpack and Babel required a nightmare of configuration, plugins, and maintenance.

There are a lot of [technical reasons why Vite is great](https://vitejs.dev/guide/why.html). But for me, it removes the single most painful part of modern web development. At the end of the day, _it just works_. With very little instruction, it does everything I want. Load this file, process it as needed, and let me get back to writing code.

Thanks, Vite!
