//토큰을 검증하는 미들웨어입니다.
module.exports = {
    verifyJWT = (req, res, next) => {
        try {
            console.log('middleware working...');
            req.decoded = jwt.verify(req.header.authorization, 'toktokhan')
            return next()
        } catch(error) {
            if(error.name === 'TokenExpiredError'){
                res.status(404).send('signin fail, token expired');
            }
            res.status(404).send('signin fail, invalid token');
        }
    }
}
