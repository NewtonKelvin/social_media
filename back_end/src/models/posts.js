const db = require("./database");
const Users = require("./users");
const Comments = require("./comments");

const Posts = db.sequelize.define("posts", {
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
  userId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
  description: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  privacity: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  files: {
    type: db.Sequelize.STRING,
    defaultValue: "[]",
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue("files"));
    },
    set: function (value) {
      this.setDataValue("files", JSON.stringify(value));
    },
  },
  likes: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  /*comments: {
    type: db.Sequelize.TEXT('long'),
    defaultValue: '[]',
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue('comments'));
    },
    set: function (value) {
      this.setDataValue('comments', JSON.stringify(value));
    }
  },*/
  shares: {
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

Posts.hasMany(Comments, {
  foreignKey: "token",
});

Posts.belongsTo(Users);

module.exports = Posts;

Posts.sync({ force: false });
