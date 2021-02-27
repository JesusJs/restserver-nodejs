const { Router } = require("express");
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, categoriaDelete, obtenerCategoria, Actualizarcategoria } = require("../controllers/categorias");
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators')




const router = Router();

// {{url}}/api/categorias


// obtener todas las categorias - publico
router.get('/', obtenerCategorias);


// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);


// Crear categoria - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


// Actualizar - privado - cualquiera con token valido 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], Actualizarcategoria);



// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

], categoriaDelete);




module.exports = router;