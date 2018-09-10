import {subscriberGrid} from "./subscriberGrid";
var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/

export function subscribeToChannel(componentIndex, channelIndex){
    return pubsub.subscribe(`subscriberGrid/${channelIndex}/state`, function(data) {
        subscriberGrid.tasks[componentIndex].setState(data);
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

