const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');
const eleventyWebcPlugin = require('@11ty/eleventy-plugin-webc');
const { eleventyImagePlugin } = require('@11ty/eleventy-img');

module.exports = (eleventyConfig) => {
  function imageAssetPath(relativeFilePath) {
    const imageAssetsPath = path.join(
      eleventyConfig.dir.input,
      '_assets',
      '_images',
    );
    return path.resolve(imageAssetsPath, relativeFilePath);
  }

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
      let file = imageAssetPath(src);
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
