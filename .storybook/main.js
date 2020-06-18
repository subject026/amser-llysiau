// module.exports = {
//   stories: ['../stories/**/*.stories.js'],
//   addons: ['@storybook/addon-actions', '@storybook/addon-links'],
//   webpackFinal: async config => {
//     // do mutation to the config

//     return config;
//   },
// };

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
