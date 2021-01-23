import React, { useState } from 'react';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BlueButton from './blueButton';
import WhiteButton from './whiteButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Image from 'next/image';
import AddPictureIcon from './addPictureIcon';
import ImageBox from './imageBox';
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '343pt',
    margin: '0 auto',
  },
  heading: {
    fontSize:'18pt',
    fontWeight:'bold',
  },
  centering:{
    width:'100%',
    margin:'0 auto',
    textAlign:'center',
  },
  subTitle:{
    float:'left',
    margin:'12pt 0',
    fontWeight:'bold',
    fontSize:'15pt',
  },
  content:{
    clear:'both',
    width:'100%',
    margin:'42pt 0pt',
  },
  textBox:{
    width:'100%',
    height:'99pt',
    margin: '0 auto',
  },
  helper:{
    fontSize:'13pt',
    color:'#969696',
    textAlign:'right',
    float:'right',
    margin:'12pt 0',
  },
  imgCnt:{
    color:'#2294e3',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    textAlign:'right',
  },
  inputRight: {
    textAlign: "right",
  },
  blueText:{
    color:'#2294e3',
    fontSize:'15pt',
    marginLeft:'11pt',
    fontWeight:'bold',
    position:'relative',
    bottom:'1pt',
  },
  noBorderButton:{
    border:'0pt',
  },
  scroll:{
    overflow:'auto',
    height:'100pt',
    width:'100%',
  },
}));




function SimpleAccordion({ children }) {
  //임시저장 함수입니다.
  async function saveTmp(e){
    let formData = new FormData();
    let data = {
      won : value.won,
      images : value.images,
      accidentHistory : value.accidentHistory,
      repairedHistory : value.repairedHistory,
      manufacturer : value.manufacturer,
      imageFiles : value.imageFiles,
    };
    for ( var key in data ) {
      formData.append(key, data[key]);
    }
    console.log(data);
    await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
      console.log(res.data.status)
    }).catch((error) => {
      console.log(error)
    });
  };

  const classes = useStyles();
  //state 선언입니다.
  const [ value, setValue ] = useState({
    won: '',
    images:[],
    accidentHistory:'',
    repairedHistory:'',
    manufacturer:'',
    imageFiles:[],
  });
  //event 매개변수를 활용해 state를 업데이트 하는 함수입니다.
  const updateValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };
  //원화에 ,찍는 함수입니다.
  const handleChange = (e) => {
    let price = e.target.value;
    price = price.split(/ /)[0].replace(/[^\d]/g, ''); //,빼는 코드입니다.
    setValue({
      ...value,
      won: Number(price).toLocaleString('ko-KR'), //,추가 코드입니다.
    });
  };
  //이미지파일을 state에 저장하는 함수입니다.
  const handleImageState = (data) => {
    let dataURLArray = [];
    let dataFilesArray = [];
    for(var i=0; i<data.length; i++){
      let dataURL = window.URL.createObjectURL(data.item(i)); //클라이언트가 이미지파일을 선택했을때 선택한 이미지파일을 보여주기 위해 URL을 저장합니다.
      dataURLArray.push(dataURL);
      dataFilesArray.push(data.item(i)); //서버로 보낼 이미지파일의 FileObject를 저장합니다.
    }
    setValue({
      ...value,
      images: value.images.concat(dataURLArray),
      imageFiles : value.imageFiles.concat(dataFilesArray),
    });
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <div className={classes.heading}>{children}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.centering}>
            <div className={classes.subTitle}>사고이력</div>
            <div className={classes.content}>
              <BlueButton width='148pt' onClick={updateValue} name="accidentHistory" value="true">사고 이력 있음</BlueButton>
              <WhiteButton width='148pt' onClick={updateValue} name="accidentHistory" value="false">사고 이력 없음</WhiteButton>
            </div>
            <div className={classes.subTitle}>수리내역</div>
            <div className={classes.content}>
            <TextField className={classes.textBox} onChange={updateValue} name="repairedHistory" label="구체적인 수리 내역을 작성해주세요" variant="outlined" multiline rows={4}/>
            </div>
            <span className={classes.subTitle}>제조사</span>
            <span className={classes.helper}>외제차의 경우 체크하세요</span>
            <div className={classes.content}>
            <BlueButton onClick={updateValue} name="manufacturer" value="현대" width='90pt'>현대</BlueButton>
            <WhiteButton onClick={updateValue} name="manufacturer" value="르노 삼성" width='90pt'>르노 삼성</WhiteButton>
            <WhiteButton onClick={updateValue} name="manufacturer" value="기아" width='90pt'>기아</WhiteButton>
            <WhiteButton onClick={updateValue} name="manufacturer" value="쌍용" width='90pt'>쌍용</WhiteButton>
            <WhiteButton onClick={updateValue} name="manufacturer" value="GM 대우" width='90pt'>GM 대우</WhiteButton>
            <WhiteButton onClick={updateValue} name="manufacturer" value="기타" width='90pt'>기타</WhiteButton>
            </div>

            <span className={classes.subTitle}>차량 사진</span>
            <span className={classes.helper}>10개 등록 가능 <span className={classes.imgCnt}>0/10</span></span>

            <div className={classes.scroll}>

              <AddPictureIcon imageState = {handleImageState}></AddPictureIcon>
              {value.images.map((img, i) => {return (<ImageBox src={img} key={i}/>);})}

            </div>
            <span className={classes.subTitle}>가격 제시하기</span>
            <span className={classes.helper}>희망 가격을 제시해 주세요</span>
            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <Input
              classes={{input : classes.inputRight,}}
              value={value.won}
              onChange={handleChange}
              endAdornment={<InputAdornment position="end">만원</InputAdornment>}
              />
            </FormControl>
            <div className={classes.content}>
              <WhiteButton width='148pt'>초기화</WhiteButton>
              <BlueButton width='148pt' onClick={saveTmp}>임시저장</BlueButton>
            </div>
            <button className={classes.noBorderButton}>
              <div>
                <Image src='/images/plus.png' width="24pt" height="24pt"></Image>
                <span className={classes.blueText}>중고 차량 추가하기</span>
              </div>
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion;
