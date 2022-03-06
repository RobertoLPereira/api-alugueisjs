module.exports = app => {
    const Vinculos = app.db.models.vinculos;

    app.route('/Vinculos')
      .get((req, res) => {
        Vinculos.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var vinculos = {
          idvinculo: req.body.idvinculo,
          idnaturezarelac: req.body.idnaturezarelac,
          idpessoa: req.body.idpessoa,
          inicio: req.body.inicio,
          fim: req.body.fim,
          idimovel: req.body.idimovel,
          }
        //console.log(vinculos)
        Vinculos.create(vinculos)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Vinculos/:idvinculos')
      .get((req, res) => {
        var idvinculos = parseInt(req.params.idvinculos);
        Vinculos.findOne({where:idvinculos})
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
      app.route('/vinculosM/:idvinculos')
      .get((req, res) => {
        var idvinculos = parseInt(req.params.idvinculos);
        Vinculos.sequelize.query("select ai.* from vinculos where a.idvinculos="+idvinculos)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var vinculos = {
          idvinculo: req.body.idvinculo,
          idnaturezarelac: req.body.idnaturezarelac,
          idpessoa: req.body.idpessoa,
          inicio: req.body.inicio,
          fim: req.body.fim,
          idimovel: req.body.idimovel,
          }
        Vinculos.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Vinculos.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarVinculo/:idvinculo')
      .put((req, res) => {
        var comandoSql = "update vinculos set status=2 where idvinculo="+parseInt(req.params.idvinculo);
        Vinculos.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarVinculo/:idvinculo')
      .put((req, res) => {
        var comandoSql = "update vinculos set status=1 where idvinculo="+parseInt(req.params.idvinculo);
        Vinculos.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };