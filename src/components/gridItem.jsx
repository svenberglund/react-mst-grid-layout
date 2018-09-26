
import _ from "lodash";
import GridElementColor from "./gridElementColor"
import GridElementGauge from "./gridElementGauge";

// TODO: how do we inject the grid element classes here without this file knowing about them... 

// Check out this https://www.npmjs.com/package/react-container-dimensions !!!
// ...to be able to resize dynamcally... firs try to solve the isssue of same-size-as-parent at first rendering...


class GridItem{
static  generateDOM(elements) {

    /* Returns a map of the items to be rendered and a function to be applied */
    return _.map(elements, function(l,i){

      //  TODO: These values of elmClass should some how be injected or configured, not hard coded in this file
      var elmClass = GridElementColor;
      // Simple test to see if dynamic class seletion works here:
      if (i%3===2) elmClass = GridElementGauge

      return (
              elmClass.renderElement(i, l)
      );
    });
  }
}

export default GridItem;
