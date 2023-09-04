const markdownItAnchor = require('markdown-it-anchor');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginTimeToRead = require('eleventy-plugin-time-to-read');

const pluginImages = require('./eleventy.config.images.js');
const collections = require('./eleventy.collections.js');
const filters = require('./eleventy.filters.js');
const shortcodes = require('./eleventy.shortcodes.js');

/**
 * Based on Eleventy Base Blog v8
 * @see https://github.com/11ty/eleventy-base-blog/tree/main
 */
module.exports = function (eleventyConfig) {
  // Copy over various static files
  // For example, `./public/css/` ends up in `_site/css/`
  eleventyConfig.addPassthroughCopy({
    './public/': '/',
  });

  // Run Eleventy when these files change:
  // Watch content images for the image pipeline.
  eleventyConfig.addWatchTarget('content/**/*.{svg,webp,png,jpeg}');

  // Additional files to watch that will trigger LiveReload updates:
  // Watch for CSS changes
  eleventyConfig.setServerOptions({
    watch: ['dist/*.css'],
  });

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });

  // Community Plugins
  eleventyConfig.addPlugin(pluginTimeToRead, {
    speed: '238 words per minute',
  });

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.linkAfterHeader({
        assistiveText: (title) => `Permalink to “${title}”`,
        visuallyHiddenClass: 'visually-hidden',
        wrapper: ['<div class="heading">', '</div>'],
        placement: 'before',
        class: 'heading__permalink',
        symbol: '🔗',
      }),
      level: [1, 2, 3, 4],
      slugify: eleventyConfig.getFilter('slugify'),
      tabIndex: false,
    });
  });

  // Collections
  for (let name in collections) {
    eleventyConfig.addCollection(name, collections[name]);
  }

  // Filters
  for (let name in filters) {
    eleventyConfig.addFilter(name, filters[name]);
  }

  // Shortcodes
  for (let name in shortcodes) {
    eleventyConfig.addShortcode(name, shortcodes[name]);
  }

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
