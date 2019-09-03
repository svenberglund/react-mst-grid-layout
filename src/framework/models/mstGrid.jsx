import { types } from "mobx-state-tree";
import { MstGridItem } from "./mstGridItem";
//import _ from "lodash";


/* 
    The MST model that keeps the state for a grid.
    Holds the grid items in a array.
*/
export const MstGrid = types.model("MstGrid", {
    show: true,
    items: types.array(MstGridItem), // MST has only three types of nodes; model, array, and map
    layout: true // TODO: check if we can remove these props (show and true)
})
.views(self => ({
    get count() {
        return (
            self.items.length
        );
    }
}))
.actions(self => {
    /* Adds an item in the grid, returns the index of the item added */
    function addMstGridItem(renderClass, layoutMap, subscriptionMap){
        let newItem = MstGridItem.create({
            elementRenderClass: renderClass,
            subscriptionMap: subscriptionMap,
            layoutMap: {'i':self.items.length.toString(), ...layoutMap} 
        });
        return self.items.push(newItem)-1;
    }
    /* Removes a item from the grid */
    function removeMstGridItem(index){
        // TODO: we will probably need to iterate here and update the layout indexes
        // iterate all the items after the removed item and decrease the index with one
        return self.items.remove(index);
    }

    /* Retruns the layout from a item in the grid */
    function getGridItemLayout(itemIndex){
        // lets deepCopy to a simple object literal, we clone all the properties from the mst map object
        let olDeepCopy = {};  
        [...((self.items[itemIndex].layout).keys())].forEach(key =>
            {olDeepCopy[key]=self.items[itemIndex].layout.get(key)}
        );
        return olDeepCopy;
    }
    /* Sets the layout for a item in the grid */
    function setGridItemLayout(itemIndex, layoutMap){
        // We receive a simple es object and set every prop to the mst map
        [...Object.keys(layoutMap)].forEach(key => {
            self.items[itemIndex].setLayoutProp(key, layoutMap[key]);    
        });   
    }
    /* Sets the layout for a item in the grid without need for supplying the itemIndex (using the 'i' key in the map) */
    function updatelayoutMap(layoutMap){
        self.items.forEach(function (item){        
            if (item.layoutMap.get('i') === layoutMap['i']) {
                item.layoutMap = layoutMap; 
            }
        });
    }
    /* Locks all the items in the grid or unlocks accordign to supplied boolean parameter (static=setLocked) */
    function lockAll(setLocked){
        [...self.items].forEach(gridItem => 
            gridItem.setLayoutProp('static', setLocked)
        )        
    }
    return {getGridItemLayout, setGridItemLayout, addMstGridItem, removeMstGridItem, updatelayoutMap, lockAll}
});
