import React from "react";
import { Button } from "semantic-ui-react";
import { asyncTask } from "../models/asyncTask"
import { observer } from "mobx-react";
import { asyncTaskSet } from "../models/asyncTaskSet";




@observer class InvokerComponent extends React.Component {


    onStartClick = (event) => {
        asyncTask.running ? asyncTask.finish() : asyncTask.start();
    };

    onAddClick = (event) => {
        /* Adding a randomply named task */
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        var rString = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        asyncTaskSet.addAsyncTask(rString,20,29);
    };

    onChangeClick = (event) => {
        asyncTaskSet.changeAsyncTask(0);
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