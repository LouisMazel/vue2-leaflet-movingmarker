const { resolve } = require('path')

module.exports = function Vue2LeafletMovingmarker () {
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue2-leaflet-movingmarker.common.js'
  })
}

module.exports.meta = require(__dirname, './../package.json')