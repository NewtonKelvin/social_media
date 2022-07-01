const env = process.env.NODE_ENV || "development"
const Users = require("../models/users")

const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

//JWT AUTH
require("dotenv-safe").config();

//AWS S3
const S3 = require("aws-sdk/clients/s3")
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAcessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKey,
  secretAcessKey
})

module.exports = {

  async cover(req, res, next){

    const { uID } = req;
  
    if(req.file){
      const fileStream = fs.createReadStream(req.file.path)

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `cover/${req.file.filename}`
      }

      const result = await s3.upload(uploadParams).promise()
      // req.body.cover = result.key

      //DELETE LOCAL FILE
      const oldImage = `tmp/${req.file.filename}`
      unlinkFile(oldImage)

      //Apaga a imgem antiga na pasta TMP e no S3
      Users.findByPk(uID)
      .then((usuario) => {

        if(usuario.cover != "cover/default.jpg"){
          //DELETE S3 FILE
          s3.deleteObject({Bucket: bucketName, Key: `cover/${usuario.cover.slice(-20)}`}, function(err, data) {
            if(err){
              res.status(400).json({
                error: true,
                message: "Falha ao apagar imagem do S3: "+ err.stack
              })
            } else {
              
            }
          });
        }

      }).catch(err => {
        res.status(400).json({
          error: true,
          message: "Falha ao encontrar imagem antiga de capa: "+err
        })
      })
      
      Users.update({
        cover: uploadParams.Key
      }, {
        where: {
          id: req.uID
        }
      }).then(profile => {
        res.status(200).json({
          error: false,
          filename: uploadParams.Key,
          message: "Image de capa atualizada com sucesso!"
        })
  
      }).catch(err => {
        res.status(400).json({
          error: true,
          message: "Falha ao atualizar imagem de capa: " + err
        })
      })

    } else {

      res.status(400).json({
        error: true,
        message: "Imagem de capa não pode ser vazia!"
      })

    }

  },

  async avatar(req, res, next){

    const { uID } = req;
  
    if(req.file){

      const fileStream = fs.createReadStream(req.file.path)

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `avatar/${req.file.filename}`
      }

      const result = await s3.upload(uploadParams).promise()
      // req.body.avatar = result.key

      //DELETE LOCAL FILE
      const oldImage = `tmp/${req.file.filename}`
      unlinkFile(oldImage)

      //Apaga a imgem antiga na pasta TMP e no S3
      Users.findByPk(uID)
      .then((usuario) => {

        if(usuario.avatar != "avatar/default.jpg"){
          //DELETE S3 FILE
          s3.deleteObject({Bucket: bucketName, Key: `avatar/${usuario.avatar.slice(-20)}`}, function(err, data) {
            if(err){
              res.status(400).json({
                error: true,
                message: "Falha ao apagar imagem do S3: "+ err.stack
              })
            } else {
              
            }
          });
        }

      }).catch(err => {
        res.status(400).json({
          error: true,
          message: "Falha ao encontrar imagem antiga de avatar: "+err
        })
      })

      Users.update({
        avatar: uploadParams.Key
      }, {
        where: {
          id: uID
        }
      }).then(profile => {
        res.status(200).json({
          error: false,
          filename: uploadParams.Key,
          message: "Image de perfil atualizada com sucesso!"
        })
  
      }).catch(error => {
        res.status(400).json({
          error: true,
          message: "Falha ao atualizar imagem de perfil"
        })
      })

      
    } else {

      res.status(400).json({
        error: true,
        message: "Imagem de perfil não pode ser vazia!"
      })

    }

  },

  async get(req, res){

    const { folder, key } = req.params

    const downloadParams = {
      Key: `${folder}/${key}`,
      Bucket: bucketName
    }

    const file = await s3.getObject(downloadParams).createReadStream()
    file.pipe(res)

  }

};
