// const { mergeConfig } = require("@react-native/metro-config");
// const { getDefaultConfig } = require('expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// const { assetExts, sourceExts } = defaultConfig.resolver;

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {
//   transformer: {
//     babelTransformerPath: require.resolve("react-native-svg-transformer")
//   },
//   resolver: {
//     assetExts: assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...sourceExts, "svg"]
//   }
// };

// module.exports = mergeConfig(defaultConfig, config);

// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Customize the config
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

module.exports = config;