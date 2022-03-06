module.exports = app => {
    const Pagamentos = app.db.models.pagamentos;

    app.route('/Pagamentos')
      .get((req, res) => {
        Pagamentos.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var pagamentos = {
          //idpagamento: req.body.idpagamento,
          datapagamento: req.body.datapagamento,
          valorpago: req.body.valorpago,
          juros: req.body.juros,
          desconto: req.body.desconto,
          idcontrato: req.body.idcontrato,
          }
        //console.log(pagamentos)
        Pagamentos.create(pagamentos)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Pagamentos/:idpagamentos')
      .get((req, res) => {
        var idpagamentos = parseInt(req.params.idpagamentos);
        Pagamentos.findOne({where:idpagamentos})
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
      app.route('/pagamentosM/:idpagamentos')
      .get((req, res) => {
        var idpagamentos = parseInt(req.params.idpagamentos);
        Pagamentos.sequelize.query("select ai.* from pagamentos where a.idpagamentos="+idpagamentos)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var pagamentos = {
          idpagamento: req.body.idpagamento,
          datapagamento: req.body.datapagamento,
          valorpago: req.body.valorpago,
          juros: req.body.juros,
          desconto: req.body.desconto,
          idcontrato: req.body.idcontrato,
          }
        Pagamentos.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Pagamentos.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarPagamento/:idpagamento')
      .put((req, res) => {
        var comandoSql = "update pagamentos set status=2 where ididpagamento="+parseInt(req.params.idpagamento);
        Pagamentos.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarPagamento/:idpagamento')
      .put((req, res) => {
        var comandoSql = "update pagamentos set status=1 where ididpagamento="+parseInt(req.params.idpagamento);
        Pagamentos.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };