import simulWorker from '../worker/simulation.worker';


var pubsub = require('pubsub.js');

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
        // TODO: look into if we could relay the messages directly to the MST instead of using the pubsub framework
        pubsub.publish(event.data['channel'], event.data['msg']);
    };
}