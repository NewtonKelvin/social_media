const Users = require('../models/users')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const mailer = require(__dirname + '/../../config/nodemailer.json');

//JWT AUTH
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

//Bcrypt
const bcrypt = require('bcrypt')
const crypto = require('crypto')

//Sequelize
const { Op } = require('sequelize')

//Nodemailer
const nodemailer = require('nodemailer')

let SessionTimeout = 60 * 60 * 1 // 1 Hour

module.exports = {

  async register(req, res) {

    //Dados
    const { username, name, email } = req.body

    //Checagem de dados
    if (!name || name == null || typeof name === undefined) {
      return res.status(401).json({
        error: true,
        message: "Nome não pode ser vazio",
        field: "name"
      })
    }
    if (!username || username === null || typeof username === undefined) {
      return res.status(401).json({
        error: true,
        message: "Login não pode ser vazio",
        field: "username"
      })
    }
    if (!email || email == null || typeof email === undefined) {
      return res.status(401).json({
        error: true,
        message: "Email não pode ser vazio",
        field: "email"
      })
    }

    //Checagem de repetição
    await Users.findOne({
      where: {
        [Op.or]: [
          { username },
          { email },
        ]
      }
    }).then((user) => {
      if (user) {

        if (user.email === email) {

          return res.status(401).json({
            error: true,
            message: "Já existe um usuário com este email",
            field: "email"
          })

        }

        if (user.username === username) {

          return res.status(401).json({
            error: true,
            message: "Já existe um usuário com este username",
            field: "username"
          })

        }

      } else {
        //New password
        Users.create({
          username,
          name,
          password: null,
          email
        }).then((user) => {
          if (user) {

            const token = crypto.randomBytes(20).toString('hex')
            const now = new Date()
            now.setHours(now.getHours() + 1)

            user.update({
              passwordResetToken: token,
              passwordResetTokenExpire: now
            })

            let transporter = nodemailer.createTransport(mailer);

            let info = transporter.sendMail({
              from: `"SOCIAL MEDIA" <noreply@socialmedia.com>`, // sender address
              to: user.email, // list of receivers
              subject: "Confirm your account | SOCIAL MEDIA", // Subject line
              // text: "Hello world?", // plain text body
              html: `
                <b>WELCOME TO SOCIAL MEDIA!!!</b>
                <br/>
                <p>Link to confirm your account: </p>
                <a href='${config.url + '/newPassword/' + token}'>Click here</a>`, // html body
            })

            return res.status(200).send({
              error: false,
              message: "Usuário criado com sucesso. Um link de confirmação foi enviado no seu email!"
            })

          } else {
            return res.status(400).json({
              error: true,
              message: "Falha ao cadastrar usuário: "
            })
          }
        }).catch((error) => {
          return res.status(400).json({
            error: true,
            message: "Erro ao cadastrar usuário: " + error
          })
        })
      }
    }).catch((error) => {
      return res.status(400).json({
        error: true,
        message: "Erro ao checar usuário: " + error
      })
    })

  },

  async newPassword(req, res) {

    const { token, password, confirmPassword } = req.body

    if (!token || token == null || typeof token === undefined) {
      return res.status(401).json({
        error: true,
        message: "Token não foi inserido"
      })
    }

    if (!password || password == null || typeof password === undefined) {
      return res.status(401).json({
        error: true,
        message: "Senha não pode ser vazia",
        field: "password"
      })
    }

    if (!confirmPassword || confirmPassword == null || typeof confirmPassword === undefined) {
      return res.status(401).json({
        error: true,
        message: "Confirma sua senha",
        field: "confirmPassword"
      })
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        error: true,
        message: "Confirmação não bate",
        field: "confirmPassword"
      })
    }

    Users.findOne({
      where: {
        passwordResetToken: token
      },
      attributes: [
        'id', 'password', 'passwordResetToken', 'passwordResetTokenExpire'
      ]
    }).then((user) => {
      if (user) {

        const now = new Date()
        if (now > user.passwordResetTokenExpire) {
          return res.status(401).send({
            error: true,
            message: "Link expirado"
          })
        } else {
          const now = new Date()
          user.update({
            password,
            passwordResetTokenExpire: now
          })
          return res.status(200).send({
            error: false,
            message: "Atualizado com sucesso"
          })
        }

      } else {
        return res.status(401).send({
          error: true,
          message: "Link inválido"
        })
      }
    }).catch((error) => {
      return res.status(400).send({
        error: true,
        message: "Falha ao validar token de reset de senha"
      })
    })

  },

  async login(req, res) {

    //Dados
    const { username, password } = req.query

    //Checagem de dados
    if (!username || username === null || typeof username === undefined) {
      return res.status(200).json({
        error: true,
        message: "Username não pode ser vazio",
        field: "username"
      })
    }
    if (!password || password == null || typeof password === undefined) {
      return res.status(200).json({
        error: true,
        message: "Senha não pode ser vazia",
        field: "password"
      })
    }

    //Verificação
    await Users.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (user) {

        if (!user.password || user.password === null || typeof user.password === undefined) {
          return res.status(200).json({
            error: true,
            message: "Primeiro login? Altere sua senha!"
          })
        }

        //Senha encriptada
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const uID = user.id
            const token = jwt.sign({ uID }, process.env.SECRET);
            return res.send({
              auth: true,
              token: token,
              error: false,
              user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                avatar: user.avatar
              }
            });
          } else {
            return res.status(200).json({
              error: true,
              message: "Senhas não batem",
              field: "password"
            })
          }
        });

      } else {
        return res.status(200).json({
          error: true,
          message: "Usuário não encontrado",
          field: "username"
        })
      }
    }).catch((error) => {
      return res.status(200).json({
        error: true,
        message: "Erro ao buscar username: " + error,
        field: "username"
      })
    })

  },

  async logout(req, res) {
    await res.send({
      auth: false,
      token: null
    })
  },

  async forgotPassword(req, res) {

    const { email } = req.query

    if (!email || email === null || typeof email === undefined) {
      return res.status(200).json({
        error: true,
        message: "Email não pode ser vazio"
      })
    }

    try {

      await Users.findOne({
        where: {
          email
        },
        attributes: [
          'id', 'email', 'passwordResetToken', 'passwordResetTokenExpire'
        ]
      }).then((account) => {
        if (account) {

          const token = crypto.randomBytes(20).toString('hex')
          const now = new Date()
          now.setHours(now.getHours() + 1)

          account.update({
            passwordResetToken: token,
            passwordResetTokenExpire: now
          })

          let transporter = nodemailer.createTransport(mailer);

          let info = transporter.sendMail({
            from: `"SOCIAL MEDIA" <noreply@socialmedia.com>`, // sender address
            to: account.email, // list of receivers
            subject: "Recover your password | SOCIAL_MEDIA", // Subject line
            // text: "Hello world?", // plain text body
            html: `
              <b>Forgot your password? No problem:</b>
              <br/>
              <p>Link to recover your password: </p>
              <a href='${config.url + '/newPassword/' + token}'>Click here</a>`, // html body
          })

          return res.status(200).send({
            error: false,
            message: "Recovery link has been sent to your mail",
            messageId: info.messageId,
            // preview: nodemailer.getTestMessageUrl(info)
          })

        } else {
          return res.status(200).send({
            error: true,
            message: "Email não encontrado na base de dados",
            field: "recovery"
          })
        }
      }).catch((error) => {
        return res.status(200).send({
          error: true,
          message: "Falha ao procurar usuário: " + error
        })
      })

    } catch (error) {
      return res.status(200).send({
        error: true,
        message: "Erro ao enviar email: " + error
      })
    }

  },

  async userByToken(req, res) {

    if (req.headers && req.headers.authorization) {

      var token = req.headers.authorization;

      try {
        decoded = jwt.verify(token, process.env.SECRET);
      } catch (e) {
        return res.status(401).send({
          error: true,
          message: 'Unauthorized: ' + e
        });
      }

      var userId = decoded.uID;

      // Fetch the user by id 
      await Users.findByPk(userId).then((user) => {
        // Do something with the user
        if (user) {
          return res.status(200).send({
            error: false,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar
            }
          });

        } else {
          return res.status(401).send({
            error: true,
            message: 'Usuário não encontrado'
          });
        }

      });

    }
    // res.sendStatus(500);

  }

}
