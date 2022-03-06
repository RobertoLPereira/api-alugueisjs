module.exports = app => {
    const Pessoas = app.db.models.pessoas;
    app.route('/Pessoas')
      .get((req, res) => {
        Pessoas.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var pessoas = {
          idpessoa: req.body.idpessoa,
          nome: req.body.nome,
          telefone: req.body.telefone,
          proprietario: req.body.proprietario,
          cadastradoem: req.body.cadastradoem,
          status: req.body.status,
          url_avatar: req.body.url_avatar,
          email:req.body.email,
          }
        //console.log(pessoas)
        Pessoas.create(pessoas)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
        var comandoSql = "update pessoas set nome='"+req.body.nome+"',telefone='"+req.body.telefone; 
        comandoSql+= "',email='"+req.body.email+"',url_avatar='"+req.body.url_avatar;
        comandoSql+= "' where idpessoa="+req.body.idpessoa;
        Pessoas.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Pessoas/:idpessoas')
      .get((req, res) => {
        var idpessoas = parseInt(req.params.idpessoas);
        Pessoas.findOne({where:idpessoas})
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
      app.route('/pessoasM/:idpessoa')
      .get((req, res) => {
        var idpessoa = parseInt(req.params.idpessoa);
        Pessoas.sequelize.query("select ai.* from pessoas ai where ai.idpessoa="+idpessoa)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Pessoas.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarPessoa/:idpessoa')
      .put((req, res) => {
        var comandoSql = "update pessoas set status=2 where idpessoa="+parseInt(req.params.idpessoa);
        Pessoas.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarPessoa/:idpessoa')
      .put((req, res) => {
        var comandoSql = "update pessoas set status=1 where idpessoa="+parseInt(req.params.idpessoa);
        Pessoas.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
       app.route('/ValidarLogin/:telefone')
      .get((req, res) => {
        var comandoSql = "select * from pessoas where telefone='"+req.params.telefone+"'";
        Pessoas.sequelize.query(comandoSql)
          .then(result => {
            console.log(result[0].length);
            console.log(result[0]);
            if (result[0].length > 0) {
              res.sendStatus(204);
            } else  {
              res.sendStatus(412);
            }
          })
          .catch(error => {
            res.status(405).json({msg: error.message});
          });
      });

  };