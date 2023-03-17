const db = require("./database");
const Posts = require("./posts");
const Users = require("./users");

const Comments = db.sequelize.define("comments", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  token: {
    type: db.Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  postToken: {
    type: db.Sequelize.STRING,
    allowNull: false,
    foreignKey: true,
    references: {
      model: Posts,
      key: "token",
    },
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true,
    references: {
      model: Users,
      key: "id",
    },
  },
  value: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  likes: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
    default: false,
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
    default: false,
  },
});

Comments.belongsTo(Users);

module.exports = Comments;

Comments.sync({ force: false });
