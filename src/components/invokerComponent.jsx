import React from "react";
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { observer } from "mobx-react";
import RMGL from '../api'
import { randomInt } from "../common/utils";
import { Sidebar } from 'primereact/sidebar';
import { InfoComponent } from './infoComponent';
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
/* 
    Component for all user invoked actions in this demo, like adding listeners and so on...
    Needs to be an @observer, either by annotating the class or by wrapping the export in an observer expression:
    export default observer(InvokerComponent)
*/

@observer
class InvokerComponent extends React.Component {

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
            removeRestoreSequenceRunning: false,
            locked: isBrowser ? false : true,
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

    onRemoveClick = (event) => {
        // We could also remove and restore subscriptions, for now we just collapse.
        const getPromise = () => new Promise((resolve, reject) => {
                setTimeout(resolve,800)
            }
        )
        let startElmIndex = randomInt(0,this.grid.count-1);
        let layoutQueue = [];
        let maxIterations = 16;
        let myPromise = getPromise();
        this.setState({removeRestoreSequenceRunning:true});

        for(let i=0; i<maxIterations; i++){
            let currentElemIndex = (startElmIndex+i)%this.grid.count;

            myPromise = myPromise.then(
                () => {
                
                if (i<maxIterations-2){
                    // collapse a item and push its layout into queue
                    layoutQueue.push(this.grid.getGridItemLayout(currentElemIndex));
                    this.grid.collapseMstGridItem(currentElemIndex);
                }
                if (i>=2){
                    // restore an item by shifting its layout from queue
                    let layoutToRestore=layoutQueue.shift();
                    let elmIndexToRestore = parseInt(layoutToRestore['i'],10);
                    this.grid.showMstGridItem(elmIndexToRestore);
                    this.grid.setGridItemLayout(elmIndexToRestore,layoutToRestore);
                }
                if (i === maxIterations-1) this.setState({removeRestoreSequenceRunning: false});
                return getPromise() // a neat little trick for chaining. 
            }
            )
        }
    }

    onAddClick = (event) => {

        let index = (this.grid.count).toString();

        // First time add a super class element and the following times do random class selection
        let renderClass = "super";
        let renderWidth = 4;
        let renderHeight = 6;
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
        let layoutMap = { x: randomInt(5, 15), y: randomInt(5, 10), w: renderWidth, h: renderHeight };

        console.log(this.grid.addMstGridItem(renderClass, layoutMap, subscriptionMap));
        // check if subscription shall be added
        if (this.state.running) this.addSubscription(index);
    };

    onLockAllClick = (event) => {
        this.grid.lockAll(!this.state.locked);
        this.setState({
            locked: !this.state.locked
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
                        <MobileView>
                        <Button
                            icon={this.state.running ? "pi pi-power-off" : "pi pi-check"}
                            size="small"
                            label={this.state.running ? 'Mute listeners' : 'Apply listeners'}
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onStartClick} />
                        <Button
                            icon={this.state.locked ? "pi pi-unlock" : "pi pi-lock"}
                            size="small"
                            label={this.state.locked ? 'Unlock all!' : 'Lock all!'}
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onLockAllClick} />
                        </MobileView>
                        <BrowserView>
                        <Button
                            icon={this.state.running ? "pi pi-power-off" : "pi pi-check"}
                            size="tiny"
                            label={this.state.running ? 'Mute listeners' : 'Apply listeners'}
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onStartClick} />
                        <Button
                            icon="pi pi-clone"
                            size="tiny"
                            disabled={this.grid.count > 7 || this.state.removeRestoreSequenceRunning}
                            label="Add element!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onAddClick} />     
                        <Button
                            icon="pi pi-replay"
                            size="tiny"
                            disabled={this.state.removeRestoreSequenceRunning}
                            label="Remove/Restore!"
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onRemoveClick} />                   
                        <Button
                            icon={this.state.locked ? "pi pi-unlock" : "pi pi-lock"}
                            size="tiny"
                            label={this.state.locked ? 'Unlock all!' : 'Lock all!'}
                            className="p-button-rounded p-button-secondary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onLockAllClick} />
                        </BrowserView>
                    </div>
                    <BrowserView>
                    <div className="p-toolbar-group-right">
                        <Button
                            icon="pi pi-question"
                            size="tiny"
                            label="What's this anyway?"
                            className="p-button-rounded p-button-primary"
                            style={{ marginRight: '0.5em' }}
                            onClick={this.onShowInfoClick} />
                    </div>
                    </BrowserView>
                </Toolbar>

                <BrowserView>
                <Sidebar visible={this.state.showInfoSidebar} position="right" style={{ width: '68em' }} onHide={(e) => this.setState({ showInfoSidebar: false })}>
                    <InfoComponent />
                </Sidebar>
                </BrowserView>

            </React.Fragment>
        )
    }
}

//export default observer(InvokerComponent);
export default InvokerComponent;