// const path = require('path');
import babel from 'rollup-plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
// const pkg = require('./package.json');

const extensions = ['.js', '.ts'];

// const resolve = function (...args) {
//   return path.resolve(__dirname, ...args);
// };

module.exports = {
  // input: resolve('./src/index.ts'),
  input: './src/index.ts',
  output: {
    // file: resolve('./', pkg.main), // 为了项目的统一性，这里读取 package.json 中的配置项
    file: 'dist/bundle.js', // 为了项目的统一性，这里读取 package.json 中的配置项
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts'], // 要处理的文件类型，使用babel编译ts时必须加上这一选项
    }),
  ],
};
