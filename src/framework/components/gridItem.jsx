import _ from "lodash";
import renderElmClasses from "../classStore";

class GridItem {
  static generateDOM(elements) {
    /* 
      Returns a map of the items to be rendered and a function to be applied 
      Parameter l is the entire subscriberGridItem object
      Parameter i is the index
    */
    return _.map(elements, function(l, i) {
      var elmClass = renderElmClasses.get(l.elementRenderClass);
      if (elmClass === null) elmClass = renderElmClasses.get("super"); // fallback on super class

      return elmClass.renderElement(i, l.subscriptionMap);
    });
  }
}

export default GridItem;
