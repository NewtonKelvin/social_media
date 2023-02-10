const db = require('./database');

//Bcrypt
const bcrypt = require('bcrypt');

const Users = db.sequelize.define('users', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: true,
    default: false
  },
  passwordResetToken: {
    type: db.Sequelize.STRING,
    allowNull: true,
    default: false
  },
  passwordResetTokenExpire: {
    type: 'TIMESTAMP',
    allowNull: true,
    default: false
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  avatar: {
    type: db.Sequelize.STRING,
    allowNull: true,
    default: 'avatar/default.jpg'
  },
  cover: {
    type: db.Sequelize.STRING,
    allowNull: true,
    default: 'cover/default.jpg'
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    defaultValue: ''
  },
  bio: {
    type: db.Sequelize.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  notifications: {
    type: db.Sequelize.STRING,
    defaultValue: '[]',
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue('notifications'));
    },
    set: function (value) {
      this.setDataValue('notifications', JSON.stringify(value));
    }
  },
  likes: {
    type: db.Sequelize.STRING,
    defaultValue: '[]',
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue('likes'));
    },
    set: function (value) {
      this.setDataValue('likes', JSON.stringify(value));
    }
  },
  shares: {
    type: db.Sequelize.STRING,
    defaultValue: '[]',
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue('shares'));
    },
    set: function (value) {
      this.setDataValue('shares', JSON.stringify(value));
    }
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    default: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    default: false
  }
})

Users.beforeSave(async (user, options) => {
  if (options.fields.includes("password") && user.password !== null) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  }
});

module.exports = Users

Users.sync({ force: false })
