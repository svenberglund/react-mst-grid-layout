import GridItem from "./framework/components/gridItem";
import MstGridLayout from "./framework/components/grid";

import GridElementSuper from "./framework/elements/gridElementSuper";

import {mstGrids} from "./framework/models/mstGrids";
import {MstGrid} from "./framework/models/mstGrid";
import {MstGridItem} from "./framework/models/mstGridItem";

import {PubSubAPI} from "./framework/message-relay/pubSubAPI";

/*
   Exposure of entrire API in object literal
*/

var RMGL = {}
RMGL.GridItem = GridItem;
RMGL.MstGridLayout = MstGridLayout;
RMGL.mstGrids = mstGrids;
RMGL.MstGrid = MstGrid;
RMGL.MstGridItem = MstGridItem;
RMGL.GridElementSuper = GridElementSuper;
RMGL.PubSubAPI = PubSubAPI;
RMGL.sayHi = function () {alert("Hiyah!");}

export default RMGL;
