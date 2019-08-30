/** 
 * 'For now' we transpile and ship this file.
 * We might eventually ditch this file alltogehter, we use it for 
 * dev purposes and trouble shooting.
 * Default API exposure in shipped node module is done by es6_api.mjs 
 * 
*/

import GridItem from "./framework/components/gridItem";
import MstGridLayout from "./framework/components/grid";
import GridElementSuper from "./framework/elements/gridElementSuper";
import {mstGrids} from "./framework/models/mstGrids";
import {MstGrid} from "./framework/models/mstGrid";
import {MstGridItem} from "./framework/models/mstGridItem";
import {PubSubAPI} from "./framework/message-relay/pubSubAPI";

// Exposure of entrire API object
var RMGL = {}
RMGL.GridItem = GridItem;
RMGL.MstGridLayout = MstGridLayout;
RMGL.mstGrids = mstGrids;
RMGL.MstGrid = MstGrid;
RMGL.MstGridItem = MstGridItem;
RMGL.GridElementSuper = GridElementSuper;
RMGL.PubSubAPI = PubSubAPI;

export default RMGL;
