import GridItem from "./framework/components/gridItem";
import MstGridLayout from "./framework/components/grid";

import GridElementSuper from "./framework/elements/gridElementSuper";

import {mstGrids} from "./framework/models/mstGrids";
import {MstGrid} from "./framework/models/mstGrid";
import {MstGridItem} from "./framework/models/mstGridItem";

import {PubSubAPI} from "./framework/message-relay/pubSubAPI";

/*
// remodel like this:
import echarts from 'echarts';
import EchartsReactCore from './core';

// export the Component the echarts Object.
export default class EchartsReact extends EchartsReactCore {
  constructor(props) {
    super(props);
    this.echartsLib = echarts;
  }
}


export default class RMGL {
    constructor(props) {
      this.GridItem = GridItem;
      this.MstGridLayout = MstGridLayout;

      this.mstGrids = mstGrids;
      this.MstGrid = MstGrid;
      this.MstGridItem = MstGridItem;

      this.GridElementSuper = GridElementSuper;

      this.PubSubAPI = PubSubAPI;
    }
  }

*/

// might do this insted, like PubSubAPI : export function PubSubAPI() {}

//export default function MGL(){}

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