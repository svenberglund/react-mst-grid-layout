/*
 encapsulation of some pubsub functionality - maybe we'll get rid of that entire framework
 ...i we dont need it for the handeling of subscriptions... think through that...
 (see how the subscriptions map is hadled in the implementing side outside of framework)
*/

var pubsub = require('pubsub.js');

export function publish(channelIndex, msg){
    pubsub.publish(`subscriberGrid/${channelIndex}/state`, [msg]);
}

