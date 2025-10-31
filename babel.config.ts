// module.exports = function(api) {
//   // api.cache(true);
//   return {
//     presets: ['module:@react-native/babel-preset'],
//     plugins: ['react-native-reanimated/plugin']
//   };
// };

// module.exports = {
//     presets: ['module:@react-native/babel-preset'],
//     plugins: ['react-native-reanimated/plugin']
//   };

//   // Remove these plugins from your Babel config:
// // - @babel/plugin-transform-react-jsx-self
// // - @babel/plugin-transform-react-jsx-source


module.exports = function(api: any) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // or ['module:metro-react-native-babel-preset']
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};

// // Instead, use the automatic runtime:
// module.exports = {
//   "presets": [
//     ["@babel/preset-react", {
//       "runtime": "automatic"
//     }]
//   ],
//   plugins: ['react-native-reanimated/plugin']
// }