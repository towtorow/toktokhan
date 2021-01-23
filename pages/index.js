import Link from 'next/link';
import styled from "styled-components";
import Header from './components/header';
import SimpleAccordion from './components/simpleAccordion';
import EnrollButton from './components/enrollButton';
import axios from "axios";

const Container = styled.div`
  width:375pt;
  margin:0 auto;
`

const TopBottomMarginDiv = styled.div`
  margin-top:12pt;
  margin-bottom:12pt;
`



export default function Home() {
  axios({
    method:"POST",
    url: '/api/auth',
    data:{}}).then((res)=>{
      console.log(res.data.token);
    }).catch(error=>{
      console.log(error);
    });
  return (
    <Container>
      <Header>똑똑한 중고차</Header>
      <TopBottomMarginDiv>
        <SimpleAccordion>중고차1정보</SimpleAccordion>
        <SimpleAccordion>중고차2정보</SimpleAccordion>
      </TopBottomMarginDiv>
      <EnrollButton/>
    </Container>
  )
}
