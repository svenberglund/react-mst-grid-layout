import React from "react";
import { observer } from "mobx-react";
import RMGL from 'react-mst-grid-layout'
import { Accordion, AccordionTab } from 'primereact/accordion';



/*
    A component consuming data from the subscribergrid framework.
    This is where the grid is rendered.
    TODO: we shall incapsulate mobx-react in the subscirbergrid framework, hence use our own API rather than @observer.
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
                                    return <li key={index}>{item.layoutIndex} : {JSON.stringify(item.layoutMap)}</li>;
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
