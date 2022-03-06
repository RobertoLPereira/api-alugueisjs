//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da leituraaguaunidadeela está correto

	 module.exports = app => {
    const Leituraaguaunidade = app.db.models.leituraaguaunidade;
    const Faixadeconsumo = app.db.models.faixadeconsumo;

    app.route('/Leituraaguaunidade')
      .get((req, res) => {
        Leituraaguaunidade.findAll({})
          .then(result => {res.json(result)})
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        var vlr = (req.body.leituraatual - req.body.leituraanterior);       
        var calculo = "select (("+vlr+"*tarifaagua)+(tarifaesgoto*2)*(tfdi)) as valor from faixadeconsumo where "+vlr+" between faixainicial and faixafinal";
        var leituraaguaunidade = {
            idleituraaguaunidade: req.body.idleituraaguaunidade,
            idunidadeimovel: req.body.idunidadeimovel,
            leituraanterior: req.body.leituraanterior,
            leituraatual: req.body.leituraatual,
            codigomedidor: req.body.codigomedidor,
            dataleitura: req.body.dataleitura,
            status: req.body.status,
            valor: req.body.valor,
        }
        Faixadeconsumo.sequelize.query(calculo)
        .then(result => {
            var valor =result[0];
            leituraaguaunidade.valor = valor[0].valor;
            Leituraaguaunidade.create(leituraaguaunidade)
            .then(result => res.json(result))
            ;
          })
        .catch(error => {
              res.status(412).json({msg: error.message});
        });
      })
      .put((req, res) => {
        var vlr = (req.body.leituraatual - req.body.leituraanterior);       
        var calculo = "select (("+vlr+"*tarifaagua)+(tarifaesgoto*2)*(tfdi)) as valor from faixadeconsumo where "+vlr+" between faixainicial and faixafinal";              
        Faixadeconsumo.sequelize.query(calculo)
        .then(result => {
            var valor =result[0];
             var leituraaguaunidade = "update leituraaguaunidade set  idunidadeimovel="+ req.body.idunidadeimovel+
             ",leituraanterior="+ req.body.leituraanterior+",leituraatual="+ req.body.leituraatual+
             ",codigomedidor='"+ req.body.codigomedidor+"',dataleitura='"+ req.body.dataleitura+"', status="+
             req.body.status+"valor="+valor+" where  idleituraaguaunidade=" +req.body.idleituraaguaunidade;            
            Leituraaguaunidade.sequelize.query(leituraaguaunidade)
            .then(result =>  res.sendStatus(204))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
          })
        .catch(error => {
              res.status(412).json({msg: error.message});
            });
      });
          

    app.route('/Leituraaguaunidade/:idleituraaguaunidade')
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
      app.route('/leituraaguaunidadeM/:idleituraaguaunidade')
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
      app.route('/DesativarLeituraagua/:idleituraaguaunidade')
      .put((req, res) => {
        var comandoSql = "update leituraaguaunidade set status=2 where idleituraaguaunidade="+parseInt(req.params.idleituraaguaunidade);
        Leituraaguaunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarLeituraagua/:idleituraaguaunidade')
      .put((req, res) => {
        var comandoSql = "update leituraaguaunidade set status=1 where idleituraaguaunidade="+parseInt(req.params.idleituraaguaunidade);
        Leituraaguaunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });


  };