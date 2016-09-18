var express = require('express');
var app = express();

app.use(express.static('F:/Environment/node/workspace/ng-owm-graph'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');