import React from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";
import { randomString, randomInt } from "../common/utils";
import { subscribeToChannel, unSubscribe } from "../framework/message-relay/psSubscriber";


@observer class InvokerComponent extends React.Component {


    /*
    To handle subscriptions: 
    subscribeToChannel() is part of the framework just like unsubscribe()
    What is needed here on the implementing side is the map to keep track of the subscriptions (if we wan to be able to unsubscribe).
    */
    constructor(props) {
        super(props);
        this.state = {
          subscriptions: new Map(),
          running : false,
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
            this.state.running ? this.removeSubscription(element.id) : this.addSubscription(element.id);
        });
        this.setState(
            {running : !this.state.running}
        )
    };

    onAddClick = (event) => {
        /* Adding a randomply styled task */

        let index = (subscriberGrid.count).toString();

        let renderClass = "colorRender";
        let renderWidth = 4; 
        let renderHeight = 3; 
        switch (randomInt(0,2)){
            case 1: 
            renderClass = "gaugeRender";
            renderWidth = 3;
            renderHeight = 7;
            break;
            case 2:
            renderClass = "chartRender";
            renderWidth = 4;
            renderHeight = 8;
            break;
            default:
        }

        let subscriptionMap = {
            int: 0, 
            rgb:'{"rgbH": 20,"rgbL":120}', 
            percent: 50,
            series: '[0,0,0,0,0,0,0,0,0,0]'
        };
        let layoutMap = { i: index, x: randomInt(5,15), y: randomInt(5,10), w: renderWidth, h: renderHeight};

        subscriberGrid.addSubscriberGridItem( `${index} - ${randomString(6)}`, renderClass, layoutMap, subscriptionMap);
    };

    onChangeClick = (event) => {
        subscriberGrid.changeSubscriberGridItem(randomInt(0,subscriberGrid.count-1), 'rgb(1, 140, 89)', randomString(8));
    }

    render() {

        return (
            <React.Fragment>
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