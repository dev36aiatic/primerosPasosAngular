import { Router } from "express";
import AuthController from '../controller/AuthController';
import { check } from 'express-validator';

import MiddleWares from '../middlewares/validate-fields';
import validateJWT from '../Middlewares/validate-jwt';

/**Se establece el router de express */
const router = Router();

/**
 * Peticion HTTP para crear un nuevo usuario
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
], AuthController.newUser);

/**
 * Peticion HTTP para iniciar sesion
 */
router.post('/login',
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'The min number of characters for the password is 6.').isLength({
            min: 6
        }),
        MiddleWares.validateFields
    ], AuthController.userLogin);

/** Peticion HTTP para actualizar información del usuario */
router.put('/update/:id/:provider?', AuthController.updateProfile)

/**Peticion HTTP para renovar el token */
router.get('/renew', validateJWT, AuthController.renewToken);

/**Peticion HTTP para Validar autenticacion de google */
router.get('/validateToken', AuthController.authGoogle);

/**Peticion HTTP para validar la autenticacion de facebook */
router.get('/auth/facebook/token', AuthController.authFb);

export default router