module.exports = app => {
    const Centrocusto = app.db.models.centrocusto;

    app.route('/Centrocusto')
      .get((req, res) => {
        Centrocusto.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var centrocusto = {
          id: req.body.id,
          idtaxaadm: req.body.idtaxaadm,
          idpagamento: req.body.idpagamento,
          valor: req.body.valor,
          }
        //console.log(centrocusto)
        Centrocusto.create(centrocusto)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Centrocusto/:idcentrocusto')
      .get((req, res) => {
        var id = parseInt(req.params.id);
        Centrocusto.findOne({where:id})
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
      app.route('/centrocustoM/:id')
      .get((req, res) => {
        var id = parseInt(req.params.id);
        Centrocusto.sequelize.query("select ai.* from centrocusto where a.id="+id)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var centrocusto = {
          id: req.body.id,
          idtaxaadm: req.body.idtaxaadm,
          idpagamento: req.body.idpagamento,
          valor: req.body.valor,
          }
        Centrocusto.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Centrocusto.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });

  };