import { subscriptionMap } from './subscriptionMap';
import { mstGrids } from "../models/mstGrids";


/*
    API for the message relay functions. 
    Dispatching messages directly from publisher to the mst. 
    
    Implementation: We let this API object emulate static. According to a pattern suggested here:
    https://stackoverflow.com/questions/7694501/class-vs-static-method-in-javascript

*/
export function PubSubAPI() {};

PubSubAPI.subscribe = function(gridName, componentIndex, channelIndex, test=false) { 
    let subscriptionID = composeSubscriptionID(gridName,componentIndex, channelIndex);

    // Associate subscription ID with with mst update function
    subscriptionMap.getCallbacks().set(subscriptionID, 
        test ?  // For now, a goofy on-the-fly mock option that we use for unit tests
        function(data) { console.log(`TEST MOCK UPDATE: updating grid with data: ${JSON.stringify(data)}`);} 
        : 
        function(data) { mstGrids.getGrid(gridName).items[componentIndex].setState(data);}
    );

    //Associate subscripton ID with channel 
    subscriptionMap.getChannels().set(subscriptionID,channelIndex);
    
    return subscriptionID;
};


PubSubAPI.unSubscribe = function (subscriptionID){
    subscriptionMap.getChannels().delete(subscriptionID); 
    subscriptionMap.getCallbacks().delete(subscriptionID);
}


/*
    Publishes a message to a channel.
    The message shall be a simple javascript object with name-value pairs. 
    Values in the map shall be simple types (boolean, string, number)
    If you need to send a complex value (like a number series or a map) then use JSON.stringify on the sending side 
    and JSON.parse on the receiving side (in your element rendering).
    Example:
    msg={
        myInt : 5, 
        myRgb :  JSON.stringify({'r' : 200, 'g' : 100, 'b' : 100 }), 
        myPercent : Math.round(7/10),
        seriesAsString "[0,1,2,1,0,-1,-2,-3,-2,-1]"
    }
    The publish function returns true if there was a matching subscription receiving on the channel.
*/
PubSubAPI.publish = function (channelIndex, msg){

    let matchingSubscriptions = false;

    for (let [k, v] of subscriptionMap.getChannels()) {
        if (v===channelIndex) {
            subscriptionMap.getCallbacks().get(k)(msg);
            matchingSubscriptions = true;
        }
    }
    return matchingSubscriptions;
}

/*
           ///////////////////// Helper functions /////////////////////////
*/

 /*
    Simple non cryptographic hash function. Kindof what is suggested here (js version of java String.hashcode):
    https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
*/
function stringHashCode(input) {
    var hash = 0;
    if (input.length === 0) {
        return hash;
    }
    for (var i = 0; i < input.length; i++) {
        var char = input.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return hash
}


/*
    Unique ID:s for subscriptions.
    We intend to keep ID:s as readable concatenations rather than hashes (ffor debug purposes). 
    However we don't do that for exessive lengths. Grid names longer than 12 digtis we replace with hash code.
*/ 
function composeSubscriptionID(gridName, componentIndex, channelIndex){
   return `${ gridName.length < 12 ? gridName : stringHashCode(gridName)
   }_${componentIndex}_${channelIndex}`;
}

