import typescript from 'rollup-plugin-typescript2';
import { readFileSync } from 'fs';
// import { terser } from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const pkgName = packageJson.umdModuleName;


export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'index.js',
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
    // {
    //   file: 'dist/bundle/index.js',
    //   format: 'iife',
    //   name: pkgName,
    //   plugins: [terser()],
    // },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
