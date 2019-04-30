import { types } from "mobx-state-tree";
import { MstGridItem } from "./mstGridItem";
import _ from "lodash";


/* 
    The MST model that keeps the state for the entire grid.
    Holds the grid items in a array.
    One instance of this model is normally instantiated in a view (..so far, we shall build support for serveral.)
*/
const MstGrid = types.model("MstGrid", {
    show: true,
    items: types.array(MstGridItem), // MST has only three types of nodes; model, array, and map
    layout: true 
})
.views(self => ({
    get count() {
        return (
            self.items.length
        );
    }
}))
.actions(self => {
    /* Adds a item in the grid */
    function addMstGridItem(renderClass, layoutMap, subscriptionMap){

        let newItem = MstGridItem.create({
            elementRenderClass: renderClass,
            subscriptionMap: subscriptionMap,
            layoutMap: layoutMap 
        });
        return self.items.push(newItem);
    }
    /* Removes a item from the grid */
    function removeMstGridItem(index){
        return self.items.remove(index);
    }
    /* Retruns the layout from a item in the grid */
    function getGridItemLayout(itemIndex){
        return _.cloneDeep(self.items[itemIndex].layout); // returns a deep copy that can be modified
    }
    /* Sets the layout for a item in the grid */
    function setGridItemLayout(itemIndex, layoutMap){
        [...layoutMap.keys()].forEach(key => {
            self.items[itemIndex].setLayoutProp(key, layoutMap.get(key));    
        });   
    }
    /* Sets the layout for a item in the grid without need for supplying the itemIndex (using the 'i' key in the map) */
    function updatelayoutMap(layoutMap){
        self.items.forEach(function (task_){        
            if (task_.layoutMap.get('i') === layoutMap['i']) {
                task_.layoutMap = layoutMap; 
            }
        });
    }
    return {getGridItemLayout, setGridItemLayout, addMstGridItem, removeMstGridItem: removeMstGridItem, updatelayoutMap}
});


/* 
    Instantiate the state tree.
*/
export const mstGrid = MstGrid.create(
    {
        items: []
    }
)