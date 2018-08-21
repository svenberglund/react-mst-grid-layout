import { asyncTaskSet } from "../models/asyncTaskSet";
import { randomInt } from "../common/utils";

var pubsub = require('pubsub.js');


class AsyncAPIWrapper{

    static publishing = false;
    // make an internal array that represent channels on which to publish
    
    // perhaps this should be invoked from the invokerComponent 
    static startAsyncTask(taskId){
        console.log(`Starting task: ${taskId}`);
        // set internal state to publish on channel given by supplied taskId
    }

    static startPublishing(){

        this.publishing = true;
        console.log(`Starting to publish`);

        let delay = 1000;
        let timerId = setTimeout(function request() {
        
        // here is where we check the conditions for where we shall publish (channels in internal state)
        // the asyncTaskSet - and do all the publishing

        asyncTaskSet.tasks.forEach(function (task_){        
            if (task_.running) {
                //task_.setState(task_.taskState +1 ); // replace - should be done via a publish
                pubsub.publish('asyncTask/0/state', [randomInt(0,1000)]);
            }
        });
        if (1 <= 0) {
                // increase the interval to the next run - flexbility, 
                // we can use this to decrease or increase delay if there are many tasks ..
                delay *= 2;
         }

        timerId = setTimeout(request, delay);

        }, delay)

    }

}

AsyncAPIWrapper.startPublishing();
export default AsyncAPIWrapper;