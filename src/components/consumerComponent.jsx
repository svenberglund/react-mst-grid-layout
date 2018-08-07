import React from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
//import { types } from "mobx-state-tree";
import { asyncTask } from "../models/asyncTask";

@observer 
class ConsumerComponent extends React.Component {
    
    onButtonClick = (event) => {
        alert("button was clicked!");
    };

    render() {

        return (
            <React.Fragment>
                <div>This is the ConsumerComponent</div>
                <div>We display some props from the state tree: {asyncTask.description} </div>

                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onButtonClick}>
                     Click here!
                </Button>
            </React.Fragment>
        );
    }
}

export default ConsumerComponent;