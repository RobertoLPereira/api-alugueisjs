require("dotenv").config();

const express = require('express');
const consign = require('consign');
var bodyParser = require('body-parser');

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
//app.set('views',__dirname,'/views');
// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .then('controllers')
  .into(app);