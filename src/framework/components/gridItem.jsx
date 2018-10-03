
import _ from "lodash";
import renderElmClasses from '../classStore'

class GridItem{
static  generateDOM(elements) {

    /* 
      Returns a map of the items to be rendered and a function to be applied 
      Parameter l is the entire subscriberGridItem object
      Parameter i is the index
    */
    return _.map(elements, function(l,i){

      // TODO: make a default fallback on the base class if the class can't be deduced from here..   
      var elmClass = renderElmClasses.get(l.elementRenderClass);

      return (
        elmClass.renderElement(i, l)
      );
    });
  }
}

export default GridItem;
