import _ from "lodash";
import renderElmClasses from "../classStore";

class GridItem {
  static generateDOM(elements) {
    /* 
      Returns a map of the items to be rendered and a function to be applied 
      Parameter ga is the entire mstGridItem object
      Parameter i is the index
    */
    return _.map(elements, function(ga, i) {
      var elmClass = renderElmClasses.get(ga.elementRenderClass);
      if (elmClass === null) elmClass = renderElmClasses.get("super"); // fallback on super class

      return elmClass.renderElement(i, ga.subscriptionMap);
    });
  }
}

export default GridItem;
