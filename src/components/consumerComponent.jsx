import React from "react";
import { observer } from "mobx-react";
import RMGL from "../api";
import { Accordion, AccordionTab } from 'primereact/accordion';



/*
    A component consuming data from the subscribergrid framework.
    For this you need to mark your component as @observer.
    if you want to work without annotations you instead  attach the observer in the export below, like so:
    export default observer(ConsumerComponent);
*/
@observer
class ConsumerComponent extends React.Component {
    render() {

        return (
            <React.Fragment>
                <Accordion>
                    <AccordionTab header="Show element layouts">
                        <div>
                            <ul>
                                {RMGL.mstGrids.getGrid("defaultGrid").items.map(function (item, index) {
                                    return <li key={index}> {index} : { item.show ?  JSON.stringify(item.layoutMap) : ''} </li>;
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
