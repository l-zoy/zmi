module.exports = function (opts) {
  return {
    presets: [
      [
        require('./lib').default,
        require('@zmi-cli/utils').deepmerge(
          {
            typescript: true,
            env: {
              targets: {
                node: 'current'
              },
              modules: 'commonjs'
            },
            type: 'node'
          },
          opts
        )
      ]
    ]
  }
}
