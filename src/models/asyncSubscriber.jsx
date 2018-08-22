import {asyncTaskSet} from "./asyncTaskSet";
var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/

export function subscribeToChannel(index){
    return pubsub.subscribe(`asyncTask/${index}/state`, function(data) {
        asyncTaskSet.tasks[index].setState(data);
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

