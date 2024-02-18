import typescript from 'rollup-plugin-typescript2';
import {
  readFileSync
} from 'fs';
// import uglify from "rollup-plugin-uglify";
import {
  terser
} from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

import copyFileBuildPlugin from './build.plugin'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const pkgName = packageJson.umdModuleName;


export default {
  input: 'src/index.ts',
  output: [{
      file: './resource/index.js',
      format: 'esm',
    },
    // {
    //   file: 'dist/cjs/index.js',
    //   format: 'cjs',
    // },
    // {
    //   file: 'dist/umd/index.js',
    //   format: 'umd',
    //   name: pkgName,
    //   globals: {
    //     'event-message-center': 'MessageCenter',
    //     'task-queue-lib': 'TaskQueue',
    //   },
    //   plugins: [
    //     commonjs(),
    //     resolve(),
    //   ],
    // },
    {
      file: './resource/index.min.js',
      format: 'esm',
      name: pkgName,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    copyFileBuildPlugin(['README.md', 'package.json', 'index.d.ts', 'LICENSE'], 'resource')
  ],
};
