import React from 'react';
import { Button } from "semantic-ui-react";

class ConsumerComponent extends React.Component {
    

    onButtonClick = (event) => {
        alert("button was clicked!");
    };

    render() {

        return (
            <React.Fragment>
                <div>This is the ConsumerComponent</div>

                <Button
                    icon
                    compact
                    size="tiny"
                    onClick={this.onButtonClick}>
                     Click here!
                </Button>
            </React.Fragment>
        );
    }
}

export default ConsumerComponent;