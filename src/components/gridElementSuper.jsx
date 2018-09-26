import React from "react";

/* Todo: this shall be a concrete class that prints out all properties of l */
export default class GridElementSuper{
        static renderElement(i, l){
            return <div key={i} bgColor={l.subscriptionMap.get('rgb')}>
                <p>
                <span className="text"> {l.name} - Color: {l.subscriptionMap.get('rgb')}</span><br />
                {l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>)}
                </p>
                </div>;
        };
}