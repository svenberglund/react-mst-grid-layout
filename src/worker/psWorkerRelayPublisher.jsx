import simulWorker from './simulation.worker';
import {PubSubAPI} from '../framework/message-relay/pubSubAPI'

/* 
    The publisher is a onmessage action on a web worker, 
    it relays background messages computed in the background to frontend pubsub framework 
    This can be seen as the first step in the 'message bus' towards the MST objects. 
    See also the subscriptions initiated by the psSubscriber methods.
*/
if (typeof(w) === "undefined") {
    console.log("Instantiating the worker...");
    let  w = new simulWorker(); //  new Worker("../worker/simulation.worker.jsx"); 
    
    w.onmessage = function(event){ 
        PubSubAPI.publish(event.data['channel'], event.data['msg']);
    };
}