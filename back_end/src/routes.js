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
const imageController = require('./controller/image')

//Login
routes.post('/register', loginController.register)
routes.post('/newPassword', loginController.newPassword)
routes.get('/login', loginController.login)
routes.get('/logout', verifyJWT, loginController.logout)
routes.get('/forgotPassword', loginController.forgotPassword)
routes.get('/userByToken', verifyJWT, loginController.userByToken)

routes.get('/image/:folder/:key', imageController.get)

//Profile
routes.post('/profile/update', verifyJWT, profileController.update)

routes.post('/profile/updateCover', verifyJWT, upload.single("cover"), imageController.cover)
routes.post('/profile/updateAvatar', verifyJWT, upload.single("avatar"), imageController.avatar)


//Profile

//Middlewares
function verifyJWT(req, res, next) {

  //VERIFY JWT
  const token = req.headers['authorization'];

  if (!token) {
    return res.json({ auth: false, message: 'No token provided.' });
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
