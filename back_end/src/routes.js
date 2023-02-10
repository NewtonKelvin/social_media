const express = require('express')
const routes = express.Router()

//Multer
const multer = require("multer")
const multerConfig = require("./config/multer")
const upload = multer(multerConfig)

//JWT AUTH
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

//Controllers
const loginController = require('./controller/login')
const profileController = require('./controller/profile')
const postController = require('./controller/post')
const imageController = require('./controller/image')

//Login
routes.post('/register', loginController.register)
routes.post('/newPassword', loginController.newPassword)
routes.get('/login', loginController.login)
routes.get('/logout', verifyJWT, loginController.logout)
routes.get('/forgotPassword', loginController.forgotPassword)

routes.get('/userByToken', verifyJWT, loginController.userByToken)

//Images
routes.get('/image/:param1/:param2/:param3?', imageController.get)
routes.post('/profile/updateCover', verifyJWT, upload.single("cover"), imageController.cover)
routes.post('/profile/updateAvatar', verifyJWT, upload.single("avatar"), imageController.avatar)

//Profile
routes.post('/profile/update', verifyJWT, profileController.update)
routes.get('/userLikes', verifyJWT, profileController.likes)

//Post
routes.post('/newPost', verifyJWT, upload.array('files', 5), postController.insert)
routes.get('/post/:token', verifyJWT, postController.get)
routes.put('/postLike/:token', verifyJWT, postController.like)

routes.put('/postComment/', verifyJWT, postController.comment)
routes.get('/postComments/:token', verifyJWT, postController.getComments)
routes.delete('/deleteComment/:postToken/:commentToken', verifyJWT, postController.deleteComment)

//Middlewares
function verifyJWT(req, res, next) {

  //VERIFY JWT
  const token = req.headers['authorization'];

  if (!token) {
    return res.json({
      error: true,
      auth: false,
      message: 'No token provided.'
    });
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if(err){
      return res.status(401).json({
        error: true,
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.uID = decoded.uID
    next();
  });

}

module.exports = routes
