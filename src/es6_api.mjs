"use strict";

/** 
 * This file is not transpiled, shipped as es6. 
 */

 
// The entire source in "framwork" directory is transpiled to es5 
var _gridItem = _interopRequireDefault(require("./framework/components/gridItem"));
var _grid = _interopRequireDefault(require("./framework/components/grid"));
var _es5_gridElementSuper = _interopRequireDefault(require("./framework/elements/gridElementSuper"));
var _mstGrids = require("./framework/models/mstGrids");
var _mstGrid = require("./framework/models/mstGrid");
var _mstGridItem = require("./framework/models/mstGridItem");
var _pubSubAPI = require("./framework/message-relay/pubSubAPI");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

class _es6_gridElementSuper{
    static renderElement(i, sm){
        return _es5_gridElementSuper["default"].renderElement(i, sm);    
    }

    static register(name_, class_) {
        return _es5_gridElementSuper["default"].register(name_,class_);
    }
}

// Exposure of entrire API object
var RMGL = {};
RMGL.GridItem = _gridItem["default"];
RMGL.MstGridLayout = _grid["default"];
RMGL.mstGrids = _mstGrids.mstGrids;
RMGL.MstGrid = _mstGrid.MstGrid;
RMGL.MstGridItem = _mstGridItem.MstGridItem;
RMGL.GridElementSuper = _es6_gridElementSuper;
RMGL.PubSubAPI = _pubSubAPI.PubSubAPI;

// import/export and classes supported in .mjs
export default RMGL;