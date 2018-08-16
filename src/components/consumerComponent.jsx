import React from "react";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import { asyncTask } from "../models/asyncTask";
import { asyncTaskSet } from "../models/asyncTaskSet";
//import ShowCaseLayout from './showcase';

@observer 
class ConsumerComponent extends React.Component {
    
    onButtonClick = (event) => {
        alert("button was clicked!");
    };

    render() {

        return (
            <React.Fragment>
                <div>This is the ConsumerComponent</div>
                <div>We display some props from the state tree asyncTask: {asyncTask.description} </div>

                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onButtonClick}>
                     Click here!
                </Button>
                <div>Lets also display some props from the state tree syncTaskSet: {asyncTaskSet.count} </div>
                <div>                
                    <ul>
                        {asyncTaskSet.tasks.map(function (task, index) {
                            return <li key={index}>{task.name}</li>;
                        })
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default ConsumerComponent;
