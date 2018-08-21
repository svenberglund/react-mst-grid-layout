import {asyncTaskSet} from "./asyncTaskSet";
var pubsub = require('pubsub.js');

pubsub.subscribe('asyncTask/0/state', function(data) {
    asyncTaskSet.tasks[0].setState(data);
});
