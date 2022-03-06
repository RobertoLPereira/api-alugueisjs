module.exports = app => {
    const Imovel = app.db.models.imovel;

    app.route('/Imovel')
      .get((req, res) => {
        Imovel.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var imovel = {
          idimovel: req.body.idimovel,
          descricao: req.body.descricao,
          endereco: req.body.endereco,
          idproprietario: req.body.idproprietario,
          status: req.body.status,
          idimovelcategoria: req.body.idimovelcategoria,
          }
        //console.log(imovel)
        Imovel.create(imovel)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var  comandoSql = "update imovel set descricao='"+req.body.descricao+"' ,endereco='"+
         req.body.endereco+"',idproprietario="+ req.body.idproprietario+ ",status= "+req.body.status +
         ",idimovelcategoria="+ req.body.idimovelcategoria+" where idimovel="+req.body.idimovel;

        Imovel.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })

    app.route('/Imovel/:idimovel')
      .get((req, res) => {
        var idimovel = parseInt(req.params.idimovel);
        Imovel.findOne({where:idimovel})
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
      app.route('/imovelM/:idimovel')
      .get((req, res) => {
        var idimovel = parseInt(req.params.idimovel);
        Imovel.sequelize.query("select ai.* from imovel where a.idimovel="+idimovel)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Imovel.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarImovel/:idimovel')
      .put((req, res) => {
        var comandoSql = "update imovel set status=2 where idimovel="+parseInt(req.params.idimovel);
        Imovel.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarImovel/:idimovel')
      .put((req, res) => {
        var comandoSql = "update imovel set status=1 where idimovel="+parseInt(req.params.idimovel);
        Imovel.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

  };