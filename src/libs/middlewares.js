const express = require('express');
const path = require('path');
//import bodyparse from 'body-parse';
//import multiparty from 'connect-multiparty';
module.exports = app => {

  // Settings
    app.set('view engine', 'ejs');
    app.set('views',path.join(__dirname),'../views');
  	app.set('port', process.env.PORT || 3051);
  	app.set('json spaces', 4);
  //	app.use(bodyParser.urlencoded({ extended:true}));
  //	app.use(bodyParser.json());
  //app.use(multiparty());

  // middlewares
  app.use(express.json());
  app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  });

};
