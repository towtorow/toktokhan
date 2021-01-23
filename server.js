const express = require('express')
const next = require('next')
const jwt = require('jsonwebtoken');
var fs = require('fs');
const multer = require('multer');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//임시파일을 저장할 경로입니다.
const dir = 'C:/workspace/toktokhan/tmp/'

//이미지파일을 저장하기 위해 multer를 사용합니다.
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).array("imageFiles", 10);

app.prepare().then(() => {
  const server = express()

  //클라이언트로부터 data를 전달 받기위한 코드입니다.
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  //토큰을 발급하는 api 선언입니다. 로그인 폼이 없는 관계로 모두에게 같은 토큰을 제공합니다.
  server.post('/api/auth', (req, res) => {
    let result = true;
    if (result === false) {
        res.status(404).send('signin fail, invalid user data');
    } else {
      let token = jwt.sign(
        {
          a:'a',
        },
        'toktokhan',
        {
          expiresIn: '5m',
        },
      );
      res.status(200).cookie('user', token).json({
       token: token,
      });
    }
  });
  //클라이언트로부터 데이터를 전달받아 /tmp에 저장하는 api입니다.
  server.post('/api/upload', (req, res, next) => {
    upload(req,res,function(err) {
      let won = req.body.won;
      let images = req.body.images;
      let accidentHistory = req.body.accidentHistory;
      let repairedHistory = req.body.repairedHistory;
      let manufacturer = req.body.manufacturer;
      let imageFiles = req.body.imageFiles;
      jsonData = {
        won : won,
        accidentHistory : accidentHistory,
        repairedHistory : repairedHistory,
        manufacturer : manufacturer,
        imageFiles :imageFiles,
      };
      //tmp폴더 만듭니다. 이미 존재하는 경우 삭제하고 새로 만듭니다.
      fs.mkdir(dir, err => {
        if(err && err.code == 'EEXIST'){
          fs.rmdir(dir, () => {
             fs.mkdir(dir, err=>{});
           });
         }
        });
      //이미지 파일을를 뺀 나머지 데이터를 data.md에 저장합니다.
      fs.writeFile(dir+'data.md', JSON.stringify(jsonData), 'utf8', function(error){ console.log('jsonData write end') });

      if(err) {
        console.log(err);
      }
    console.log("File is uploaded");
    });

    res.status(200).json({
      status: 'success'
    });

  });
  
  server.get('/', (req, res) => {
    return app.render(req, res, '/index');
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
