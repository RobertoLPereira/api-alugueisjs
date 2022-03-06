module.exports = app => {
    const Contrato = app.db.models.contrato;

    app.route('/Contrato')
      .get((req, res) => {
        Contrato.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var contrato = {
          idcontrato: req.body.idcontrato,
          idunidadeimovel: req.body.idunidadeimovel,
          idlocador: req.body.idlocador,
          idlocatario: req.body.idlocatario,
          diavencimento: req.body.diavencimento,
          datacontrato: req.body.datacontrato,
          status: req.body.status,
          validadecontrato: req.body.validadecontrato,
          valor: req.body.valor,
          }
        //console.log(contrato)
        Contrato.create(contrato)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Contrato/:idcontrato')
      .get((req, res) => {
        var idcontrato = parseInt(req.params.idcontrato);
        Contrato.findOne({where:idcontrato})
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
      app.route('/contratoM/:idcontrato')
      .get((req, res) => {
        var idcontrato = parseInt(req.params.idcontrato);
        Contrato.sequelize.query("select ai.* from contrato where a.idcontrato="+idcontrato)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var contrato = {
          idcontrato: req.body.idcontrato,
          idunidadeimovel: req.body.idunidadeimovel,
          idlocador: req.body.idlocador,
          idlocatario: req.body.idlocatario,
          diavencimento: req.body.diavencimento,
          datacontrato: req.body.datacontrato,
          status: req.body.status,
          validadecontrato: req.body.validadecontrato,
          valor: req.body.valor,
          }
        Contrato.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Contrato.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarContrato/:idcontrato')
      .put((req, res) => {
        var comandoSql = "update contrato set status=2 where idcontrato="+parseInt(req.params.idcontrato);
        Contrato.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarContrato/:idcontrato')
      .put((req, res) => {
        var comandoSql = "update contrato set status=1 where idcontrato="+parseInt(req.params.idcontrato);
        Contrato.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

  };