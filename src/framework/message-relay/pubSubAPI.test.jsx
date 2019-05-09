import { PubSubAPI } from './pubSubAPI';

/*
    /////////////// Tests of the publish-subscribe API ////////////////////////
*/

// Staging with a subscription
let subscriptionID1 = PubSubAPI.subscribe("MyGrid",2,3,true);
test('subscriptions get a composed ID', () => {
    expect(subscriptionID1).toBe("MyGrid_2_3");
})

// Staging with a subscription
let subscriptionID2 = PubSubAPI.subscribe("ThisIsAnoterGridWithVeryLongName",3,2,true);
test('subscriptions get a hashed shortened ID if gridName is long', () => {
    expect(subscriptionID2.length<16).toBe(true);
})
test('hashed shortended subscription ID ends with relevant params', () => {
    expect(subscriptionID2.endsWith("_3_2")).toBe(true);
})

// Staging with a subscription
let subscriptionID3 = PubSubAPI.subscribe("MyGrid",3,3,true);

// publish on channel 3:
test('able to publish to channels', () => {
    expect(PubSubAPI.publish(3,{foo: "bar", baz: "boo"})).toBe(true);
})
