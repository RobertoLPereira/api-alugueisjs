module.exports = app => {

  app.db.sequelize.sync().done(() => {
    app.listen(app.get('port'), () => {
      console.log('Server on porta', app.get('port'));
    });
  });

};