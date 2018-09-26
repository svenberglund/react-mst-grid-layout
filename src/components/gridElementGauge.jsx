import GridElementSuper from "./gridElementSuper"
import React from "react";
import styled from 'styled-components';



// TODO: reimplement this :

const Text = styled.p`
font-size: 0.8em;
text-align: center;
color: palevioletred;
`;


const Wrapper = styled.div`
background: ${props => props.bgColor};
`;
 
// implement it with e-charts https://ecomfe.github.io/echarts-examples/public/editor.html?c=gauge

export default class GridElementGauge extends GridElementSuper{
  
  static renderElement(i, l){
    return <Wrapper key={i} bgColor={l.subscriptionMap.get('rgb')}>
    <Text>
      <span className="text"> {l.name} - GAUGE CLASS!!! Color: {l.subscriptionMap.get('rgb')}</span><br />
      {l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>)}
    </Text>
  </Wrapper>;
  }
}