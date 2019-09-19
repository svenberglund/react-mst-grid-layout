import { types} from "mobx-state-tree";
import { MstGridItem } from "./mstGridItem";

/* 
    The MST model that keeps the state for a grid.
    Holds the grid items in a array.
*/
export const MstGrid = types.model("MstGrid", {
    items: types.array(MstGridItem) // MST has only three types of nodes; model, array, and map
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
    
    /* 
        Will hide and collapse A grid element totally.
        (the closest thing we have to removal right now)
        The grid element is still there, only invisible, and can be restored via 
        invoking showMstGridItem and restoring the w and h layout parameters to non 
        zero positive integers (and min values if you use those i.e. minW, minH), 
        for this use getGridItemLayout and setGridItemLayout.
        If you permanently want to get rid of element and as much of its footprint
        as possible don't forget to remove any subscription it may have also.
    */
    function collapseMstGridItem(index){
        self.items[index].show = false;  
        self.items[index].setLayoutProp('minW',0);
        self.items[index].setLayoutProp('minH',0);
        self.items[index].setLayoutProp('w',0);
        self.items[index].setLayoutProp('h',0);
    }

    /* Hides a item in the grid thus it will still occupy space */
    function hideMstGridItem(index){
        self.items[index].show = false;  
    }

    /* 
        Shows an item in the grid (that was hidden or collapsed). 
        If the item was collapsed the w and h layout parameters also need to be restored.  
    */
    function showMstGridItem(index){
        self.items[index].show = true;
    }

    /* Returns the layout from a item in the grid */
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
        let item = self.items[itemIndex];
        // We receive a simple es object and set every prop to the mst map
        [...Object.keys(layoutMap)].forEach(key => {
            item.setLayoutProp(key, layoutMap[key]);    
        }); 
        // we also remove any props that was not provided...
        // some of them will be recreated automatically upon user interaciton (dragging)
        [...item.layoutMap.keys()].forEach(key =>{
            if (! Object.keys(layoutMap).includes(key) )
                item.deleteLayoutProp(key);
        });
        item.setLayoutProp('i', itemIndex.toString());  
    }

    /*
      Sets the layout for a item in the grid without need for supplying the itemIndex 
      (using the 'i' key in the map).
      This function is mainly for internal usage, better use 
      getGridItemlayout and setGridItemLayot since they interface with stadard es objects
    */
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

    return {getGridItemLayout, 
        setGridItemLayout, 
        addMstGridItem, 
        collapseMstGridItem,
        hideMstGridItem,
        showMstGridItem, 
        updatelayoutMap, 
        lockAll}
});
