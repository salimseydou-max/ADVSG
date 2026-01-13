module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required by Expo Router for file-based routing on native + web.
      require.resolve('expo-router/babel'),
    ],
  };
};

