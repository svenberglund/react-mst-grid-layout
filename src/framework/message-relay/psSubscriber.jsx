import {mstGrid} from "../models/mstGrid";
var pubsub = require('pubsub.js');


/*
    Lets a component subscribe to a channel,
    This can be thought of as the message bus relaying (e.g. woker) messages to the MST objects governing the grid
    
    For now, we base the subscription framwork on https://sahadar.github.io/pubsub/
    ..but we might get rid of it since pubsub.js and MST each add a layer of the publish-subscribe pattern.
*/
export function subscribeToChannel(componentIndex, channelIndex){
    return pubsub.subscribe(`mstGrid/${channelIndex}/state`, function(data) {
        mstGrid.items[componentIndex].setState(data);
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

