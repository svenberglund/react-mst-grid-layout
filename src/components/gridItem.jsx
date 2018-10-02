
import _ from "lodash";
import GridElementColor from "./gridElementColor"
import GridElementGauge from "./gridElementGauge"
import GridElementChart from "./gridElementChart"

// TODO: how do we inject the grid element classes here without this file knowing about them... 

class GridItem{
static  generateDOM(elements) {

    /* Returns a map of the items to be rendered and a function to be applied */
    return _.map(elements, function(l,i){

      //  TODO: These values of elmClass should some how be injected or configured, not hard coded in this file
      var elmClass = GridElementColor;
      // Simple test to see if dynamic class seletion works here:
      if (i%3===0) elmClass = GridElementGauge;
      else if (i%3===1) elmClass = GridElementChart;

      // console.log(l.subscriptionMap.get('series'));

      return (
              elmClass.renderElement(i, l)
      );
    });
  }
}

export default GridItem;
