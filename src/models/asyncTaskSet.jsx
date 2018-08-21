import { types } from "mobx-state-tree";
import { AsyncTask } from "./asyncTask";



const AsyncTaskSet = types.model("AsyncTaskSet", {
    show: true,
    tasks: types.array(AsyncTask),
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
    function addAsyncTask(nameValue,xValue, yValue, index){
        let newTask = AsyncTask.create({
            name: nameValue,
            taskState: 0,
            gridblock: { i: index, x: xValue, y: yValue, w: 1, h: 2 }
        });
        return self.tasks.push(newTask);
    }
    function removeAsyncTask(index){
        return self.tasks.remove(index);
    }function changeAsyncTask(index, color, name){
        self.tasks[index].name = name;
        self.tasks[index].color = color;
    
    }function updateGridblock(gb){
        self.tasks.forEach(function (task_){        
            if (task_.gridblock.get('i') === gb['i']) {
                task_.gridblock = gb; 
            }
        });
    }
    return {addAsyncTask, removeAsyncTask, changeAsyncTask, updateGridblock}
});


/* Instantiate a state tree, somethin to start with */
export const asyncTaskSet = AsyncTaskSet.create(
    {
        tasks: [AsyncTask.create({
            name: "The first element",
            taskState: 0,
            color: 'red',
            gridblock: { i: '0', x: 0, y: 0, w: 1, h: 2 }
        }),AsyncTask.create({
            name: "the second element",
            taskState: 0,
            color: 'red',
            gridblock: { i: '1', x: 1, y: 5, w: 3, h: 2 }
        })
        ]
    }
)