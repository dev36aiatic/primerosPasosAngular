//Importacion del Router para establecer las rutas
const { Router } = require('express');

// Funcion de express-validator que me permite verificar si un campo cumple los requisitos que establezco
const { check } = require('express-validator');

const router = Router();

//Controladores del usuario
const authController = require('../controllers/auth');

//Middleware para validar que los campos no tengan errores
const { validarCampos } = require('../middlewares/validar-campos');

//Middleware que valida si el jwt es valido
const { validarJWT } = require('../middlewares/validar-jwt');

//Improtacion de las funciones que se ejecutan cuando se hace una peticion a las rutas
const { crearUsuario, loginUsuario, renovarToken } = authController;

//Crear un nuevo usuario
router.post('/new', [
    check('name','La cantidad minima de caracteres para el nombre es 2 y no puede ser vacio')
    .not().isEmpty().isLength({min:2}),
    check('email','El email es obligatorio').isEmail(),
    check('password','La cantidad minima de caracteres para la contraseña es 6').isLength({min:6}),
    validarCampos
    ],crearUsuario );

//Login de usuario
router.post('/login', 
[
    check('email','El email es obligatorio.').isEmail(),
    check('password','La cantidad minima de caracteres para la contraseña es 6').isLength({min:6}),
    validarCampos
] 
,loginUsuario);

//Validar token
router.get('/renew', validarJWT, renovarToken);

//Exportacion del router
module.exports = router;