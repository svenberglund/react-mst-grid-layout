import { types } from "mobx-state-tree";
import { AsyncTask } from "./asyncTask"


const AsyncTaskSet = types.model("AsyncTaskSet", {
    show: true,
    tasks: types.array(AsyncTask) // MST has only three types of nodes; model, array, and map
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
            depth: depthValue
        });
        return self.tasks.push(newTask);
    }
    function removeAsyncTask(index){
        return self.tasks.remove(index);
    }
    return {addAsyncTask, removeAsyncTask}
});


/* Instantiate a state tree */
export const asyncTaskSet = AsyncTaskSet.create(
    {
        tasks: [AsyncTask.create({
            name: "yououou",
            width: 22,
            depth: 33
        }),AsyncTask.create({
            name: "zzzuouou",
            width: 62,
            depth: 63
        }),AsyncTask.create({
            name: "mmmouou",
            width: 2,
            depth: 3
        })]
    }
)