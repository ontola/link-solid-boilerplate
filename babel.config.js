module.exports = (api) => {
  const isTest = api.env('test')
  const envPlugin = isTest
    ? ['@babel/preset-env', { targets: { node: 'current' } }]
    : '@babel/preset-env'

  return {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
    presets: [envPlugin],
  };
}
