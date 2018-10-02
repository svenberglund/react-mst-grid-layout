import React from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";
import { randomString, randomInt } from "../common/utils";
import { subscribeToChannel, unSubscribe } from "../framework/message-relay/psSubscriber";


@observer class InvokerComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          subscriptions: new Map(),
        }
      }
    
    addSubscription(index){
        // we only publish on 4 channels thus we reduce the component index mod 4 to get channel index
        this.state.subscriptions.set(index, subscribeToChannel(index, (index % 4)));
    }

    removeSubscription(index){
        unSubscribe(this.state.subscriptions.get(index));
        this.state.subscriptions.delete(index);
    }

    onStartClick = (event) => {
        subscriberGrid.tasks.forEach(element => {
            //  changing the state - its not really necessary to keep the 'running' prop in the state, only for ui, 
            element.running ? element.finish() : element.start();
            // invoking the subscriber..
            element.running ? this.addSubscription(element.layoutMap.get('i')) : this.removeSubscription(element.layoutMap.get('i'));
        });
    };

    onAddClick = (event) => {
        /* Adding a randomply named task */
        let index = (subscriberGrid.count).toString();
        subscriberGrid.addSubscriberGridBlock( `${index} - ${randomString(5)}`,randomInt(0,6),randomInt(0,6), index );
    };

    onChangeClick = (event) => {
        subscriberGrid.changeSubscriberGridBlock(randomInt(0,subscriberGrid.count-1), 'rgb(1, 140, 89)', randomString(8));
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
                    Start / Stop 
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