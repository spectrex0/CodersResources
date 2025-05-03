const path = require('path');

module.exports = {
  // ...existing code...
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'), // Ensure this fallback is here
    },
  },
  // ...existing code...
};
