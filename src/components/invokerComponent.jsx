import React from "react";
import { Button } from "semantic-ui-react";
import { asyncTask } from "../models/asyncTask"
import { observer } from "mobx-react";

@observer class InvokerComponent extends React.Component {


    onStartClick = (event) => {
        asyncTask.running ? asyncTask.finish() : asyncTask.start();
    };


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
            </React.Fragment>
        )
    }


}

export default InvokerComponent;