import { randomInt, integerToHeatMap } from "../common/utils";


class MockPublisher {

    constructor() {
        this.publishing = false;
        this.channels = null;
        this.channelState = new Map();
        this.channelDirection = new Map();
        this.message=new Map();
    }

    startPublishing(channels) {

        this.publishing = true;
        this.channels = channels;
        let channelState = new Map();
        let channelStateSeries = new Map();
        let channelDirection = new Map();
        let message = new Map();

        channels.forEach(function (channel_) {
            let inputState = randomInt(0, 1000);
            channelState.set(channel_, inputState);
            channelStateSeries.set(channel_, JSON.stringify([0,0,0,0,0,0,0,0,0,inputState])); // same as the channelState but will be a series with history
            channelDirection.set(channel_, inputState > 500 ? false : true);
        });

        let delay = 150;
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


                // now set the series aswell - channelState aswell ass the series need to be saved to the next iteration
                channelState.set(channel_, newState);let series = JSON.parse(channelStateSeries.get(channel_));
                series.shift();
                series.push(newState);
                let seriesString = JSON.stringify(series);
                channelStateSeries.set(channel_, seriesString);

                // preparing the message mapped to channel index to send to 'frontend' (UI thread)
                message={channel: channel_ , msg:{
                    //int : newState, 
                    rgb :  JSON.stringify(integerToHeatMap(newState)), 
                    percent : Math.round(newState/10),
                    series : seriesString
                }};
            
                postMessage(message); // posting message from worker to frontend

                // change direction?
                if (randomInt(0, 15) === 1) {
                    channelDirection.set(channel_, !channelDirection.get(channel_));
                }
                // change the delay to produce some irregularity?
                let delayDeterminator = randomInt(0, 5);
                if (delayDeterminator === 1) {
                    delay = 300;
                } else {
                    delay = 150;
                }

            });

            timerId = setTimeout(request, delay);
        }, delay)
    }
}


var SingletonPubliser = (function () {

    var instance;
    function createInstance() {


        var object = new MockPublisher();
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


let mockPublisher = SingletonPubliser.getInstance();
// this invokation can be done from gui instead - we only publish to 4 channels
mockPublisher.startPublishing([0, 1, 2, 3]);

