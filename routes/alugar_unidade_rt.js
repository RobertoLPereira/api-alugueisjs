module.exports = app => {
    const Pessoas = app.db.models.pessoas;
    const Imovel = app.db.models.imovel;
    const Imovelunidade = app.db.models.imovelunidade;
    const Contrato = app.db.models.contrato;
    
    app.route('/AlugarNovoInquilino')
      .post((req, res) => {
        //console.log(req)
        var pessoas = {
          nome: req.body.nome,
          telefone: req.body.telefone,
          proprietario: false,
          cadastradoem: req.body.cadastradoem,
          status: 3,
          url_avatar: req.body.url_avatar,
          email:req.body.email,
          }
          var contrato = {
            idunidadeimovel: req.body.idunidade,
            diavencimento: req.body.diavencimento,
            datacontrato: req.body.datacontrato,
            status: 1,
            validadecontrato: req.body.validadecontrato,
            valor: req.body.valor,
            }
        Pessoas.create(pessoas)
          .then(result => {
            const wimovel = "(select idimovel from imovelunidade where idunidade="+req.body.idunidade+")";
            var sqlcomando = "update imovelunidade set idimovel = "+ wimovel+",idlocatario="+
            result.idpessoa+",status="+req.body.status+" where idunidade = "  + req.body.idunidade;
            contrato.idlocatario = result.idpessoa;
            Imovelunidade.sequelize.query(sqlcomando)
              .then(result => { 
                const wlocador = "(select idproprietario from imovel where idimovel="+result.idimovel+")";
                var sql = "insert into contrato (idunidadeimovel,idlocador,idlocatario,diavencimento,datacontrato,";
                sql += "status,validadecontrato,valor)";
                sql += "values ("+result.idunidade+","+wlocador+","+contrato.idlocatario+","+contrato.diavencimento;
                sql += ","+contrato.datacontrato+","+contrato.status+","+contrato.validadecontrato+",";
                sql += contrato.valor+")";                
                Contrato.sequelize.query(sql)
                    .then(result => res.json(result[0]))
                    .catch(error => {
                        res.status(412).json({msg: error.message});
                    });
              })
              .catch(error => {
                res.status(412).json({msg: error.message});
              });
              //res.json(result)
        
            })
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