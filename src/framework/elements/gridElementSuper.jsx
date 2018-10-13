import React from "react";
import renderElmClasses from '../classStore'

/* Todo: this shall be a concrete class that prints out all properties of l */
export default class GridElementSuper{

        //static name = 'super';

        static renderElement(i, sm){
            return <div key={i} bgColor={sm.get('rgb')}>
                <p>
                <span className="text"> Color: {sm.get('rgb')}</span><br />
                </p>
                </div>;
        };


        // TODO: we should not have to provide params to this method...
        static register(name_, class_){
                renderElmClasses.set(name_, class_);
        }
}