Note: The published npm versions are still at an experimental beta stage.\
The issues marked as MS1 at [https://github.com/svenberglund/react-mst-grid-layout/projects/1] will be resolved to the first non beta release.

# react-mst-grid-layout

> A library of React components that form a wrapper around react-grid-layout using mst (MobX-state-tree) for state management.
> The components are easily implemented with any gui/presentation framework. They are fitted in a dynamic grid layout and are immediately ready to receive data published via a API.  

Use cases: Real time system monitoring, real time business activity monitoring, dashboards

[demo](https://svenberglund.github.io/react-mst-grid-layout/)

## ES6 moudule
The published module contains ES6 syntax. It is a big advantage in the usage of the module and I expect shipping es6 in node modules to be more common soon. So far however this may cause issues and call for special treatment when making a production build, depending on your build setup. In my test projects so far I have used [CRA which does not minify es6](https://github.com/facebook/create-react-app/issues/3047) since it in turn OOTB uses [uglifyJS](https://github.com/fengari-lua/fengari/issues/89).

### Ejecting
If you eject the webpack plugin you can use uglifyjs-webpack-plugin. `webpack.config`:
```
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: ...,
    output: ...,
    plugins: [
        new Uglify()
    ]
};
```
### reac-app-rewired
Since I used `react-app-rewired` didn't want to eject, I [turned of the minification in my `config-overrides.js`](blob/demo/config-overrides.js).

```
  if (env === 'production') {
    console.log("ES6 production build without UglifyJsPlugin. Config: ");
    console.log(JSON.stringify( config.plugins.splice(3, 1)));
  }
```
It's a workaround. I might not investigate it further since I consicer using [craco](https://github.com/sharegate/craco) in my next project.

We'll see, I might change and ditch this whole thing about publishing es6 alltogeher but it would be a shame.

## Installation
Run the following command:
`npm install react-mst-grid-layout --save-dev`

## Iplementation instructions
See [https://github.com/svenberglund/react-mst-grid-layout/wiki]\
Or just check out the implementation, mostly [App.js](https://github.com/svenberglund/rmgl-minimal-demo/blob/master/minimal-demo/src/App.js) of [the minimal demo](https://github.com/svenberglund/rmgl-minimal-demo).
