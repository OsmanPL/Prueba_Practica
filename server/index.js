const clienteRouter = require('./routes/clienteRoutes.route')
const obtenerRouter = require('./routes/obtenerRoutes.route')
require('dotenv').config()
var express = require('express');
const bodyParser = require('body-parser');

var app = express();
const cors = require('cors')
const port = process.env.PORT

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use("/clientes", clienteRouter)
app.use("/obtener", obtenerRouter)

app.listen(port, function () {
    console.log('Listening on port',port);
  });

