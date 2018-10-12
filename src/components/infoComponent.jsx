import React from "react";
import { Panel } from "primereact/panel";

export class InfoComponent extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'left' }}>        
          <Panel header="About this demo" style={{ marginTop : '3em'}}>
          <ul>
          <li>
              The 'Start' button ties listeners ('subscriptions') to all the components in the grid view.
              There is a web worker continuously running in the background and publishing simulation data on four differnt channels. 
              The components can be moved and rearranged in the grid while consuming and displayng data.
          </li>
          <li>
              The 'Add element' and 'Change element' buttons are to test modifying the grid by invoking actions from the GUI.
              They impose 'random' changes to the grid. They can only be run 4 times each without reloading the page (to not toally screw up the demo).
          </li>
          <li>
              The 'Lock all' button will disable the elements from being draggable in the grid.
          </li>

          </ul>
        </Panel>
        <Panel header="About the SubscriberGrid.js project" style={{ marginTop : '1em' }}>
          
            <p>
                The aim of the project is to create a easy-to-use, responsive and performant framework for a flexible React.js grid view where the components 
                are immediately ready to recieve data.
                <br/>
                Typical use case: Dashboard or other such view that has to receive and respond to lots of data at real time. 
                <br/>
                The elements in the grid are constucted and rendered with a implementation of a special es6 base class.
                As soon as a element is added it can be wired to a channel and it is thereby ready to recieve data.
            </p>
            <p>
                The 'framework' is built upon react-grid-view and MST (mobx-state-tree).
            </p>
            <p>
                Source code and more info.<br/>
                <a href="https://github.com/svenberglund/SubscriberGrid"> https://github.com/svenberglund/SubscriberGrid </a>
            </p>

        </Panel>
      </div>
    );
  }
}
