import { asyncTaskSet } from "../models/asyncTaskSet";
import { randomInt } from "../common/utils";

var pubsub = require('pubsub.js');

// https://sahadar.github.io/pubsub/
class AsyncAPIWrapper {

    constructor() {
        this.publishing = false;
        this.channels = null;
        this.channelState = new Map(); // continue here - make the state continuos!
        this.channelDirection = new Map();
    }


    startPublishing(channels) {

        this.publishing = true;
        this.channels = channels;
        let channelState = new Map();
        let channelDirection = new Map();

        channels.forEach(function (channel_) {
            let inputState = randomInt(0, 1000);
            channelState.set(channel_, inputState);
            channelDirection.set(channel_, inputState > 500 ? false : true);
        });

        let delay = 250;
        let timerId = setTimeout(function request() {

            channels.forEach(function (channel_) {
                let offset = randomInt(10, 25);
                let oldState = channelState.get(channel_);
                let oldDirection = channelDirection.get(channel_);

                let newState = oldDirection ? oldState + offset : oldState - offset;

                // pushing back the new state if its outside boundaries
                if (newState < 0) {
                    newState = offset;
                } else if (newState > 1000) {
                    newState = 1000 - offset;
                };

                channelState.set(channel_, newState);
                pubsub.publish(`asyncTask/${channel_}/state`, [{int : channelState.get(channel_)}]);

                // change direction?
                if (randomInt(0, 15) === 1) {
                    channelDirection.set(channel_, !channelDirection.get(channel_));;
                }
                // change the delay?
                let delayDeterminator = randomInt(0, 5);
                if (delayDeterminator === 1) {
                    delay = 600;
                } else {
                    delay = 250;
                }

            });


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



let apiWrapper = SingletonPubliser.getInstance();

// this invokation can be done from gui instead - we only publish to 4 channels
apiWrapper.startPublishing([0, 1, 2, 3]);
