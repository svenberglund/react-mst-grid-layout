import GridElementSuper from "../framework/elements/gridElementSuper"
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
TODO: Look into this warning:

Over 200 classes were generated for component gridElementColor__Wrapper. 
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs({
    style: ({ background }) => ({
      background,
    }),
  })`width: 100%;`
*/



export default class GridElementColor extends GridElementSuper{
  
  static renderElement(i, sm){
    let rgbMap = JSON.parse(sm.get('rgb'));

    return <Wrapper key={i}>

      <ColoredWrapper txtColor={`rgb(${rgbMap['rgbH']},${rgbMap['rgbL']},${rgbMap['rgbH']})`} >
          Color: {`rgb(${rgbMap['rgbH']},${rgbMap['rgbL']},${rgbMap['rgbH']})`} 
    </ColoredWrapper>

    <div>
    <span className="text"> 
    Data: {sm.get('series')}</span>
    </div>
    
  </Wrapper>;
  }
}