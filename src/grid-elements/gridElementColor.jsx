import RMGL from 'react-mst-grid-layout';
import React from "react";
import styled from 'styled-components';


const ColoredWrapper = styled.div`
background: ${props => props.txtColor};
border-radius: 8px;
margin: 1em;
font-size: 1.2em;
text-align: center;
`;

const Wrapper = styled.div`
background: WhiteSmoke;
border-radius: 8px;
border-width: 3px;
border-color: lightGray;
border-style: solid;
`;



/*
  A simple implementation of a grid element built on Styled components
  https://www.styled-components.com/docs/basics    
*/
export default class GridElementColor {
  // can we do this in es6 syntax? : extends RMGL.GridElementSuper {
  
  // "Override" 
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

  // "Inherit"
  static register(name_, class_) { 
    return RMGL.GridElementSuper.register(name_,class_);
  }

}

/*
TODO: Look into this warning, no big deal in this demo but would be nice to get rid of:

Over 200 classes were generated for component gridElementColor__Wrapper. 
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs({
    style: ({ background }) => ({
      background,
    }),
  })`width: 100%;`
*/