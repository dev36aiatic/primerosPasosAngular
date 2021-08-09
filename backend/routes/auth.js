//Importacion del Router para establecer las rutas
const {
    Router
} = require('express');

// Funcion de express-validator que me permite verificar si un campo cumple los requisitos que establezco
const {
    check
} = require('express-validator');

const router = Router();

const passport = require('passport');
//Controladores del usuario
const authController = require('../controllers/auth');

//Middleware para validar que los campos no tengan errores
const {
    validateFields
} = require('../middlewares/validate-fields');

//Middleware que valida si el jwt es valido
const {
    validateJWT
} = require('../middlewares/validate-jwt');


//Improtacion de las funciones que se ejecutan cuando se hace una peticion a las rutas
const {
    newUser,
    userLogin,
    renewToken,
    authGoogle,
    authFb
} = authController;

//Crear un nuevo usuario
router.post('/new', [
    check('name', 'The min number of characters for the name is 2 and cannot be empty.')
    .not().isEmpty().isLength({
        min: 2
    }),
    check('email', 'Email is required.').isEmail(),
    check('password', 'The min number of characters for the password is 6.').isLength({
        min: 6
    }),
    validateFields
], newUser);

//Registrar usuario con la informacion que me manda google o facebook

//Login de usuario
router.post('/login',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'The min number of characters for the password is 6.').isLength({
            min: 6
        }),
        validateFields
    ], userLogin);

//Validar token
router.get('/renew', validateJWT, renewToken);

//Validar Auth Google 
router.get('/validateToken', authGoogle);

//Validar auth fb

router.get('/auth/facebook/token',authFb);

//Exportacion del router
module.exports = router;