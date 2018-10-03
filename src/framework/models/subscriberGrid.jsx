import { types } from "mobx-state-tree";
import { SubscriberGridItem } from "./subscriberGridItem";



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
    function addSubscriberGridItem(nameValue,xValue, yValue, index, elmRenderClass, width, height){

        let blockWidth = width;
        let blockHeight = height;

        // TODO: better hand the iniital value of subscriptionMap as a parameter from the enclosing function..
        // Some how we need to be able to attach a elementClass when we do this...
        // Start by tryin to inject a renderElement function here...
        let newTask = SubscriberGridItem.create({
            name: nameValue,
            elementRenderClass: elmRenderClass,
            subscriptionMap: {
                int: 0, 
                rgb:'{"rgbH": 200,"rgbL":50}', 
                percent: 50,
                series: '[0,0,0,0,0,0,0,0,0,0]'
            },
            layoutMap: { i: index, x: xValue, y: yValue, w: blockWidth, h: blockHeight }   // adapt witht and height!
        });
        return self.tasks.push(newTask);
    }
    function removeSubscriberGridItem(index){
        return self.tasks.remove(index);
    }function changeSubscriberGridItem(index, color, name){
        self.tasks[index].name = name;
        self.tasks[index].color = color;
    }function updatelayoutMap(gb){
        self.tasks.forEach(function (task_){        
            if (task_.layoutMap.get('i') === gb['i']) {
                task_.layoutMap = gb; 
            }
        });
    }
    return {addSubscriberGridItem, removeSubscriberGridItem, changeSubscriberGridItem, updatelayoutMap}
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