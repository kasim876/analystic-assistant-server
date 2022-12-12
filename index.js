// imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db');
const routes = require('./routes/index')

// api init
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const start = async () => {
  try {
    await db.authenticate()
    await db.sync()
    app.listen(process.env.PORT, () => console.log('Сервер запущен на порте ' + process.env.PORT))
  } catch (e) {
    console.log(e)
  }
}

start()
