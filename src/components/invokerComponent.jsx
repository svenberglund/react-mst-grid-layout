import React from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";
import { randomString, randomInt } from "../common/utils";
import { subscribeToChannel, unSubscribe } from "../framework/message-relay/psSubscriber";


@observer class InvokerComponent extends React.Component {


    /*
    To handle subscriptions: 
    subscribeToChannel() is part of the framework just like unsubscribe(), these are the only methods needed.
    What has to be implemented here on the implementing side is the map to keep track of the subscriptions (if we wan to be able to unsubscribe).
    */
    constructor(props) {
        super(props);
        this.state = {
          subscriptions: new Map(),
          running : false,
          locked : false,
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
            this.state.running ? this.removeSubscription(element.layoutIndex) : this.addSubscription(element.layoutIndex);
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
        // check if subscription shall be added
        if (this.state.running) this.addSubscription(index);

    };

    onLockAllClick = (event) => {
       
        for (var i = 0; i< subscriberGrid.count ; i++){
            let layoutMap = subscriberGrid.getGridItemLayout(i);
            this.state.locked ? layoutMap.set('static', false) : layoutMap.set('static', true);
            subscriberGrid.setGridItemLayout(i,layoutMap); 
        }
        this.setState({
            locked: !this.state.locked
        })
    }

    onChangeClick = (event) => {
           
        let componentIndex = randomInt(0,subscriberGrid.count-1);
        let layoutMap = subscriberGrid.getGridItemLayout(componentIndex);
        let propToChange = "x";
        switch(randomInt(1,3)){
            case 1: 
            propToChange = "h"
            break;
            case 2:
            propToChange = "w"
            break;
            default: // do nothing
        }
        let coord = layoutMap.get(propToChange); 
        let change = randomInt(1,3);
        coord > 7 ? coord -= change  : coord += change;
        layoutMap.set(propToChange, coord);  // a random change to a random coordinate
        subscriberGrid.setGridItemLayout(componentIndex,layoutMap);
    }

    render() {

        return (
            <React.Fragment>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onStartClick}>
                    { this.state.running ? 'Stop' : 'Start' } 
                </Button>
                <Button
                    icon
                    compact
                    size="tiny"
                    disabled = {subscriberGrid.count > 7}
                    onClick={this.onAddClick}>
                    Add element!
                </Button>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onChangeClick}>
                    Change element!
                </Button>
                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onLockAllClick}>
                    { this.state.locked ? 'Unlock all!' : 'Lock all!' } 
                </Button>
            </React.Fragment>
        )
    }
}

export default InvokerComponent;