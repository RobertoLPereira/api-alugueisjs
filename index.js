require("dotenv").config();
const path = require('path');
const express = require('express');
const consign = require('consign');
var bodyParser = require('body-parser');

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/portal_conteudo'))
// Routes
consign({cwd: __dirname})
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .then('controllers')
  .into(app);