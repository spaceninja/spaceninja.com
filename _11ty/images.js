const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');
const { eleventyImagePlugin } = require('@11ty/eleventy-img');
const { imgPath } = require('./filters');

module.exports = (eleventyConfig) => {
  // Eleventy Image shortcode
  // https://www.11ty.dev/docs/plugins/image/
  eleventyConfig.addAsyncShortcode(
    'image',
    async function imageShortcode(
      src,
      alt,
      loading = 'lazy',
      sizes = '100vw',
      classList = '',
      formats = 'webp',
      widths = '768,1024,1280,1600',
    ) {
      let file = imgPath(src);
      let metadata = await eleventyImage(file, {
        formats: formats.split(','),
        outputDir: path.join(eleventyConfig.dir.output, 'images'),
        svgShortCircuit: true,
        urlPath: '/images/',
        widths: widths.split(','),
      });
      let imageAttributes = {
        alt,
        class: classList,
        decoding: 'async',
        loading,
        sizes,
      };
      return eleventyImage.generateHTML(metadata, imageAttributes);
    },
  );

  eleventyConfig.addFilter('feedImage', async (src) => {
    let file = imgPath(src);
    let metadata = await eleventyImage(file, {
      formats: ['webp'],
      outputDir: path.join(eleventyConfig.dir.output, 'images'),
      urlPath: '/images/',
      widths: [1600],
    });
    return metadata.webp[0].url;
  });

  // Image plugin
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Set global default options
    formats: ['webp'],
    outputDir: path.join(eleventyConfig.dir.output, 'images'),
    svgShortCircuit: true,
    urlPath: '/images/',
    widths: [768, 1024, 1280, 1600],

    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '100vw',
    },
  });
};
