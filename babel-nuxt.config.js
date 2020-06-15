module.exports = () => {
  return {
    presets: [
      [
        '@nuxt/babel-preset-app',
        {
          corejs: { version: 3 }
        }
      ]
    ]
  }
}