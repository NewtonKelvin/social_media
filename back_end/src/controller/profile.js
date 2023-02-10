const Users = require("../models/users");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const mailer = require(__dirname + "/../../config/nodemailer.json");
const fs = require("fs")

//JWT AUTH
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

//Bcrypt
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//Sequelize
const { Op } = require("sequelize");

//AWS S3
const S3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAcessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKey,
  secretAcessKey
})

//Nodemailer
const nodemailer = require("nodemailer");

let SessionTimeout = 60 * 60 * 1; // 1 Hour

module.exports = {
  //STATUS 200 - SUCCESS (SUCESSO)
  //STATUS 400 - VALIDATION ERROR (FALTAM DADOS)
  //STATUS 422 - SERVER CAN NOT EXECUTE (DADOS INVÁLIDOS)
  //STATUS 403 - FORBIDDEN (REGISTRO DUPLICADO)
  //STATUS 404 - NOT FOUND (DADOS NÃO ENCONTRADOS)
  //STATUS 401 - UNAUTHORIZED (SEM PERMISSÃO)

  //STATUS 418 - I'M A TEAPOT (???)
  //STATUS 500 - INTERNAL SERVER ERROR (ERRO NO SERVIDOR)

  async update(req, res) {

    //Dados
    const { name, username, email, bio } = req.body;
    const { uID } = req;

    //Checagem de dados
    if (!uID || uID == null || typeof uID === undefined) {
      return res.status(400).json({
        error: true,
        message: "ID não pode ser vazio"
      });
    }
    if (!name || name == null || typeof name === undefined) {
      return res.status(400).json({
        error: true,
        message: "Nome não pode ser vazio",
        field: "name",
      });
    }
    if (!username || username === null || typeof username === undefined) {
      return res.status(400).json({
        error: true,
        message: "Username não pode ser vazio",
        field: "username",
      });
    }
    if (!email || email === null || typeof email === undefined) {
      return res.status(400).json({
        error: true,
        message: "Email não pode ser vazio",
        field: "email",
      });
    }

    //Checagem de repetição
    await Users.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
        [Op.not]: [{ id: uID }],
      },
    }).then((user) => {
      if (user) {
        if (user.username === username) {
          return res.status(401).json({
            error: true,
            message: "Já existe um usuário com este username",
            field: "username",
          });
        }
        if (user.email === email) {
          return res.status(401).json({
            error: true,
            message: "Já existe um usuário com este email",
            field: "email",
          });
        }
      } else {
        Users.update({
          bio,
          name,
          username,
          email,
        }, {
          where: { id: uID }
        }).then((user) => {
          return res.status(200).send({
            error: false,
            message: "Dados atualizados com sucesso!"
          });
        }).catch((error) => {
          return res.status(500).json({
            error: true,
            message: "Erro ao atualizar dados: " + error,
          });
        });
      }
    }).catch((error) => {
      return res.status(500).json({
        error: true,
        message: "Falha ao atualizar dados: " + error,
      });
    });

  },

  async likes(req, res){

    const uID = req.uID
    Users.findByPk(uID)
    .then((user) => {
      if(user){
        return res.status(200).json({
          error: false,
          message: "Usuário encontrado com sucesso",
          likes: user.likes
        })
      } else {
        return res.status(200).json({
          error: true,
          message: "Falha ao encontrar usuário"
        })
      }
    })
    .catch((err) => {
      return res.status(200).json({
        error: true,
        message: "Erro ao encontrar usuário: "+err
      })
    })

  }

};
