import { types } from "mobx-state-tree";
import { SubscriberGridBlock } from "./subscriberGridBlock";



const SubscriberGrid = types.model("SubscriberGrid", {
    show: true,
    tasks: types.array(SubscriberGridBlock),
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
    function addSubscriberGridBlock(nameValue,xValue, yValue, index){
        let newTask = SubscriberGridBlock.create({
            name: nameValue,
            subscriptionMap: {
                int: 0, 
                rgb:'{"rgbH": 200,"rgbL":50}', 
                percent: 50,
                series: '[0,0,0,0,0,0,0,0,0,0]'
            },
            layoutMap: { i: index, x: xValue, y: yValue, w: 3, h: 8 }
        });
        return self.tasks.push(newTask);
    }
    function removeSubscriberGridBlock(index){
        return self.tasks.remove(index);
    }function changeSubscriberGridBlock(index, color, name){
        self.tasks[index].name = name;
        self.tasks[index].color = color;
    
    }function updatelayoutMap(gb){
        self.tasks.forEach(function (task_){        
            if (task_.layoutMap.get('i') === gb['i']) {
                task_.layoutMap = gb; 
            }
        });
    }
    return {addSubscriberGridBlock, removeSubscriberGridBlock, changeSubscriberGridBlock, updatelayoutMap}
});


/* Instantiate a state tree, somethin to start with */
export const subscriberGrid = SubscriberGrid.create(
    {
        tasks: [SubscriberGridBlock.create({
            name: "The first element",
            subscriptionMap: {int: 0, rgb:'{"rgbH": 50,"rgbL":200}', percent: 50, series: '[0,0,0,0,0,0,0,0,0,0]'},
            color: 'red',
            layoutMap: { i: '0', x: 0, y: 0, w: 3, h: 4 }
        })]
    }
)