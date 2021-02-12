const { response, request } = require('express'); // Esta importacion de desestructuracion es por que 
// con este metodo que vamos a crear llamando a response vamos a poder utilizar
// la funcion res.json normalmente, ya que sino importamos este archivo no nos deja.

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {


    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}
const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controlador'
    });
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}