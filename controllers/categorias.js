const { response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre') // Este es para convertir el usuario que esta como encriptado a normal y decirle que me traiga el nombre
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json([
        total,
        categorias
    ]);
}


const obtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria);
}


const crearCategoria = async(req, res = response) => {


    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar -  Esto es para guardar lo que yo quiero que se grabe en la data

    const data = {
        nombre,
        usuario: req.usuario._id // el uid o _id normalmente viene como "_id" en mongoDB y nosotros la podemos cambiar a uid
    }

    const categoria = new Categoria(data); //Creamos una nueva instancia de categoria


    // Guardar DB - guardar en base de datos

    await categoria.save();

    res.status(201).json(categoria);

}


//Actualizar Categoria

const Actualizarcategoria = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body; // Se esta desestructurando lo que no se quiere actualizar, los 3...data es donde lo vamos almacenar

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}

const categoriaDelete = async(req, res = response) => {
    const { id } = req.params;


    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(categoriaBorrada);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    Actualizarcategoria,
    categoriaDelete
}