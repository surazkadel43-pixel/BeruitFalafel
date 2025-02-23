module.exports = function(api) {
    api.cache(true);
  
    return {
      presets: [
        'babel-preset-expo', // This is the preset for Expo projects
      ],
      // You can also add plugins here if needed
    };
  };
  