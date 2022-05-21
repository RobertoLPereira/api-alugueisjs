module.exports = app => {
  
    var data = new Date();

    app.route('/DataSistema')
      .get((req, res) => {
         var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        if (dia.length < 2) dia = "0" + dia;
        if (mes.length < 2) mes = "0" + mes;
        if (ano.length < 4) ano = "19" + ano;
        var dataAtual = dia + '/' + mes + '/' + ano;
        //console.log(dataAtual);
        res.json({"dataAtual":dataAtual});
      })  
  };