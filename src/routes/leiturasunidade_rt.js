//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da leituraaguaunidadeela está correto

	 module.exports = app => {
    const Leituraaguaunidade = app.db.models.leituraaguaunidade;
    const Leituraluzunidade = app.db.models.leituraluzunidade;
    const Faixadeconsumo = app.db.models.faixadeconsumo;

    app.route('/LeiturasUnidade')
      .get((req, res) => {
        Leituraaguaunidade.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var leituraaguaunidade = {
          idleituraaguaunidade: req.body.idleituraaguaunidade,
          idunidadeimovel: req.body.idunidadeimovel,
          agualeituraanterior: req.body.agualeituraanterior,
          agualeituraatual: req.body.agualeituraatual,
          aguacodigomedidor: req.body.aguacodigomedidor,
          idleituraluzunidade: req.body.idleituraluzunidade,
          luzleituraanterior: req.body.luzleituraanterior,
          luzleituraatual: req.body.luzleituraatual,
          luzcodigomedidor: req.body.luzcodigomedidor,
          dataleitura: req.body.dataleitura,
          status: req.body.status,
                    }
        //Busca a faixa de consumo
        Faixadeconsumo.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
        //console.log(leituraaguaunidade)
        Leituraaguaunidade.create(leituraaguaunidade)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
         var leituraaguaunidade = "update leituraaguaunidade set  idunidadeimovel="+ req.body.idunidadeimovel+
         ",leituraanterior="+ req.body.agualeituraanterior+",leituraatual="+ req.body.agualeituraatual+
         ",codigomedidor='"+ req.body.aguacodigomedidor+"',dataleitura='"+ req.body.dataleitura+"', status="+
         req.body.status+" where  idleituraaguaunidade=" +req.body.idleituraaguaunidade;

        Leituraaguaunidade.sequelize.query(leituraaguaunidade)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/LeiturasUnidade/:idleituraaguaunidade')
      .get((req, res) => {
        var idleituraaguaunidade = parseInt(req.params.idleituraaguaunidade);
        Leituraaguaunidade.findOne({where:idleituraaguaunidade})
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
      app.route('/LeiturasUnidadeM/:idleituraaguaunidade')
      .get((req, res) => {
        var idleituraaguaunidade = parseInt(req.params.idleituraaguaunidade);
        Leituraaguaunidade.sequelize.query("select ai.* from leituraaguaunidade where a.idleituraaguaunidade="+idleituraaguaunidade)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })

      .delete((req, res) => {
        Leituraaguaunidade.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });
     
  };