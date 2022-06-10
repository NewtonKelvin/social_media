const express = require('express')
const routes = express.Router()

//Nodemailer
const nodemailer = require('nodemailer')
const mailer = require(__dirname + '/../config/nodemailer.json');

//JWT AUTH
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

//Controllers
const loginController = require('./controller/login')

//Account
routes.post('/register', nodemailerCheck, loginController.register)
routes.post('/newPassword', loginController.newPassword)
routes.get('/login', loginController.login)
routes.get('/logout', verifyJWT, loginController.logout)
routes.get('/forgotPassword', loginController.forgotPassword)
routes.get('/userByToken', loginController.userByToken)

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
    req.uID = decoded.id;
    next();
  });

}

function nodemailerCheck(req, res, next) {
  let transporter = nodemailer.createTransport(mailer);

  transporter.verify(function (error, success) {
    if (error) {
      console.log(`Nodemailer: ${error}`);
    } else {
      console.log("Nodemailer: Server is ready to take our messages");
    }
  });

  next();
}

module.exports = routes
