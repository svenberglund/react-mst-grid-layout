import {asyncTaskSet} from "./asyncTaskSet";
import {integerToHeatMap} from '../common/utils';
var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/

export function subscribeToChannel(componentIndex, channelIndex){
    console.log(`Letting componetnt ${componentIndex} subscribe to ${channelIndex}`);
    return pubsub.subscribe(`asyncTask/${channelIndex}/state`, function(data) {
        asyncTaskSet.tasks[componentIndex].setState(data);
    });
}

export function unSubscribe(subscription){
    pubsub.unsubscribe(subscription); 
}

