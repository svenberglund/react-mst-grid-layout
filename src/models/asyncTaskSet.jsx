import { types } from "mobx-state-tree";
import { AsyncTask } from "./asyncTask"


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
    function addAsyncTask(nameValue, depthValue, widthValue){
        let newTask = AsyncTask.create({
            name: nameValue,
            width: widthValue,
            depth: depthValue,
            gridblock: { i: '2', x: 7, y: 0, w: 1, h: 2 }
        });
        return self.tasks.push(newTask);
    }
    function removeAsyncTask(index){
        return self.tasks.remove(index);
    }function changeAsyncTask(index){

        let x_ = Math.ceil(Math.random() * 4) + 1;
        let y_ = Math.ceil(Math.random() * 4) + 1;

        //console.log(`(x:${x_}, y:${y_})`);

        self.tasks[index].name = "New task name";
        self.tasks[index].gridblock = { i: '3', x: x_, y: y_, w: 1, h: 2 }
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
            name: "yououou",
            width: 22,
            depth: 33,
            gridblock: { i: '0', x: 0, y: 0, w: 1, h: 2 }
        }),AsyncTask.create({
            name: "zzzuouou",
            width: 62,
            depth: 63,
            gridblock: { i: '1', x: 1, y: 5, w: 3, h: 2 }
        })
        ]
    }
)