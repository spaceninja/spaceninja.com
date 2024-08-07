import markdownItFootnote from 'markdown-it-footnote';

import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import pluginNavigation from '@11ty/eleventy-navigation';
import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginTimeToRead from 'eleventy-plugin-time-to-read';
import pluginWebc from '@11ty/eleventy-plugin-webc';

import pluginAnchors from './_11ty/eleventy-ids.js';
import pluginImages from './_11ty/images.js';
import collections from './_11ty/collections.js';
import filters from './_11ty/filters.js';
import shortcodes from './_11ty/shortcodes.js';

/**
 * Based on Eleventy Base Blog v8
 * @see https://github.com/11ty/eleventy-base-blog/tree/main
 */
export default (eleventyConfig) => {
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
  eleventyConfig.addPlugin(pluginAnchors);

  // Customize Markdown library settings:
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItFootnote);
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
