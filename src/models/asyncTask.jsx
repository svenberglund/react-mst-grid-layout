import { types } from "mobx-state-tree";

// https://github.com/mobxjs/mobx-state-tree
// make the state a state tree model instead of an observable!
// Good practice: Give it a name in the model constructor for debugging purpose
// .views and .actions can be chained to the model
export const AsyncTask = types.model("AsyncTask", {
    
    subscriptionData: types.map(types.union(types.string, types.number, types.integer, types.boolean)),
    name: types.string,
    show: true,
    started: false,
    finished: false,
    layoutBlock:  types.map(types.union(types.string, types.number, types.boolean ,types.undefined))
})
.views(self => ({
    get description() {
        // This is a s.c. computed view (no arguments). A view with arguments is written without the get
        return (self.started && !self.finished) ? "Running..." : "Idle";
    },
    get running(){
        return self.started && !self.finished;
    },
    get id(){
        return self.layoutBlock.get('i');
    }
}))
.actions(self => {
    function setName(nameValue) {
        self.name = nameValue;
    }function setState(stateValue) {
        self.subscriptionData = stateValue;
    }
    //function setColor(colorValue) {
    //    self.color = colorValue;
    //}
    function start() {
       self.started = true;
       self.finished=false;

       // call a method to register this listening processs at asyncsubscriber
       // something like asyncSubscriber.register(id);
    }
    function finish() {
        self.finished = true;
    }
    return { setName, setState, //setColor, 
        start, finish };
});


// instantiate a state tree
export const asyncTask = AsyncTask.create(
    {
    name: "foobar",
    subscriptionData: {int: 0},
});
