import GridElementSuper from "./gridElementSuper"
import React from "react";
import styled from 'styled-components';

// https://www.styled-components.com/docs/basics    
// Text component
const Text = styled.p`
font-size: 0.8em;
text-align: center;
color: palevioletred;
`;

// Create a Wrapper component as a div
const Wrapper = styled.div`
background: ${props => props.bgColor};
border-radius: 8px;
border-color: 'red';
border: 2px;
`;

/*
Look into this:

Over 200 classes were generated for component gridElementColor__Wrapper. 
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs({
    style: ({ background }) => ({
      background,
    }),
  })`width: 100%;`

  <Component />
*/



export default class GridElementColor extends GridElementSuper{
  
  static renderElement(i, l){
    return <Wrapper key={i} bgColor={l.subscriptionMap.get('rgb')}>
    <Text>
      <span className="text"> {l.name} - Color: {l.subscriptionMap.get('rgb')}</span><br />
      {l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>)}
    </Text>
  </Wrapper>;
  }
}