import { response, Router } from "express";
import AuthController from '../controller/AuthController';
import { check } from 'express-validator';
const router = Router();

import  MiddleWares  from '../middlewares/validate-fields';
import validateJWT from '../Middlewares/validate-jwt';

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
], AuthController.newUser);


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
    ], AuthController.userLogin);


/** Peticion para actualizar información del usuario */
router.put('/update/:id/:provider?',AuthController.updateProfile)

/** Peticion para conseguir información del usuario */
router.get('/user/:id/:provider?',AuthController.findUser)

/**Peticion get para renovar el token */
router.get('/renew', validateJWT, AuthController.renewToken);

/**Peticion get Validar autenticacion de google */
router.get('/validateToken', AuthController.authGoogle);

/**Peticion get para validar la autenticacion de facebook */
router.get('/auth/facebook/token',AuthController.authFb);


export default router