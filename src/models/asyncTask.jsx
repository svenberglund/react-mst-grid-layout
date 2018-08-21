import { types } from "mobx-state-tree";


// https://github.com/mobxjs/mobx-state-tree
// make the state a state tree model instead of an observable!
// Good practice: Give it a name in the model constructor for debugging purpose
// .views and .actions can be chained to the model
export const AsyncTask = types.model("AsyncTask", {
    taskState: types.integer, // will probably be a map, something like gridblock, in a more dynamic context: 
    name: types.string,
    color: 'red',
    show: true,
    started: false,
    finished: false,
    gridblock:  types.map(types.union(types.string, types.number, types.boolean ,types.undefined))
})
.views(self => ({
    get description() {
        // This is a s.c. computed view (no arguments). A view with arguments is written without the get
        return (self.started && !self.finished) ? "Running..." : "Idle";
    },
    get running(){
        return self.started && !self.finished;
    }
}))
.actions(self => {
    function setValues(nameValue) {
        self.name = nameValue;
    }
    function start() {
       self.started = true;
       self.finished=false;

        /* 
        Call a asyncronous task and wait for a promise - call this task in some class that can be 
        made into a interface or superclass 
        */

    }
    function finish() {
        self.finished = true;
    }
    return { setValues, start, finish };
});



// instantiate a state tree
export const asyncTask = AsyncTask.create(
    {
    name: "foobar",
    taskState: 0,
});
