const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");

/*
// Helpers for rewire-babel-loader
const path = require("path");
const fs = require("fs");
const rewireBabelLoader = require("react-app-rewire-babel-loader");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
*/

module.exports = function override(config, env) {
  config = injectBabelPlugin("babel-plugin-styled-components", config);
  config = rewireMobX(config, env);
  
  config.module.rules.push({
    test: /\.worker\.jsx$/,
    use: [
      { loader: 'worker-loader' },
      { loader: 'babel-loader' }
    ]
  })
  /*
  // If we want to apply the babel loader to some node module...
  config = rewireBabelLoader.include(
    config,
    resolveApp("node_modules/<some_aswome_module>")
  );
  */

  return config;
};
