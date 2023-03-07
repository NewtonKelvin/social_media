const Users = require("../models/users");
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const env = process.env.NODE_ENV || "development";
const crypto = require("crypto");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

//JWT AUTH
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

//Sequelize
const { Op } = require("sequelize");

//AWS S3
const S3 = require("aws-sdk/clients/s3");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { post } = require("../routes");

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
  async insert(req, res) {
    const { description, privacity } = req.body;
    const myFiles = req.files;

    if (
      !description ||
      description == null ||
      typeof description === undefined
    ) {
      return res.status(400).json({
        error: true,
        message: "Descrição não pode ser vazia",
        field: "description",
      });
    }
    if (
      !privacity ||
      privacity == null ||
      privacity == "null" ||
      typeof privacity === undefined
    ) {
      return res.status(400).json({
        error: true,
        message: "Privacidade deve ser escolhida",
        field: "privacity",
      });
    }
    if (!myFiles || myFiles == null || typeof myFiles === undefined) {
      return res.status(400).json({
        error: true,
        message: "A publicação deve ter alguma imagem!",
        field: "files",
      });
    }

    const postHash = crypto.randomBytes(10).toString("hex");
    const fileList = [];

    myFiles.forEach(async (element, index) => {
      const fileName = element.filename;
      fileList.push(`post/${postHash}/${fileName}`);

      const fileStream = fs.createReadStream(element.path);
      const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `post/${postHash}/${fileName}`,
      };
      await s3.upload(uploadParams).promise();
      //DELETE LOCAL FILE
      await unlinkFile(`tmp/${fileName}`);
    });

    Posts.create({
      token: postHash,
      userId: req.uID,
      description,
      privacity,
      files: fileList,
    })
      .then((post) => {
        if (post) {
          return res.status(200).json({
            error: false,
            message: "Publicação criada com sucesso!",
            link: `/post/${post.token}`,
          });
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao criar publicação!",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao criar publicação: " + err,
        });
      });
  },

  async get(req, res) {
    const { token } = req.params;

    if (!token || token == null || typeof token === undefined) {
      return res.status(400).json({
        error: true,
        message: "Token da publicação não pode ser vazio",
        field: "token",
      });
    }

    Posts.findOne({
      where: { token },
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["name", "username", "avatar"],
        },
        {
          model: Comments,
          as: "comments",
          attributes: ["userId", "value"],
        },
      ],
    })
      .then((post) => {
        if (post) {
          return res.status(200).json({
            error: false,
            message: "Publicação encontrada!",
            post,
          });
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao encontrar publicação!",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao encontrar publicação: " + err,
        });
      });
  },

  async comment(req, res) {
    const { token, comment } = req.body;
    const uID = req.uID;
    const commentHash = crypto.randomBytes(10).toString("hex");

    if (!token || token == null || typeof token === undefined) {
      return res.status(400).json({
        error: true,
        message: "Token da publicação não pode ser vazio",
        field: "token",
      });
    }

    if (!comment || comment == null || typeof comment === undefined) {
      return res.status(400).json({
        error: true,
        message: "Comentário da publicação não pode ser vazio",
        field: "comment",
      });
    }

    Posts.findOne({
      where: { token },
    })
      .then((post) => {
        if (post) {
          Comments.create({
            token: commentHash,
            postToken: post.token,
            userId: uID,
            value: comment,
          })
            .then((comment) => {
              if (comment) {
                Comments.findAll({
                  where: { postToken: post.token },
                  attributes: ["token", "postToken", "updatedAt", "value"],
                  include: {
                    model: Users,
                    as: "user",
                    attributes: ["name", "username", "avatar"],
                  },
                })
                  .then((comments) => {
                    if (comments) {
                      return res.status(200).json({
                        error: false,
                        message: "Comentário enviado com sucesso!",
                        comments,
                      });
                    } else {
                      return res.status(500).json({
                        error: true,
                        message: "Erro ao encontrar comentários!",
                      });
                    }
                  })
                  .catch((err) => {
                    return res.status(500).json({
                      error: true,
                      message: "Falha ao encontrar comentário: " + err,
                    });
                  });
              } else {
                return res.status(500).json({
                  error: true,
                  message: "Erro ao enviar comentário!",
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Falha ao enviar comentário: " + err,
              });
            });
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao encontrar publicação!",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao encontrar publicação: " + err,
        });
      });
  },

  async deleteComment(req, res) {
    const { postToken, commentToken } = req.params;
    const uID = req.uID;

    if (
      !commentToken ||
      commentToken == null ||
      typeof commentToken === undefined
    ) {
      return res.status(400).json({
        error: true,
        message: "Token do comentário não pode ser vazio",
        field: "commentToken",
      });
    }
    if (!postToken || postToken == null || typeof postToken === undefined) {
      return res.status(400).json({
        error: true,
        message: "Token da publicação não pode ser vazio",
        field: "postToken",
      });
    }

    Comments.destroy({
      where: { token: commentToken, postToken, userId: uID },
      include: {
        model: Posts,
      },
    })
      .then((post) => {
        if (post === 1) {
          Comments.findAll({
            where: { postToken },
            include: {
              model: Users,
              as: "user",
              attributes: ["name", "username", "avatar"],
            },
          })
            .then((allComments) => {
              return res.status(200).json({
                error: false,
                message: "Comentário apagado com sucesso!",
                comments: allComments,
              });
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Falha ao encontrar comentários: " + err,
              });
            });
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao apagar, comentário não encontrado",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao encontrar comentário: " + err,
        });
      });
  },

  async like(req, res) {
    const { token } = req.params;
    const uID = req.uID;

    if (!token || token == null || typeof token === undefined) {
      return res.status(400).json({
        error: true,
        message: "Token da publicação não pode ser vazio",
        field: "token",
      });
    }

    Users.findByPk(uID)
      .then((user) => {
        if (user) {
          let userLikes = user.likes;
          if (userLikes.some((list) => userLikes.includes(token))) {
            //REMOVE USER LIKE
            userLikes = userLikes.filter((postToken) => postToken !== token);
            user.update({
              likes: userLikes,
            });
            //REMOVE POST LIKE
            Posts.findOne({
              where: { token },
            })
              .then((post) => {
                if (post) {
                  let postLikes = post.likes - 1;

                  post.update({
                    likes: postLikes,
                  });

                  return res.status(200).json({
                    error: false,
                    message: "Curtida removida com sucesso!",
                    postLikes,
                    userLikes,
                  });
                } else {
                  return res.status(500).json({
                    error: true,
                    message: "Erro ao remover curtir da publicação!",
                  });
                }
              })
              .catch((err) => {
                return res.status(500).json({
                  error: true,
                  message: "Falha ao remover curtir da publicação: " + err,
                });
              });
          } else {
            //ADD USER LIKE
            userLikes =
              user.likes.length === 0 ? [token] : [...user.likes, token];
            user.update({
              likes: userLikes,
            });
            //ADD POST LIKE
            Posts.findOne({
              where: { token },
            })
              .then((post) => {
                if (post) {
                  let postLikes = post.likes + 1;

                  post.update({
                    likes: postLikes,
                  });

                  return res.status(200).json({
                    error: false,
                    message: "Publicação curtida com sucesso!",
                    postLikes,
                    userLikes,
                  });
                } else {
                  return res.status(500).json({
                    error: true,
                    message: "Erro ao curtir publicação!",
                  });
                }
              })
              .catch((err) => {
                return res.status(500).json({
                  error: true,
                  message: "Falha ao encontrar publicação: " + err,
                });
              });
          }
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao encontrar usuário!",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao encontrar usuário: " + err,
        });
      });
  },

  async getComments(req, res) {
    const { token } = req.params;

    if (!token || token == null || typeof token === undefined) {
      return res.status(400).json({
        error: true,
        message: "Token da publicação não pode ser vazio",
        field: "token",
      });
    }

    Posts.findOne({
      where: { token },
    })
      .then((post) => {
        if (post) {
          let postToken = post.token;

          Comments.findAll({
            where: { postToken },
            include: {
              model: Users,
              as: "user",
              attributes: ["name", "username", "avatar"],
            },
          })
            .then((comment) => {
              if (comment) {
                return res.status(200).json({
                  error: false,
                  message: "Comentários encontrados!",
                  comments: comment,
                });
              } else {
                return res.status(500).json({
                  error: true,
                  message: "Erro ao encontrar comentários",
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Falha ao encontrar comentários: " + err,
              });
            });
        } else {
          return res.status(500).json({
            error: true,
            message: "Erro ao encontrar publicação",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Falha ao encontrar publicação: " + err,
        });
      });
  },
};
