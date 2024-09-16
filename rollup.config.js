import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const banner = `
/*
  Project: ziko-cm
  Author: Zakaria Elalaoui
  Date : ${new Date()}
  Git-Repo : https://github.com/zakarialaoui10/ziko-cm
  Git-Wiki : https://github.com/zakarialaoui10/ziko.cm/wiki
  Released under MIT License
*/
`;

const isProduction = process.env.NODE_ENV === 'production';

const output = [
  {
    file: 'dist/ziko-cm.mjs',
    format: 'es',
    banner,
    globals: {
      ziko: 'Ziko'
    }
  },
  {
    file: 'dist/ziko-cm.js',
    format: 'umd',
    banner,
    name: "ZikoCM",
    globals: {
      ziko: 'Ziko'
    }
  },
];

if (isProduction) {
  output.push(
    {
      file: 'dist/ziko-cm.cjs',
      format: 'cjs',
      banner,
      globals: {
        ziko: 'Ziko'
      }
    },
    {
    file: 'dist/ziko-cm.min.js',
    format: 'umd',
    banner,
    name: "ZikoCM",
    globals: {
      ziko: 'Ziko'
    },
    plugins: [terser()],
  });
}

export default {
  input: 'src/index.js',
  output,
  external: ['ziko'],
  plugins: [
    resolve(),
    commonjs(),
    ...(isProduction ? [terser()] : []),
  ],
};
