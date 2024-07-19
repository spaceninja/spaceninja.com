import { JSDOM } from 'jsdom';

/**
 * Based on https://github.com/orchidjs/eleventy-plugin-ids
 */
export default function (eleventyConfig, config = {}) {
  const selectors = config.selectors || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const prefix = config.prefix || '';
  const formatter =
    config.formatter ||
    function (element, existing_ids) {
      var id =
        prefix +
        eleventyConfig.javascript.functions
          .slug(element.textContent)
          .replace(/[&,+()$~%.'":*?!<>{}]/g, '');

      if (existing_ids.indexOf(id) >= 0) {
      }

      return id;
    };

  eleventyConfig.addTransform('ids', async (rawContent, outputPath) => {
    if (!outputPath || !outputPath.endsWith('.html')) {
      return rawContent;
    }

    const dom = new JSDOM(rawContent);
    const ids = [];
    selectors.forEach((selector) => {
      dom.window.document.querySelectorAll(selector).forEach((element) => {
        var id = element.getAttribute('id');
        if (id != undefined) {
          ids.push(id);
          return;
        }

        element.setAttribute('id', formatter(element, ids));
      });
    });

    return dom.serialize();
  });
}
