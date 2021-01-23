# Custom Express Server example

Most of the times the default Next server will be enough but sometimes you want to run your own server to customize routes or other kind of the app behavior. Next provides a [Custom server and routing](https://github.com/vercel/next.js#custom-server-and-routing) so you can customize as much as you want.

Because the Next.js server is just a node.js module you can combine it with any other part of the node.js ecosystem. in this case we are using express to build a custom router on top of Next.

The example shows a server that serves the component living in `pages/a.js` when the route `/b` is requested and `pages/b.js` when the route `/a` is accessed. This is obviously a non-standard routing strategy. You can see how this custom routing is being made inside `server.js`.

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example custom-server-express custom-server-express-app
# or
yarn create next-app --example custom-server-express custom-server-express-app
```

### Populate body property

Without the use of the body-parser package `req.body` will return undefined. To get express to populate `req.body` you need to install the body parser package and call the package within server.js.

Install the package:

```bash
npm install body-parser
```

Use the package within server.js:

```bash
const bodyParser = require('body-parser');

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
})
```

1.실행방법
  프로젝트를 클론하고 커멘드 창에서 프로젝트 폴더 안으로 들어간 뒤 npm run dev 명령어를 입력합니다.

2.설명
  이미지 파일을 서버에 저장하는 것빼고 거의다 구현한 것 같습니다. 자세한 설명은 코드에 주석을 달았습니다. 감사합니다.

3.질문
  클라이언트(Next)로부터 이미지 파일의 File Object를 Array형태로 전달 받았는데 서버측(express)에서 파일 스트림으로 임시폴더에 쓰는 방법을 모르겠습니다.
  fs.writeFile() 함수로 저장을 해봤는데 빈 이미지 파일이 저장됩니다. 뭐가 잘못된 건지 모르겠습니다.
