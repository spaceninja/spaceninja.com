const markdownItFootnote = require('markdown-it-footnote');

const { EleventyHtmlBasePlugin } = require('@11ty/eleventy');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginTimeToRead = require('eleventy-plugin-time-to-read');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

const pluginImages = require('./_11ty/images.js');
const collections = require('./_11ty/collections.js');
const filters = require('./_11ty/filters.js');
const shortcodes = require('./_11ty/shortcodes.js');

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
    watch: ['dist/styles/*.css'],
  });

  // Official plugins
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      'src/_includes/partials/*.webc',
      'npm:@11ty/eleventy-img/*.webc',
    ],
  });

  // Community Plugins
  eleventyConfig.addPlugin(pluginTimeToRead, {
    speed: '238 words per minute',
    style: 'short',
  });

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib
      .use(markdownItFootnote);
    mdLib.renderer.rules.footnote_caption = (tokens, idx) => {
      var n = Number(tokens[idx].meta.id + 1).toString();
      if (tokens[idx].meta.subId > 0) {
        n += ':' + tokens[idx].meta.subId;
      }
      return n;
    };
    mdLib.renderer.rules.footnote_block_open = () =>
      '<h2>Footnotes</h2>\n' +
      '<section class="footnotes">\n' +
      '<ol class="footnotes-list">\n';
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
