module.exports = app => {
    const Status = app.db.models.status;

    app.route('/Status')
      .get((req, res) => {
        Status.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var status = {
          idstatus: req.body.idstatus,
          denominacao: req.body.denominacao,
          }
        //console.log(status)
        Status.create(status)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      }).put((req, res) => {
        var status = {
         idstatus: req.body.idstatus,
         denominacao: req.body.denominacao,
         }
         Status.sequelize.query("Update status set denominacao = '"+req.body.denominacao+"' where idstatus="+req.body.idstatus)

         .then(result => res.sendStatus(204))
         .catch(error => {
           res.status(412).json({msg: error.message});
         });
     });

    app.route('/Status/:idstatus')
      .get((req, res) => {
        var idstatus = parseInt(req.params.idstatus);
        Status.findOne({where:idstatus})
          .then(result => {
            if (result) {
              res.json(result);
            } else {
              res.sendStatus(404);
            }
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      app.route('/statusM/:idstatus')
      .get((req, res) => {
        var idstatus = parseInt(req.params.idstatus);
        Status.sequelize.query("select ai.* from status where a.idstatus="+idstatus)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var status = {
          idstatus: req.body.idstatus,
          denominacao: req.body.denominacao,
          }
          Status.sequelize.query("Update status set denominacao = '"+req.body.denominacao+"' where idstatus="+req.body.idstatus)

          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Status.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });

  };