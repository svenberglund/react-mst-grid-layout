import GridElementSuper from "./gridElementSuper"
import React from "react";
import styled from 'styled-components';

// https://www.styled-components.com/docs/basics    
// Text component
const ColoredWrapper = styled.div`
background: ${props => props.txtColor};
border-radius: 8px;
margin: 1em;
font-size: 1.2em;
text-align: center;
`;




// Create a Wrapper component as a div
const Wrapper = styled.div`
background: WhiteSmoke;
border-radius: 8px;
border-width: 3px;
border-color: lightGray;
border-style: solid;
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
    let rgbMap = JSON.parse(l.subscriptionMap.get('rgb'));

    return <Wrapper key={i}>

      <ColoredWrapper txtColor={`rgb(${rgbMap['rgbH']},${rgbMap['rgbL']},${rgbMap['rgbH']})`} >
          Color: {`rgb(${rgbMap['rgbH']},${rgbMap['rgbL']},${rgbMap['rgbH']})`} 
    </ColoredWrapper>

    <div>
    <span className="text"> 
    {/*{l.name} <br /> */} 
    Data: {l.subscriptionMap.get('series')}</span>
    <br />
    {l.running ? (<span className="text"> Running  </span>) : (<span className="text"> Idle </span>)} <br />
    </div>
    
  </Wrapper>;
  }
}