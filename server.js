let express = require('express');
let mongoose = require('mongoose');
require('./course');


let app = express();

mongoose.connect('mongodb://localhost/test')
    .then(() => {
        console.log("¡Conexión exitosa a la base de datos!");

    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
    });

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.listen(8080, () => console.log("Server started in the port 8080!"));