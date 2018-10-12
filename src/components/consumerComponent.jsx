import React from "react";
import { observer } from "mobx-react";
import { subscriberGrid } from "../framework/models/subscriberGrid";
import {Accordion,AccordionTab} from 'primereact/accordion';

@observer 
class ConsumerComponent extends React.Component {
    
    render() {

        return (
            <React.Fragment>

            <Accordion>
            <AccordionTab header="Show element layouts">

                <div>                
                    <ul>
                        {subscriberGrid.tasks.map(function (task, index) {
                            return <li key={index}>{task.layoutIndex} : {JSON.stringify(task.layoutMap)}</li>;
                        })
                        }
                    </ul>
                </div>

                </AccordionTab>
                </Accordion>
            </React.Fragment>

        );
    }
}

export default ConsumerComponent;
