import React from "react";
import { Button } from "semantic-ui-react";
import { asyncTask } from "../models/asyncTask"
import { observer } from "mobx-react";
import { asyncTaskSet } from "../models/asyncTaskSet";
import { randomString, randomInt } from "../common/utils";
import { subscribeToChannel, unSubscribe } from "../models/asyncSubscriber";


@observer class InvokerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          subscriptions: new Map(),
        }
      }

    
    addSubscription(index){
        this.state.subscriptions.set(index, subscribeToChannel(0));
    }

    removeSubscription(index){
        unSubscribe(this.state.subscriptions.get(index));
        this.state.subscriptions.delete(index);
    }

    onStartClick = (event) => {
        //  changing the state - its not really necessary to keep the 'running' prop in the state, only for ui, 
        asyncTaskSet.tasks[0].running ? asyncTaskSet.tasks[0].finish() : asyncTaskSet.tasks[0].start();
         // invoking the subscriber..
        asyncTaskSet.tasks[0].running ? this.addSubscription(0) : this.removeSubscription(0);
    };

    onAddClick = (event) => {
        /* Adding a randomply named task */
        let index = (asyncTaskSet.count).toString();
        asyncTaskSet.addAsyncTask( `${index} - ${randomString(5)}`,randomInt(0,6),randomInt(0,6), index );
    };

    onChangeClick = (event) => {
        asyncTaskSet.changeAsyncTask(randomInt(0,asyncTaskSet.count-1), 'blue', randomString(8));
    }

    render() {

        return (
            <React.Fragment>
                <div>This is the invokerComponent!</div>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onStartClick}>
                    {asyncTaskSet.tasks[0].running ? "Stop" : "Start" } 
                </Button>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onAddClick}>
                    Add task!
                </Button>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onChangeClick}>
                    Change task!
                </Button>
            </React.Fragment>
        )
    }


}

export default InvokerComponent;