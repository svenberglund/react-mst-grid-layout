import React from "react";
import renderElmClasses from '../classStore'

/* Todo: this shall be a concrete class that prints out all properties of l */
export default class GridElementSuper{

        //static name = 'super';

        static renderElement(i, l){
            return <div key={i} bgColor={l.subscriptionMap.get('rgb')}>
                <p>
                <span className="text"> {l.name} - Color: {l.subscriptionMap.get('rgb')}</span><br />
                {l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>)}
                </p>
                </div>;
        };


        // TODO: we should not have to provide params to this method...
        static register(name_, class_){
                renderElmClasses.set(name_, class_);
        }
}