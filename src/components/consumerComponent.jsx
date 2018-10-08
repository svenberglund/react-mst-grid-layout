import React from "react";
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";


@observer 
class ConsumerComponent extends React.Component {
    
    render() {

        return (
            <React.Fragment>
                <div>Elements:</div>
                <div>                
                    <ul>
                        {subscriberGrid.tasks.map(function (task, index) {
                            return <li key={index}>{task.name} : {JSON.stringify(task.layoutMap)}</li>;
                        })
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default ConsumerComponent;
