module.exports = app => {
    const Taxaadministracao = app.db.models.taxaadministracao;

    app.route('/Taxaadministracao')
      .get((req, res) => {
        Taxaadministracao.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var taxaadministracao = {
          id: req.body.id,
          idfavorecido: req.body.idfavorecido,
          taxa: req.body.taxa,
          valor: req.body.valor,
          idcontrato: req.body.idcontrato,
          situacao: req.body.situacao,
          }
        //console.log(taxaadministracao)
        Taxaadministracao.create(taxaadministracao)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Taxaadministracao/:id')
      .get((req, res) => {
        var id = parseInt(req.params.id);
        Taxaadministracao.findOne({where:idtaxaadministracao})
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
      app.route('/taxaadministracaoM/:idtaxaadministracao')
      .get((req, res) => {
        var idtaxaadministracao = parseInt(req.params.idtaxaadministracao);
        Taxaadministracao.sequelize.query("select ai.* from taxaadministracao where a.idtaxaadministracao="+idtaxaadministracao)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var taxaadministracao = {
          id: req.body.id,
          idfavorecido: req.body.idfavorecido,
          taxa: req.body.taxa,
          valor: req.body.valor,
          idcontrato: req.body.idcontrato,
          situacao: req.body.situacao,
          }
        Taxaadministracao.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Taxaadministracao.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarTaxa/:idpagamento')
      .put((req, res) => {
        var comandoSql = "update taxaadministracao set status=2 where id="+parseInt(req.params.id);
        Taxaadministracao.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarTaxa/:idpagamento')
      .put((req, res) => {
        var comandoSql = "update taxaadministracao set status=1 where id="+parseInt(req.params.id);
        Taxaadministracao.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
  };