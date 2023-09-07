const path = require('path');
const eleventyImage = require('@11ty/eleventy-img');

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
      formats = ['webp'],
      widths = [768, 1024, 1280, 1600],
    ) {
      let file = imageAssetPath(src);
      let metadata = await eleventyImage(file, {
        widths,
        formats,
        outputDir: path.join(eleventyConfig.dir.output, 'images'),
        urlPath: '/images/',
        svgShortCircuit: true,
      });
      let imageAttributes = {
        alt,
        sizes,
        loading,
        decoding: 'async',
      };
      return eleventyImage.generateHTML(metadata, imageAttributes);
    },
  );
};
