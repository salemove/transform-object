import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
  {
    input: 'src/transform-object.js',
    output: [
      // Browser-friendly UMD build
      {name: 'transform-object', file: pkg.browser, format: 'umd'},
      // ES module build
      {file: pkg.module, format: 'es'}
    ],
    plugins: [babel({babelHelpers: 'bundled'}), resolve()]
  }
];
