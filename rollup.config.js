import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupString from 'rollup-plugin-string';
import rollupJson from 'rollup-plugin-json';
import rollupInject from 'rollup-plugin-inject';

import path from 'path';

// alongside rollup-plugin-commonjs, for using non-ES6 third party modules
import rollupCommonJS from 'rollup-plugin-commonjs';

export default {
  entry: 'lib/Viewer.js',
  dest: 'bundle.js',
  moduleName: 'BpmnJS',
  format: 'umd',
  plugins: [
    rollupInject({
      // control which files this plugin applies to
      // with include/exclude
      include: '**/*.js',
      Buffer: path.resolve('nop.js'),
      process: path.resolve('nop.js')
    }),
    rollupNodeResolve({
      main: true,
      // skip: [ 'some-big-dependency' ],
      browser: true,
      extensions: [ '.js' ],
      preferBuiltins: false
    }),
    rollupJson(),
    rollupCommonJS(),
    rollupString({
      // Required to be specified
      include: '**/*.html',

      // Undefined by default
      exclude: ['**/index.html']
    })
  ]
};