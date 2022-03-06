//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da leituraluzunidadeela está correto
	 
	 module.exports = app => {
    const Leituraluzunidade = app.db.models.leituraluzunidade;

    app.route('/Leituraluzunidade')
      .get((req, res) => {
        Leituraluzunidade.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var leituraluzunidade = {
          idleituraluzunidade: req.body.idleituraluzunidade,
          idunidadeimovel: req.body.idunidadeimovel,
          leituraanterior: req.body.leituraanterior,
          leituraatual: req.body.leituraatual,
          codigomedidor: req.body.codigomedidor,
          dataleitura: req.body.dataleitura,
          status: req.body.status,
          valor: req.body.valor,
          }
        //console.log(leituraluzunidade)
        Leituraluzunidade.create(leituraluzunidade)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
           var leituraluzunidade = "update leituraluzunidade set  idunidadeimovel="+ req.body.idunidadeimovel+
         ",leituraanterior="+ req.body.leituraanterior+",leituraatual="+ req.body.leituraatual+
         ",codigomedidor='"+ req.body.codigomedidor+"',dataleitura='"+ req.body.dataleitura+"', status="+
         req.body.status+",valor="+ req.body.valor+" where  idleituraluzunidade=" +req.body.idleituraluzunidade;
        Leituraluzunidade.sequelize.query(leituraluzunidade)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Leituraluzunidade/:idleituraluzunidade')
      .get((req, res) => {
        var idleituraluzunidade = parseInt(req.params.idleituraluzunidade);
        Leituraluzunidade.findOne({where:idleituraluzunidade})
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
      app.route('/leituraluzunidadeM/:idleituraluzunidade')
      .get((req, res) => {
        var idleituraluzunidade = parseInt(req.params.idleituraluzunidade);
        Leituraluzunidade.sequelize.query("select ai.* from leituraluzunidade where a.idleituraluzunidade="+idleituraluzunidade)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Leituraluzunidade.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
      app.route('/DesativarLeituraluz/:idleituraluzunidade')
      .put((req, res) => {
        var comandoSql = "update leituraluzunidade set status=2 where idleituraluzunidade="+parseInt(req.params.idleituraluzunidade);
        Leituraluzunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarLeituraluz/:idleituraluzunidade')
      .put((req, res) => {
        var comandoSql = "update leituraluzunidade set status=1 where idleituraluzunidade="+parseInt(req.params.idleituraluzunidade);
        Leituraluzunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

  };