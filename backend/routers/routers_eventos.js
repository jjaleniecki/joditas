const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const {obtenerEventosJson, obtenerEventoJson,cargarEventoParticular,cargarEventosPorCat} = require('../models/models_eventos.js');
const cookieParser = require('cookie-parser');

const fs = require("fs");
const path = require("path");

router.use(express.json());
router.use(cookieParser());

/*router.get("/", (req, res) => {
    objJson = obtenerEventosJson();
    //const data = objJson.eventos.map(obj => obj.img)
    res.json(objJson);
});*/

router.get("/", async (req, res) => {
    //es.sendFile(path.join(__dirname, '../../public/views', 'index.html'));
    const eventos = obtenerEventosJson();
    const html = await fs.promises.readFile(path.join(__dirname, '../../public/views', 'index.html'), 'utf8');
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const contenedorCachengue = doc.getElementById('eventos-cachengue');
    const contenedorTecno = doc.getElementById('eventos-tecno');
    const contenedorRkt = doc.getElementById('eventos-rkt');

    cantEventosPorCat = 5;

    cargarEventosPorCat(contenedorTecno, eventos.filter(evento => evento.categoria === 'tecno'), cantEventosPorCat);
    cargarEventosPorCat(contenedorRkt, eventos.filter(evento => evento.categoria === 'rkt'),cantEventosPorCat);
    cargarEventosPorCat(contenedorCachengue, eventos.filter(evento => evento.categoria === 'cachengue'), cantEventosPorCat);


    
    res.send(dom.serialize());
});

router.get("/eventos", async (req, res) => {
    const eventos = obtenerEventosJson();
    res.json(eventos);
});


router.get("/index.html", async (req, res) => {
    //es.sendFile(path.join(__dirname, '../../public/views', 'index.html'));
    const eventos = obtenerEventosJson();
    const html = await fs.promises.readFile(path.join(__dirname, '../../public/views', 'index.html'), 'utf8');
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const contenedorCachengue = doc.getElementById('eventos-cachengue');
    const contenedorTecno = doc.getElementById('eventos-tecno');
    const contenedorRkt = doc.getElementById('eventos-rkt');

    cantEventosPorCat = 5;

    cargarEventosPorCat(contenedorTecno, eventos.filter(evento => evento.categoria === 'tecno'), cantEventosPorCat);
    cargarEventosPorCat(contenedorRkt, eventos.filter(evento => evento.categoria === 'rkt'),cantEventosPorCat);
    cargarEventosPorCat(contenedorCachengue, eventos.filter(evento => evento.categoria === 'cachengue'), cantEventosPorCat);


    
    res.send(dom.serialize());
});

router.get("/evento.html", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'evento.html'));
});

router.get("/eventos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const evento = obtenerEventoJson(id);

    const html = await fs.promises.readFile(path.join(__dirname, '../../public/views', 'evento.html'), 'utf8');

    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    cargarEventoParticular(doc.getElementById('infoevento'), evento);

    res.send(dom.serialize());

});


router.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'login.html'));
});

const JWT_SECRET = "clave_muy_secreta!!";  

router.post("/login.html", (req, res) =>{
    const{email, pass} = req.body;
    console.log("Email: " + email);
    console.log("Password: " + pass);

    if(email != "jere" || pass != "1234"){
        return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const payload = {
        email,
        role: "admin"
    };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h"  // token validity
    });

    res.cookie('token', token, {httpOnly: true});

    return res.json({ token });
})

router.get('/admin.html', auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'admin.html'));
});

function auth(req, res, next) {
    //const header = req.headers.authorization;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Acceso denegado" });
    }
    //const token = header.split(" ")[1]; // "Bearer <token>"

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(403).json({ error: "Token invalido o expirado" });
    }
}

module.exports = auth;
module.exports = router;