import React from "react";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { observer } from "mobx-react";
import RMGL from '../api'
import { randomInt } from "../common/utils";
import { Sidebar } from 'primereact/sidebar';
import { InfoComponent } from './infoComponent';

/* 
    Component for all user invoked actions in this demo, like adding listeners and so on...
    Needs to be an @observer, either by annotating the class or by wrapping the export in an observer expression:
    export default observer(InvokerComponent)
*/
@observer class InvokerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /*
                To handle subscriptions in a implementation: 
                subscribeToChannel() is part of the framework just like unsubscribe(), these are the only methods needed.
                What has to be implemented here on the implementing side is the map to keep track of the subscriptions (if we wan to be able to unsubscribe).
            */
            subscriptions: new Map(),
            running: false,
            locked: false,
            changedByUser: 0,
            showInfoSidebar: false,
        }
    }

    grid = RMGL.mstGrids.getGrid("defaultGrid");

    addSubscription(index) {
        // we only publish on 4 channels in this demo thus we reduce the component index mod 4 to get channel index
        this.state.subscriptions.set(index, RMGL.PubSubAPI.subscribe("defaultGrid",index, (index % 4)));
    }

    removeSubscription(index) {
        RMGL.PubSubAPI.unSubscribe(this.state.subscriptions.get(index));
        this.state.subscriptions.delete(index);
    }

    onStartClick = (event) => {
        this.grid.items.forEach(element => {
            this.state.running ? this.removeSubscription(element.layoutIndex) : this.addSubscription(element.layoutIndex);
        });
        this.setState(
            { running: !this.state.running }
        )
    };

    onAddClick = (event) => {

        let index = (this.grid.count).toString();

        // First time add a super class element and the following times do random class selection
        let renderClass = "super";
        let renderWidth = 4;
        let renderHeight = 5;
        if (this.grid.count > 4) { 
            switch (randomInt(1, 3)) {
                case 1:
                    renderClass = "colorRender";
                    renderWidth = 4;
                    renderHeight = 3;
                    break;
                case 2:
                    renderClass = "gaugeRender";
                    renderWidth = 3;
                    renderHeight = 7;
                    break;
                case 3:
                    renderClass = "chartRender";
                    renderWidth = 4;
                    renderHeight = 8;
                    break;
                default: // won't happen
            }
        }

        let subscriptionMap = {
            rgb: '{"rgbH": 20,"rgbL":120}',
            percent: 50,
            series: '[0,0,0,0,0,0,0,0,0,0]'
        };
        let layoutMap = { i: index, x: randomInt(5, 15), y: randomInt(5, 10), w: renderWidth, h: renderHeight };

        this.grid.addMstGridItem(renderClass, layoutMap, subscriptionMap);
        // check if subscription shall be added
        if (this.state.running) this.addSubscription(index);
    };

    onLockAllClick = (event) => {

        for (var i = 0; i < this.grid.count; i++) {
            let layoutMap = this.grid.getGridItemLayout(i);
            this.state.locked ? layoutMap.set('static', false) : layoutMap.set('static', true);
            this.grid.setGridItemLayout(i, layoutMap);
        }
        this.setState({
            locked: !this.state.locked
        })
    }

    /* 
        Will do a random chagne to some coordinate (x,h or w) to a randomly selected component.
    */
    onChangeClick = (event) => {

        let componentIndex = randomInt(0, this.grid.count - 1);
        let layoutMap = this.grid.getGridItemLayout(componentIndex);
        let propToChange = "x";
        switch (randomInt(1, 3)) {
            case 1:
                propToChange = "h"
                break;
            case 2:
                propToChange = "w"
                break;
            default: // do nothing, use default prop value
        }
        let coord = layoutMap.get(propToChange);
        let change = randomInt(1, 3);
        if (propToChange === "h") // we never set height less than 8
            coord > 10 ? coord -= change : coord += change;
        else
            coord > 7 ? coord -= change : coord += change;

        layoutMap.set(propToChange, coord);  // impose a random change to a random coordinate
        this.grid.setGridItemLayout(componentIndex, layoutMap);

        // count how many times such user invoked change has been done)
        this.setState({
            changedByUser: this.state.changedByUser + 1
        })
    }

    onShowInfoClick = (event) => {
        this.setState({
            showInfoSidebar: true,
        })

    }


    render() {

        return (
            <React.Fragment>
                <Toolbar style={{ backgroundColor: 'whitesmoke' }}>
                    <div className="p-toolbar-group-left">
                        <Button
                            icon={this.state.running ? "pi pi-minus" : "pi pi-check"}
                            size="tiny"
                            label={this.state.running ? 'Mute listeners' : 'Apply listeners'}
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onStartClick} />
                        <Button
                            icon="pi pi-clone"
                            size="tiny"
                            disabled={this.grid.count > 7}
                            label="Add element!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onAddClick} />
                        <Button
                            icon="pi pi-refresh"
                            size="tiny"
                            disabled={this.state.changedByUser > 3} // we only allow a this four times since it makes the components really ugly after a while...
                            label="Change element!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onChangeClick} />
                        <Button
                            icon={this.state.locked ? "pi pi-unlock" : "pi pi-lock"}
                            size="tiny"
                            label={this.state.locked ? 'Unlock all!' : 'Lock all!'}
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onLockAllClick} />
                    </div>
                    <div className="p-toolbar-group-right">
                        <Button
                            icon="pi pi-question"
                            size="tiny"
                            label="What's this anyway?"
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onShowInfoClick} />
                    </div>
                </Toolbar>

                <Sidebar visible={this.state.showInfoSidebar} position="right" style={{ width: '68em' }} onHide={(e) => this.setState({ showInfoSidebar: false })}>
                    <InfoComponent />
                </Sidebar>

            </React.Fragment>
        )
    }
}

export default InvokerComponent;