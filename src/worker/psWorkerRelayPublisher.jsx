import simulWorker from './simulation.worker';
import {publish} from '../framework/message-relay/publish'

/* 
The publisher is a onmessage action on a web worker, 
it relays background task messages to frontend pubsub framework 
This is the first step in the 'message bus' towards the MST objects. 
The second step is the subscriptions initiated by the psSubscriber methods.
*/
if (typeof(w) === "undefined") {
    console.log("Instantiating the worker...");
    let  w = new simulWorker(); //  new Worker("../worker/simulation.worker.jsx"); 
    
    w.onmessage = function(event){ 
        publish(event.data['channel'], event.data['msg']);
    };
}