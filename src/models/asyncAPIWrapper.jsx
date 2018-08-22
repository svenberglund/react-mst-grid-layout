import { asyncTaskSet } from "../models/asyncTaskSet";
import { randomInt } from "../common/utils";

var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/
class AsyncAPIWrapper{
    
    constructor(){
        this.publishing = false;
        this.channels = null;
    }

    startPublishing(channels){

        this.publishing = true;
        //console.log(`Starting to publish`);

        let delay = 1000;
        let timerId = setTimeout(function request() {

        channels.forEach(function (channel_){        
                pubsub.publish(`asyncTask/${channel_}/state`, [randomInt(0,1000)]);
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


var SingletonPubliser = (function () {

    var instance;
    function createInstance() {


        var object = new AsyncAPIWrapper();
        return object;
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();



let apiWrapper =  SingletonPubliser.getInstance();

// this invokation can be done from gui instead
apiWrapper.startPublishing([0,1,2]);
