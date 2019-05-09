/*
    In-memory data Object holding the subscriptions
*/
class SubscriptionMap {
    
    /* 
    Yes, this is a singleton pattern... 
        ... we never access this object directly (other than in tests)
    We go via PubSubAPI
    */
    constructor() {
        if (!!SubscriptionMap.instance) {
            return SubscriptionMap.instance;
        }

        SubscriptionMap.instance = this;
        this.created = +new Date(); // Mainly for debug and test purpose
        this.callbacks = new Map(); // Associated update functions. Key is subscription ID.
        this.channels = new Map();  // Associated channels. Key is subscription ID.

        return this;
    }

    getCallbacks () {
        return this.callbacks;
    }

    getChannels () {
        return this.channels;
    }

    getCreated() {
        return this.created;
    }
}

export const subscriptionMap = new SubscriptionMap();








