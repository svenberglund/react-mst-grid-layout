import React from "react";
import { Panel } from "primereact/panel";



/*
    A static 'about' or 'info' view describing the demo.
*/
export class InfoComponent extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <Panel header="About this demo" style={{ marginTop: '3em' }}>
                    <ul>
                        <li>
                            The 'Apply listeners' button ties listeners ('subscriptions') to all the components in the grid view.
                            The components can be moved and rearranged in the grid while consuming and displaying data.
                        </li>
                        <li>
                            There is a web worker (background process) continuously running in the browser producing and publishing simulated data on different channels.
                            This is why the page has some cpu footprint even when the grid elements are idle and this will not be a factor in real world usage of the framework.
                        </li>
                        <li>
                            The 'Add element' and 'Change element' buttons are there to test modifying the grid by invoking actions from the GUI.
                            They impose pseudo random changes to the grid. In this demo they can only be run 4 times each without reloading the page (not to totally screw up the demo). <br />
                            The first time you use 'Add element' it will showcase the 'grid element superclass' which is ment to be overridden but has a instructive purpose.
                         </li>
                        <li>
                            The 'Lock all' button will disable the elements from being draggable and resizeable in the grid.
                        </li>
                        <li>
                            The grid elements designed for this demo are implemented with echarts-for-react and styled-components.
                            Of course any your favourite UI component framework for React (that has support for es6) can be used for implementing the grid elements.
                         </li>
                    </ul>
                </Panel>
                <Panel header="About the SubscriberGrid.js project" style={{ marginTop: '1em' }}>
                    <p>
                        The aim of the project is to create a easy-to-use, responsive and performant framework for a flexible React.js grid view where the components
                        are immediately ready to recieve data.
                        <br />
                        Typical use case: Dashboard or other such view that has to receive and respond to lots of data at real time and on different channels.
                        It is also a good case if the users shall be able to unlock the grid, rearrange the components and then save their favourite grid layout arrangements (perhaps in local storage).
                        <br />
                        The elements in the grid are constucted and rendered by overriding a special es6 base class (the 'grid element superclass').
                        Any element that is added to the grid can immediately be wired to a channel and it is thereby ready to recieve data provided via a publish API.
                    </p>
                    <p>
                        This 'framework' is built upon react-grid-view and MST (mobx-state-tree). It is eventually intended to be packaged into a node module.
                    </p>
                    <p>
                        Source code and more info.
                        <br />
                        <a href="https://github.com/svenberglund/SubscriberGrid"> https://github.com/svenberglund/SubscriberGrid </a>
                    </p>

                </Panel>
            </div>
        );
    }
}
