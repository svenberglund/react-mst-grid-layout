import { types, destroy } from "mobx-state-tree";
import { MstGrid } from "./mstGrid";



/* 
    The MST model that keeps the state for the entire collection of grids in an application.
    There might be more than one grid.
    Holds the grids in a map.
    One instance of this model is instantiated. 
*/
const MstGrids = types.model("MstGrids", {
    show: true,
    grids: types.map(MstGrid), // MST has only three types of nodes; model, array, and map. Also Union!
    layout: true 
})
.views(self => ({
    getGrid(key) { 
        return (
            self.grids.get(key)
        );
    }
}))
.actions(self => {

    function addMstGrid(gridName){
        return self.grids.add(gridName,MstGrid.create({ items: [] }));
    }
    function removeMstGrid(gridName){
        let _grid = self.grids.get(gridName);
        let _present = self.grids.delete(gridName);
        if (_present) destroy(_grid);
        return _present;
    }
    
    return {addMstGrid,removeMstGrid}
});


/* 
    Instantiate the state tree.
*/
export const mstGrids = MstGrids.create(
    {
        grids: {defaultGrid : MstGrid.create({items: []}) }
    }
)

