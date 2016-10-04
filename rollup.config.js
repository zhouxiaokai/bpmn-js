import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupString from 'rollup-plugin-string';
import rollupJson from 'rollup-plugin-json';
import rollupInject from 'rollup-plugin-inject';
import rollupBabel from 'rollup-plugin-babel';

import path from 'path';

// alongside rollup-plugin-commonjs, for using non-ES6 third party modules
import rollupCommonJS from 'rollup-plugin-commonjs';

export default {
  entry: 'lib/Viewer.js',
  dest: 'bundle.js',
  moduleName: 'BpmnJS',
  format: 'iife',
  plugins: [
    rollupNodeResolve({
      main: true,
      browser: true,
      preferBuiltins: false
    }),
    rollupCommonJS({
      ignoreGlobal: true,
      namedExports: {
        'node_modules/bpmn-moddle/node_modules/moddle-xml/node_modules/sax/lib/sax.js': [ 'SAXParser' ]
      }
    }),
    rollupInject({
      // control which files this plugin applies to
      // with include/exclude
      include: '**/*.js',
      Buffer: path.resolve('nop.js'),
      process: path.resolve('nop.js')
    }),
    rollupJson(),
    rollupString({
      // Required to be specified
      include: '**/*.html',

      // Undefined by default
      exclude: undefined
    })
    /*,
    rollupBabel({
      babelrc: false,
      presets: [ 'es2015-rollup' ]
    })*/
  ]
};