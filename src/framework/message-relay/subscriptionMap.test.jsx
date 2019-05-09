import { subscriptionMap } from './subscriptionMap';

/*
    //////////////// Testing the in-memory map objects explicitly /////////////
                           (accessed via API in real usage)         
*/

// The Object holding the callbacks. Trying to refere it twise (its a singleton)
let subscriptionMap1 = subscriptionMap;
let subscriptionMap2 = subscriptionMap;

test('equality holds for refs to map', () => {
    expect(subscriptionMap1 == subscriptionMap2).toBe(true);
})

// Staging with two subscriptions 
let  callbacks1 = subscriptionMap1.getCallbacks();//
callbacks1.set("addition function", (x,y) => { return x+y });
let callbacks2 = subscriptionMap2.getCallbacks();//
callbacks2.set("subtraction function", (x,y) => { return x-y});

test('function map holds functions like singleton', () => {
    expect(callbacks1.has("subtraction function")).toBe(true);
})

test('function can be retrieved and invoked', () => {
    expect(callbacks1.get("addition function")(3,2)).toBe(5);
})

// Staging with channels
subscriptionMap1.getChannels().set("some subscription ID",2);
subscriptionMap1.getChannels().set("some 2nd subscription ID",4);
subscriptionMap1.getChannels().set("some 3rd subscription ID",2);

let secondChannelRetrieved = subscriptionMap1.getChannels().get("some 2nd subscription ID");
test('channel can be retrieved from map', () => {
    expect(secondChannelRetrieved).toBe(4);
})

let firstChannelRetrieved = subscriptionMap1.getChannels().get("some subscription ID");
let thirdChannelRetrieved = subscriptionMap1.getChannels().get("some 3rd subscription ID");
test('subscriptions can have same channel', () => {
    expect(firstChannelRetrieved).toBe(thirdChannelRetrieved);
})

subscriptionMap1.getChannels().delete("some 2nd subscription ID");
test('subscriptions can be removed from map', () => {
    expect(subscriptionMap1.getChannels().get("some 2nd subscription ID")).toBe(undefined);
})

subscriptionMap1.getChannels().set("some 3rd subscription ID",22);
test('subscriptions can be redefined in map', () => {
    expect(subscriptionMap1.getChannels().get("some 3rd subscription ID")).toBe(22);
})
