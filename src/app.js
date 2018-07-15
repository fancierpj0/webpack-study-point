const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan);
app.get('/api/users',function(req,res){
  res.send(req.url);
});

app.listen(3000);
