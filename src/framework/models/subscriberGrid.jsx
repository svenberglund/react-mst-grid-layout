import { types } from "mobx-state-tree";
import { SubscriberGridItem } from "./subscriberGridItem";
import _ from "lodash";


/* 
The MST model that keeps the state for the entire grid.
Holds the gridBlocks in a array.
One instance of this model is normally instantiated in a view.
*/
const SubscriberGrid = types.model("SubscriberGrid", {
    show: true,
    tasks: types.array(SubscriberGridItem),
    layout: true // MST has only three types of nodes; model, array, and map
})
.views(self => ({
    get count() {
        return (
            self.tasks.length
        );
    }
}))
.actions(self => {
    function addSubscriberGridItem(nameValue, elmRenderClass, layoutMap, subscriptionMap){

        // TODO: 

        //  (1) We need to hand value of subscriptionMap as a parameter from the enclosing function..  -done!
        //  (2) Check how the subscriptions are added - are we content with this solution? - done!
        //  (3) Improve how the servce is started and stopped (or at least change speed)
        //  (4) Write some test and clean up all code
        //  (5) Improve invoker gui and enclosing app gui (dont forget app name and stuff)
        //  (6) Migrate to github and publish demo..
        //  (7) write backlog: stuff like 'support several grids', 'encapsulate mobx syntax in framework (see @observer in invoker)', 'get rid of flicker at startup', 'get rid of pubsub framework?','enable to set elements static', 'restrict MST scope (context)'.... 'package into a module'

        let newTask = SubscriberGridItem.create({
            name: nameValue,
            elementRenderClass: elmRenderClass,
            subscriptionMap: subscriptionMap,
            layoutMap: layoutMap 
        });
        return self.tasks.push(newTask);
    }
    function removeSubscriberGridItem(index){
        return self.tasks.remove(index);
    }function changeSubscriberGridItem(index, color, name){
        self.tasks[index].name = name;
        self.tasks[index].color = color;
    }function getGridItemLayout(itemIndex){
        return _.cloneDeep(self.tasks[itemIndex].layout); // returns a deep copy that can be modified
    }function setGridItemLayout(itemIndex, layoutMap){
        [...layoutMap.keys()].forEach(key => {
            self.tasks[itemIndex].setLayoutProp(key, layoutMap.get(key));    
        });   
    }
    function updatelayoutMap(gb){
        self.tasks.forEach(function (task_){        
            if (task_.layoutMap.get('i') === gb['i']) {
                task_.layoutMap = gb; 
            }
        });
    }
    return {getGridItemLayout, setGridItemLayout, addSubscriberGridItem, removeSubscriberGridItem, changeSubscriberGridItem, updatelayoutMap}
});


/* 
Instantiate a state tree.
TODO: Should we do this somewhere else in the application?  
*/
export const subscriberGrid = SubscriberGrid.create(
    {
        tasks: []
    }
)