import {asyncTaskSet} from "./asyncTaskSet";
import {integerToHeatMap} from '../common/utils';
var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/

export function subscribeToChannel(index){
    // reduce by modulo 4 - we have only 4 channels 
    let remainder = index % 4;
    // console.log(`adding a subscription to channel ${remainder}`)
    return pubsub.subscribe(`asyncTask/${remainder}/state`, function(data) {
        asyncTaskSet.tasks[index].setState(data);
        //asyncTaskSet.tasks[index].setColor(integerToHeatMap(data));
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

