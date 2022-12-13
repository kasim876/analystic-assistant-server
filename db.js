const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize(process.env.DB_USER, process.env.DB_NAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const User = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  fullName: {type: DataTypes.STRING},
  isCompany: {type: DataTypes.BOOLEAN},
  company: {type: DataTypes.STRING, defaultValue: null}
})

module.exports = {db, User}