import { types } from "mobx-state-tree";

// https://github.com/mobxjs/mobx-state-tree
// Good practice: We're giving it a name in the model constructor for debugging purpose

/*
The 'block' model, representing a single component in the grid.
It holds the subscription info (subscriptionMap) as well as layout info (layoutMap)
*/
export const SubscriberGridItem = types.model("SubscriberGridItem", {
    
    subscriptionMap: types.map(types.union(types.string, types.number, types.integer, types.boolean)),
    name: types.string,
    elementRenderClass: types.string, // a class that is registered for rendering element
    show: true,
    started: false,
    finished: false,
    layoutMap:  types.map(types.union(types.string, types.number, types.boolean ,types.undefined))
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
        return self.layoutMap.get('i');
    }
}))
.actions(self => {
    function setName(nameValue) {
        self.name = nameValue;
    }function setState(stateValue) {
        self.subscriptionMap = stateValue;
    }
    function start() {
       self.started = true;
       self.finished=false;
       // TODO: could we replace the start flag with acutally starting to listen to a channel?
    }
    function finish() {
        self.finished = true;
    }
    return { setName, setState, //setColor, 
        start, finish };
});

/*
// instantiate a state tree
export const subscriberGridBlock = SubscriberGridBlock.create(
    {
    name: "foobar",
    subscriptionMap: {int: 0, rgb:'rgb(0,255,0)', percent: 50, series: '[0,0,0,0,0,0,0,0,0,0]'},
});
*/
