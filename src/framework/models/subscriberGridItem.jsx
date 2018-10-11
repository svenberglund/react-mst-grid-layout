import { types } from "mobx-state-tree";

// https://github.com/mobxjs/mobx-state-tree
// Good practice: We're giving it a name in the model constructor for debugging purpose

/*
The 'block' model, representing a single component in the grid.
It holds the subscription info (subscriptionMap) as well as layout info (layoutMap)
*/
export const SubscriberGridItem = types.model("SubscriberGridItem", {
    subscriptionMap: types.map(types.union(types.string, types.number, types.integer, types.boolean)),
    elementRenderClass: types.string, // a class that is registered for rendering element
    show: true,
    layoutMap:  types.map(types.union(types.string, types.number, types.boolean ,types.undefined))
})
.views(self => ({
    get layoutIndex(){
        return self.layoutMap.get('i');
    },
    get layout(){
        return self.layoutMap;
    }
}))
.actions(self => {
    function setState(stateValue) {
        self.subscriptionMap = stateValue;
    }function setLayoutProp(propName,propValue){
        self.layoutMap.set(propName, propValue);
    }
    return { setState, setLayoutProp};
});

