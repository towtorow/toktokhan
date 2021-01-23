import React from "react";
import styled from "styled-components";

const ImageBox = styled.img`
  width:100pt;
  height:100pt;
  border-radius:10pt;
  float:left;
`

function imageBox(props) {
  return <ImageBox src = {props.src} />
}

export default imageBox;
