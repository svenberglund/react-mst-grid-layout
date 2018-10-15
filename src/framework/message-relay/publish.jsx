/*
    Encapsulation of some pubsub functionality - 
    maybe we'll get rid of that entire framework, give that a try!
    (see how the subscriptions map is hadled in the implementing side outside of framework)
*/

var pubsub = require('pubsub.js');

/*
    Publish a message to a channel.
    The message shall be a map. 
    Values in the map shall be simple types (boolean, string, number)
    If you need to send a complex value (like a number series or a map) then use JSON.stringify on the sending side 
    and JSON.parse on the receiving side (in your element rendering).
*/
export function publish(channelIndex, msg){
    pubsub.publish(`subscriberGrid/${channelIndex}/state`, [msg]);
}

