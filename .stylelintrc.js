export default {
  extends: ['stylelint-config-spaceninja'],
  rules: {
    'plugin/no-low-performance-animation-properties': [
      true,
      { ignoreProperties: ['color', 'background-color'] },
    ],
  },
};
