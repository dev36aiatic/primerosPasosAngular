//Importacion del Router para establecer las rutas
import { Router } from 'express';
import { check } from 'express-validator';

import { authController } from '../controllers/auth.mjs';
import { MiddleWares } from '../middlewares/validate-fields.mjs';
import { validateJWT } from '../middlewares/validate-jwt.mjs';

/**Router de la app */
const router = Router();

const {
    newUser,
    userLogin,
    renewToken,
    authGoogle,
    authFb,
    updateProfile,
    findUser
} = authController;


/**
 * Peticion post para crear un nuevo usuario
 */
router.post('/new', [
    check('name', 'The min number of characters for the name is 2 and cannot be empty.')
    .not().isEmpty().isLength({
        min: 2
    }),
    check('email', 'Email is required.').isEmail(),
    check('password', 'The min number of characters for the password is 6.').isLength({
        min: 6
    }),
    MiddleWares.validateFields
], newUser);


/**
 * Peticion post para iniciar sesion
 */
router.post('/login',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'The min number of characters for the password is 6.').isLength({
            min: 6
        }),
        MiddleWares.validateFields
    ], userLogin);


/** Peticion para actualizar información del usuario */
router.put('/update/:id/:provider?',updateProfile)

/** Peticion para conseguir información del usuario */
router.get('/user/:id/:provider?',findUser)

/**Peticion get para renovar el token */
router.get('/renew', validateJWT, renewToken);

/**Peticion get Validar autenticacion de google */
router.get('/validateToken', authGoogle);

/**Peticion get para validar la autenticacion de facebook */
router.get('/auth/facebook/token',authFb);

//Exportacion del router

export { router as routes };