const express = require("express");
const path = require('path');
const routersEventos = require('./routers/routers_eventos.js');
const { obtenerEventosJson, obtenerEventoJson } = require('./models/models_eventos.js');
const fs = require('fs');
const app = express();

const port = 4001;
const rootPath = __dirname;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, '../public/images'))); //viejo
app.use('/images', express.static(path.join(__dirname, '../src/assets/images'))); //rn
app.use(express.urlencoded({ extended: true }));

app.use("/", routersEventos);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

/* app.get("api/eventos/:id_evento", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/evento.html"))
}); */

app.listen(port, () => {
  console.log("UP");
});

