import {subscriberGrid} from "../models/subscriberGrid";
var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/


/*
Lets a component subscribe to a channel, 
This is the 'second step' in the message bus relaying woker messages to the MST object 
*/
export function subscribeToChannel(componentIndex, channelIndex){
    return pubsub.subscribe(`subscriberGrid/${channelIndex}/state`, function(data) {
        subscriberGrid.tasks[componentIndex].setState(data);
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

