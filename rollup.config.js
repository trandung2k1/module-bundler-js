const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const production = !process.env.ROLLUP_WATCH;
module.exports = {
    input: 'src/index.js',
    output: {
        sourcemapIgnoreList: (relativeSourcePath, sourcemapPath) => {
            return relativeSourcePath.includes('node_modules');
        },
        dir: 'dist',
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        sourcemap: true,
        format: 'cjs',
        indent: false,
        preserveModules: false,
        preserveModulesRoot: 'src',
    },
    plugins: [
        resolve(),
        json(),
        commonjs(),
        production && terser(), // minify, but only in production
        babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
    ],
};
