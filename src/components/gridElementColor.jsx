import GridElementSuper from "./gridElementSuper"
import React from "react";
import styled from 'styled-components';

// https://www.styled-components.com/docs/basics    
// Create a Title component that'll render an <h1> tag with some styles
const Text = styled.p`
font-size: 0.8em;
text-align: center;
color: palevioletred;
`;

// Create a Wrapper component as a div
const Wrapper = styled.div`
background: ${props => props.bgColor};
`;

// TODO: make this "inheritable"... 
// subclass it with e-charts https://ecomfe.github.io/echarts-examples/public/editor.html?c=gauge

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