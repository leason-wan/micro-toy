const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json');
const PORT = 8001;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    output: {
      library: name,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  }
})
