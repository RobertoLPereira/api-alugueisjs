module.exports = app => {
    const Naturezarelacionamento = app.db.models.naturezarelacionamento;

    app.route('/Naturezarelacionamento')
      .get((req, res) => {
        Naturezarelacionamento.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var naturezarelacionamento = {
          id: req.body.id,
          denominacao: req.body.denominacao,
          }
        //console.log(naturezarelacionamento)
        Naturezarelacionamento.create(naturezarelacionamento)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Naturezarelacionamento/:id')
      .get((req, res) => {
        var id = parseInt(req.params.id);
        Naturezarelacionamento.findOne({where:id})
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
      app.route('/naturezarelacionamentoM/:id')
      .get((req, res) => {
        var id = parseInt(req.params.id);
        Naturezarelacionamento.sequelize.query("select ai.* from naturezarelacionamento where a.id="+id)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var naturezarelacionamento = {
          id: req.body.id,
          denominacao: req.body.denominacao,
          }
        Naturezarelacionamento.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Naturezarelacionamento.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarNatureza/:id')
      .put((req, res) => {
        var comandoSql = "update naturezarelacionamento set status=2 where id="+parseInt(req.params.id);
        Naturezarelacionamento.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarNatureza/:id')
      .put((req, res) => {
        var comandoSql = "update naturezarelacionamento set status=1 where id="+parseInt(req.params.id);
        Naturezarelacionamento.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

  };