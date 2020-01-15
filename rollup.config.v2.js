import fs from 'fs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

const externalPaths = [];
const externals = (id, parent) => {
  console.log(id);
  return /^vue$/.test(id) ||
    (/^components/i.test(id) && !!parent) ||
    /^vue-runtime-helpers/.test(id) ||
    /^@babel\/runtime/.test(id) ||
    /^@babel\/helpers/.test(id);
};
;

function resolvePath(src) {
  return path.resolve(__dirname, src);
};

function createConfig(entry, name, externalPaths) {
  return {
    input: entry,
    output: {
      file: `lib/${name}.js`,
      format: 'es',
      paths: externalPaths
    },
    external: externals,
    plugins: [
      resolve({
        extensions: ['.js', '.scss', '.vue']
      }),
      alias({
        'components': resolvePath('components')
      }),
      postcss({
        extract: `lib/style/${name}.css`
      }),
      commonjs({
        exclude: [resolvePath('components/**')]
      }),
      vue({
        css: false
      }),
      babel({
        plugins: [
          '@babel/plugin-transform-runtime'
        ],
        presets: [
          '@vue/babel-preset-jsx',
          '@babel/env'
        ],
        runtimeHelpers: true,
        babelrc: false
      })
    ]
  };
}

function createConfigList(path) {
  const dirs = fs.readdirSync(path);

  return dirs.map(dir => {
    const entry = `components/${dir}/index`;

    externalPaths[`components/${dir}`] = `component-build/lib/${dir}`;
    return createConfig(entry, dir, externalPaths);
  });
}

export default createConfigList(resolvePath('components'));
