import React from "react";
import styled from 'styled-components';
import _ from "lodash";

// Check out this https://www.npmjs.com/package/react-container-dimensions !!!
// ...to be able to resize dynamcally... firs try to solve the isssue of same-size-as-parent at first rendering...

// https://www.styled-components.com/docs/basics    
// Create a Title component that'll render an <h1> tag with some styles
const Text = styled.p`
  font-size: 0.8em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  background: ${props => props.bgColor};
`;

class GridItem{


static  generateDOM(elements) {
    //console.log(JSON.stringify(elements));

    /* Returns a map of the items to be rendered and a function to be applied */
    return _.map(elements, function(l,i){
      return (
              <Wrapper key={i} bgColor={l.subscriptionMap.get('rgb')}>
                <Text>
                    <span className="text"> {l.name} - Color: {l.subscriptionMap.get('rgb')}</span><br/>
                    { l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>) }
                </Text>
              </Wrapper>
      );
    });
  }
}

export default GridItem;