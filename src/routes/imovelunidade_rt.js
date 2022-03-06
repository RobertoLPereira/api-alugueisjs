module.exports = app => {
    const Imovelunidade = app.db.models.imovelunidade;

    app.route('/Imovelunidades')
      .get((req, res) => {
        //Imovelunidade.findAll({})
        var Sql = "select imu.*,im.descricao as nomeimovel,im.endereco,im.idproprietario,im.status as situacaoimovel,Coalesce(p.nome,'Não Alugado') as nome"+
        " from imovelunidade imu left join imovel im on im.idimovel = imu.idimovel"+
        " left join pessoas p on p.idpessoa = imu.idlocatario";
        Imovelunidade.sequelize.query(Sql)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var imovelunidade = {
          idunidade: req.body.idunidade,
          idimovel: req.body.idimovel,
          idlocatario: req.body.idlocatario,
          descricao: req.body.descricao,
          status: req.body.status,
          }
        //console.log(imovelunidade)
        Imovelunidade.create(imovelunidade)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .put((req, res) => {
		  var sqlcomando = "update imovelunidade set idimovel = "+ req.body.idimovel+",idlocatario="+
        req.body.idlocatario+",descricao='"+ req.body.descricao+"',status="+req.body.status+
        " where idunidade = "  + req.body.idunidade;
        Imovelunidade.sequelize.query(sqlcomando)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Imovelunidade/:idimovelunidade')
      .get((req, res) => {
        var idimovelunidade = parseInt(req.params.idimovelunidade);
        Imovelunidade.findOne({where:idimovelunidade})
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
      });
      app.route('/imovelunidadeM/:idimovelunidade')
      .get((req, res) => {
        var idimovelunidade = parseInt(req.params.idimovelunidade);
        Imovelunidade.sequelize.query("select ai.* from imovelunidade where a.idimovelunidade="+idimovelunidade)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })

      .delete((req, res) => {
        Imovelunidade.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });app.route('/DesativarUnidade/:idunidade')
      .put((req, res) => {
        var comandoSql = "update imovelunidade set status=2 where idunidade="+parseInt(req.params.idunidade);
        Imovelunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      app.route('/AtivarUnidade/:idunidade')
      .put((req, res) => {
        var comandoSql = "update imovelunidade set status=1 where idunidade="+parseInt(req.params.idunidade);
        Imovelunidade.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });


  };