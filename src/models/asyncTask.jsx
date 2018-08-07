import { types } from "mobx-state-tree";


// https://github.com/mobxjs/mobx-state-tree
// make the state a state tree model instead of an observable!
// Good practice: Give it a name in the model constructor for debugging purpose
// .views and .actions can be chained to the model
const AsyncTask = types.model("AsyncTask", {
    name: types.string,
    depth: types.number,
    width: types.number,
    show: true,
    started: false,
    finished: false,
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
    function setValues(nameValue, depthValue, widthValue) {
        self.name = nameValue;
        self.depth = depthValue;
        self.width = widthValue;
    }
    function start() {
       self.started = true;
       self.finished=false;
    }
    function finish() {
        self.finished = true;
    }
    return { setValues, start, finish };
});


// instantiate - we now have a state tree:
export const asyncTask = AsyncTask.create(
    // this is a snapshot that we pass when creating a living tree:
    {
    name: "foobar",
    width: 10,
    depth: 10
});