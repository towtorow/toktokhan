import React from "react";
import styled from "styled-components";
import Image from 'next/image';
import Input from '@material-ui/core/Input';

const AddPictureIcon = styled.div`
  background:#e4e4e4;
  text-align: center;
  vertical-align:middle;
  width:100pt;
  height:100pt;
  line-height:115pt;
  border-radius:10pt;
  float:left;
`

const NonDisplayInput = styled.input`
  display:none;
`

let inputRef = null;
let propsGlobal = null; // propsGlobal.imageState()를 호출하기 위해 props를 담는 변수를 만들었습니다.

//AddPictureIcon을 클릭했을 때 보이지 않는 input tag를 클릭시킵니다.
const handleClick = () =>{
  inputRef.click();
};

//선택한 이미지 파일을 상위 컴포넌트에 전달하기 위한 함수입니다.
const handleChange = () =>{
  propsGlobal.imageState(inputRef.files);
};

function addPictureIcon(props) {
  propsGlobal = props;
  return(
    <AddPictureIcon imageState={props.imageState} onClick={handleClick}><NonDisplayInput name="imageFiles" onChange={handleChange} ref={ref => {inputRef = ref;}} type='file' accept="image/*" multiple/><Image src='/images/plus2.png' width="30pt" height="30pt" /></AddPictureIcon>
  );
}

export default addPictureIcon;
