/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/react-mst-grid-layout/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_utils__ = __webpack_require__(1);


/*
    Generating and publishing 'mock data' simulating data to a dashboard.
    Publishes data in a unified format independently on several different channels.
    {
        rgb: "{rgbL : int [0,255], rgbH : int [0,255]}"
        percent : int [0,100],
        series : [int [0,1000] ... int [0,1000]] (10 values in a series) 
    }
    The data is 'continuous' in the sense that there is not a to big differnce between two consecutive
    data points published on any channel. 
    Moreover the data points will be continuously descending for a while and then switching direction to ascending, and so on... if that makes sense...
*/
class MockPublisher {

    constructor() {
        this.publishing = false;
        this.channels = null;
        this.channelState = new Map(); // All the published values are derived from a curent state int [0,1000] of the channel
        this.channelDirection = new Map();
        this.message = new Map();
    }

    startPublishing(channels) {

        this.publishing = true;
        this.channels = channels;
        let channelState = new Map();
        let channelStateSeries = new Map();
        let channelDirection = new Map();
        let message = new Map();

        channels.forEach(function (channel_) {
            let inputState = Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["b" /* randomInt */])(0, 1000);
            channelState.set(channel_, inputState);
            channelStateSeries.set(channel_, JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, inputState])); // same as the channelState but will be a series with history
            channelDirection.set(channel_, inputState > 500 ? false : true);
        });

        let delay = 150;
        let timerId = setTimeout(function request() {

            channels.forEach(function (channel_) {
                let offset = Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["b" /* randomInt */])(10, 25);
                let oldState = channelState.get(channel_);
                let oldDirection = channelDirection.get(channel_);

                let newState = oldDirection ? oldState + offset : oldState - offset;

                // pushing back the new state if its outside boundaries
                if (newState < 0) {
                    newState = offset;
                } else if (newState > 1000) {
                    newState = 1000 - offset;
                };

                // now set the series also - channelState as well as the series need to be saved to the next iteration
                channelState.set(channel_, newState);let series = JSON.parse(channelStateSeries.get(channel_));
                series.shift();
                series.push(newState);
                let seriesString = JSON.stringify(series);
                channelStateSeries.set(channel_, seriesString);

                // preparing the message mapped to channel index to send to 'frontend' (UI thread)
                message = { channel: channel_, msg: {
                        // int : newState, 
                        rgb: JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["a" /* integerToHeatMap */])(newState)),
                        percent: Math.round(newState / 10),
                        series: seriesString
                    } };

                postMessage(message); // posting message from worker to frontend

                // change direction?
                if (Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["b" /* randomInt */])(0, 15) === 1) {
                    channelDirection.set(channel_, !channelDirection.get(channel_));
                }
                // change the delay to produce some irregularity?
                let delayDeterminator = Object(__WEBPACK_IMPORTED_MODULE_0__common_utils__["b" /* randomInt */])(0, 5);
                if (delayDeterminator === 1) {
                    delay = 300;
                } else {
                    delay = 150;
                }
            });

            timerId = setTimeout(request, delay);
        }, delay);
    }
}

/* Will return a instance of our singleton MockPublisher class */
var SingletonPubliser = function () {
    var instance;
    function createInstance() {
        var object = new MockPublisher();
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
}();

let mockPublisher = SingletonPubliser.getInstance();
mockPublisher.startPublishing([0, 1, 2, 3]); // We publish to 4 channels

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export randomString */
/* harmony export (immutable) */ __webpack_exports__["b"] = randomInt;
/* harmony export (immutable) */ __webpack_exports__["a"] = integerToHeatMap;
/*
    Utility functions for use in demo.
*/var alfanums='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';/*
    Delivers a pseudo random string with given lenght and optionally composed from the characters given by chars parameter.
*/function randomString(length){var chars=arguments.length>1&&arguments[1]!==undefined?arguments[1]:alfanums;var result='';for(var i=length;i>0;--i){result+=chars[Math.floor(Math.random()*chars.length)];}return result;}/*
    A pseudo random integer in the range between min and max (closed interval).
*/function randomInt(min,max){return Math.ceil(min-0.5+Math.random()*max);}/*
    Maps a integer in the closed range zero to thousand to two different integers as output.
    These two different integers are in the range zero to 255 and the mapping is continuous.
    The output is intended to be used in a heat map style rgb output (e.g. for red and blue).
*/function integerToHeatMap(zeroToThousand){var minVal=0;var maxVal=1000;var midVal=500;var intH=null;var intL=null;if(zeroToThousand>=midVal){intH=255;intL=Math.round(255*((maxVal-zeroToThousand)/(maxVal-midVal)));}else{intL=255;intH=Math.round(255*((zeroToThousand-minVal)/(midVal-minVal)));}/* 
    rgbL is a value that is active in low ranges ot the underlying variable.
    rgbH is active in higher ranges. 
    e.g. to construct a blue-to-red heat map from this output do something like this `rgb(${ouput.get(rgbH)},0,${output.get(rgbL)})`
    */return{'rgbL':intL,'rgbH':intH};}

/***/ })
/******/ ]);
//# sourceMappingURL=169eae77750ed612afd9.worker.js.map