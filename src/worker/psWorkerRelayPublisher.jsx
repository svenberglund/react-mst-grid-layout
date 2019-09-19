import simulWorker from './simulation.worker';
import RMGL from "react-mst-grid-layout";

/* 
    The publisher is a onmessage action on a web worker, 
    it relays background messages computed in the background to frontend framework 
    This can be seen as the first step in the 'message bus' towards the MST objects. 
    See also the subscriptions initiated by the psSubscriber methods.
*/
if (typeof(w) === "undefined") {
    console.log("Instantiating the worker...");
    let  w = new simulWorker(); //  new Worker("../worker/simulation.worker.jsx"); 
    
    w.onmessage = function(event){ 
        RMGL.PubSubAPI.publish(event.data['channel'], event.data['msg']);
    };
}
