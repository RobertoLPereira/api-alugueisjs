module.exports = app => {
  
    var data = new Date();

    app.route('/DataSistema')
      .get((req, res) => {
         var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;
        console.log(dataAtual);
        res.json({"dataAtual":dataAtual});
      })  
  };