import React from "react";
import renderElmClasses from '../classStore'

/* 
        This is a concrete class that prints out all properties of sm (the 'subscription map') 
        Can be used for debug and 'getting started' purposes but is intended to be overridden in your implementation.
*/
export default class GridElementSuper {

        static renderElement(i, sm) {

                let keys = [...sm.keys()];
                let listItems = keys.map((key) =>
                        <li key={key}>{key} : {sm.get(key)}</li>
                );

                return <div key={i} style={{ backgroundColor: 'BlanchedAlmond' }} >

                        <p>This is the grid element superclass. It can be used for debug and grid design
                        purposes and shall be overridden in your application.</p>
                        <span>Received data:</span>
                        <ul>{listItems}</ul>
                </div>;
        };

        /*
                Don't override, this method is used to register your implenting classes
                i.e. make them useable in the grid.
        */
        static register(name_, class_) {
                renderElmClasses.set(name_, class_);
        }
}