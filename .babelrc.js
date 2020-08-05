const path = require('path');
const root = path.resolve(__dirname);

const aliases = {
  components: `${root}/components`,
  pages: `${root}/pages`,
  styles: `${root}/styles`,
  utils: `${root}/utils`,
  store: `${root}/store`,
  actions: `${root}/store/actions`,
  selectors: `${root}/store/selectors`,
  'jest-utils': `${root}/jest/utils`,
};

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('./')],
      alias: { ...aliases },
    },
  ],
];

module.exports = {
  presets: ['next/babel'],
  plugins: [...plugins],
};
