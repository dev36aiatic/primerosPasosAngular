const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

//Controladores del usuario
const authController = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
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
router.post('/', 
[
    check('email','El email es obligatorio.').isEmail(),
    check('password','La cantidad minima de caracteres para la contraseña es 6').isLength({min:6}),
    validarCampos
] 
,loginUsuario);

//Validar token
router.get('/renew', renovarToken);

module.exports = router;