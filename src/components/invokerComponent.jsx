import React from "react";
import { Button } from "semantic-ui-react";
import { asyncTask } from "../models/asyncTask"
import { observer } from "mobx-react";
import { asyncTaskSet } from "../models/asyncTaskSet";
import {randomString, randomInt} from "../common/utils";



@observer class InvokerComponent extends React.Component {


    onStartClick = (event) => {
        asyncTask.running ? asyncTask.finish() : asyncTask.start();
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
                    {asyncTask.running ? "Stop" : "Start" } 
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