import React from "react";
import styled from "styled-components";

//상위 컴포넌트에서 props를 통해 width값을 받아옵니다.
const WhiteButton = styled.button`
  background:white;
  color:#2294e3;
  text-align: center;
  height:47pt;
  font-size:15pt;
  border-radius:8pt;
  width: ${props => props.width};
  margin:3.5pt;
`

function whiteButton(props) {
  return <WhiteButton name={props.name} value={props.value} onClick={props.onClick} width={props.width}>{props.children}</WhiteButton>;
}

export default whiteButton;
