const express = require('express');
const cors = require('cors');
const router = require('../routes/usuarios');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json()); // de esta manera cualquier objeto que venga lo va intentar
        // serializar a un formato json


        // Directorio pubíco
        this.app.use(express.static('public'));


    }


    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port)
        });
    }



}

module.exports = Server;