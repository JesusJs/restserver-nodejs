const { response } = require("express");
const { Producto } = require("../models");


//Obtener Productos en general
const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });

}

// Obtener productos por ID

const obtenerProductoPorId = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
}


const crearProducto = async(req, res = response) => {

        const { estado, usuario, ...body } = req.body;

        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if (productoDB) {
            return res.status(400).json({
                msg: `El producto ${ productoDB.nombre }, ya existe`
            });
        }

        // Generar la data a guardar - Esto es para guardar lo que yo quiero que se grabe en la DB

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const producto = new Producto(data); //Creamos una nueva instancia de categoria


        // Guardar DB - guardar en la base de datos

        await producto.save();

        res.status(200).json(producto);

    }
    //Actualizar Categoria

const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body; // Se esta desestructurando lo que no se quiere actualizar, los 3...data es donde lo vamos almacenar

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();

    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.json(productoBorrado);
}


module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    borrarProducto
}