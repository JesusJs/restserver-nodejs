const express = require('express');
const cors = require('cors');
const router = require('../routes/usuarios');
const { dbConnection } = require('../database/config');

const fileUpload = require('express-fileUpload');

class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
                usuarios: '/api/usuarios',
                buscar: '/api/buscar',
                categorias: '/api/categorias',
                productos: '/api/productos',
                auth: '/api/auth',
                uploads: '/api/uploads',

            }
            // Esta eran las rutas antiguas, cambiadas y mejoradas por la de arriba
            // this.usuariosPath = '/api/usuarios';
            // this.authPath = '/api/auth';




        // Conectar a base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }


    async conectarDB() {

        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json()); // de esta manera cualquier objeto que venga lo va intentar
        // serializar a un formato json


        // Directorio pubíco
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));


    }


    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port)
        });
    }



}

module.exports = Server;