const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`Èl rol ${rol} no esta registrado en la base de datos`);
    }
}



// Verificar si el correo existe

const existeUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Este id ${id} ya existe en la BD`);
    };



}
const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Este correo ${correo} ya existe en la BD`);
    };



}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}