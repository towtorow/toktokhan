import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`
  color:#2294e3;
  text-align: center;
  margin: 0 auto;
  width:130pt;
  height:29pt;
  font-size:20pt;
`

function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>
}

export default Header;
