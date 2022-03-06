//Faça um replace na instrucao select das aspas duplas que estao em duplicidade
	 // confere se o nome do campo primary key da contactela está correto
	 
	 module.exports = app => {
    const Contact = app.db.models.contact;

    app.route('/Contact')
      .get((req, res) => {
        Contact.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .post((req, res) => {
        //console.log(req)
        var contact = {
          id: req.body.id,
          nome: req.body.nome,
          telefone: req.body.telefone,
          email: req.body.email,
          url_avatar: req.body.url_avatar,
          proprietario: req.body.proprietario,
          cadastradoem: req.body.cadastradoem,
          status: req.body.status,
          }
        //console.log(contact)
        Contact.create(contact)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      }).put((req, res) => {
         var contact = {
          id: req.body.id,
          nome: req.body.nome,
          telefone: req.body.telefone,
          email: req.body.email,
          url_avatar: req.body.url_avatar,
          proprietario: req.body.proprietario,
          cadastradoem: req.body.cadastradoem,
          status: req.body.status,
          }
          var comandoSql = "update contact set nome='"+req.body.nome+"',telefone='"+req.body.telefone; 
          comandoSql+= "',email='"+req.body.email+"',url_avatar='"+req.body.url_avatar;
          comandoSql+= "' where id="+req.body.id;
          Contact.sequelize.query(comandoSql)
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });

    app.route('/Contact/:idcontact')
      .get((req, res) => {
        var id = parseInt(req.params.idcontact);
        Contact.findOne({where:id})
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
      app.route('/Contact/:idcontact')
      .get((req, res) => {
        var idcontact = parseInt(req.params.idcontact);
        Contact.sequelize.query("select ai.* from contact where a.id="+idcontact)
          .then(result => res.json(result[0]))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      .delete((req, res) => {
        Contact.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(204).json({msg: error.message});
          });
      });

  };