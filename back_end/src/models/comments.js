const db = require("./database");
const Posts = require("./posts");
const Users = require("./users");

const Comments = db.sequelize.define("comments", {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  postToken: {
    type: db.Sequelize.STRING,
    allowNull: false,
    references: {
      model: Posts,
      key: "token",
    },
  },
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
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

Comments.belongsTo(Users, {
  foreignKey: "userId",
});

module.exports = Comments;

Comments.sync({ force: false });
