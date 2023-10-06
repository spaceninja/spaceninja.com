module.exports = {
  extends: ['stylelint-config-spaceninja', 'stylelint-config-prettier'],
  rules: {
    'a11y/media-prefers-reduced-motion': null,
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'background-color'] },
    ],
  },
};
