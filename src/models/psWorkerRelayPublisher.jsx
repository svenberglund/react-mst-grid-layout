import simulWorker from '../worker/simulation.worker';


var pubsub = require('pubsub.js');

/* The publisher is a onmessage action on a web worker, it relays background task messages to frontend pubsub framework */
if (typeof(w) === "undefined") {
   console.log("Instantiating the worker...");
    let  w = new simulWorker(); //  new Worker("../worker/simulation.worker.jsx"); 
    
    w.onmessage = function(event){
        pubsub.publish(event.data['channel'], event.data['msg']);
    };
}