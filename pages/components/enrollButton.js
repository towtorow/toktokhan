import React from "react";
import styled from "styled-components";

const EnrollButton = styled.button`
  background:#2294e3;
  color:white;
  font-weight:bold;
  text-align: center;
  margin: 0 auto;
  width:100%;
  height:62pt;
  font-size:18pt;
`

function Button(props) {
  return <EnrollButton onClick={props.onClick}>판매 등록 하기</EnrollButton>
}

export default Button;
