const env = process.env.NODE_ENV || "development";
const Users = require("../models/users");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

//JWT AUTH
require("dotenv-safe").config();

//AWS S3
const S3 = require("aws-sdk/clients/s3");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAcessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKey,
  secretAcessKey,
});

module.exports = {
  async cover(req, res) {
    const { uID } = req;

    if (req.file) {
      const fileStream = fs.createReadStream(req.file.path);

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `cover/${req.file.filename}`,
      };

      const result = await s3.upload(uploadParams).promise();
      // req.body.cover = result.key

      //DELETE LOCAL FILE
      const oldImage = `tmp/${req.file.filename}`;
      await unlinkFile(oldImage);

      //Apaga a imgem antiga na pasta TMP e no S3
      Users.findByPk(uID)
        .then(async (usuario) => {
          if (usuario.cover != "cover/default.jpg") {
            //DELETE S3 FILE
            await s3.deleteObject(
              { Bucket: bucketName, Key: `cover/${usuario.cover.slice(-20)}` },
              function (err, data) {
                if (err) {
                  return res.status(400).json({
                    error: true,
                    message: "Falha ao apagar imagem do S3: " + err.stack,
                  });
                } else {
                }
              }
            );
          }
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            message: "Falha ao encontrar imagem antiga de capa: " + err,
          });
        });

      Users.update(
        {
          cover: uploadParams.Key,
        },
        {
          where: {
            id: req.uID,
          },
        }
      )
        .then((profile) => {
          return res.status(200).json({
            error: false,
            filename: uploadParams.Key,
            message: "Image de capa atualizada com sucesso!",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            message: "Falha ao atualizar imagem de capa: " + err,
          });
        });
    } else {
      return res.status(400).json({
        error: true,
        message: "Imagem de capa não pode ser vazia!",
      });
    }
  },

  async avatar(req, res) {
    const { uID } = req;

    if (req.file) {
      const fileStream = fs.createReadStream(req.file.path);

      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `avatar/${req.file.filename}`,
      };

      const result = await s3.upload(uploadParams).promise();
      // req.body.avatar = result.key

      //DELETE LOCAL FILE
      const oldImage = `tmp/${req.file.filename}`;
      await unlinkFile(oldImage);

      //DELETE S3 FILE
      Users.findByPk(uID)
        .then(async (usuario) => {
          if (usuario.avatar != "avatar/default.jpg") {
            //DELETE S3 FILE
            await s3.deleteObject(
              {
                Bucket: bucketName,
                Key: `avatar/${usuario.avatar.slice(-20)}`,
              },
              function (err, data) {
                if (err) {
                  return res.status(400).json({
                    error: true,
                    message: "Falha ao apagar imagem do S3: " + err.stack,
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            message: "Falha ao encontrar imagem antiga de avatar: " + err,
          });
        });

      Users.update(
        {
          avatar: uploadParams.Key,
        },
        {
          where: {
            id: uID,
          },
        }
      )
        .then((profile) => {
          return res.status(200).json({
            error: false,
            filename: uploadParams.Key,
            message: "Imagem de perfil atualizada com sucesso!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error: true,
            message: "Falha ao atualizar imagem de perfil",
          });
        });
    } else {
      return res.status(400).json({
        error: true,
        message: "Imagem de perfil não pode ser vazia!",
      });
    }
  },

  async get(req, res) {
    const { param1: firstParam, param2, param3 } = req.params;
    const secondParam = param3 ? `${param2}/${param3}` : param2;

    const downloadParams = {
      Key: `${firstParam}/${secondParam}`,
      Bucket: bucketName,
    };

    const file = await s3.getObject(downloadParams).createReadStream();
    return file.pipe(res);
  },
};
