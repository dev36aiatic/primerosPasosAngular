import { Router } from "express";
import AuthController from '../controller/AuthController';
import { check } from 'express-validator';

import MiddleWares from '../Middlewares/validate-fields';
import validateJWT from '../Middlewares/validate-jwt';
import * as multipart from 'connect-multiparty';
import uploadImage from '../Middlewares/upload-image'
import authController from '../controller/AuthController';

/**Se establece el router de express */
const router = Router();

/**Middleware para subir las imagenes */
const multipartMiddleware = multipart({uploadDir:'src/user-images'});

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

/**Peticion para subir la imagen del usuario */
router.post('/upload-image/:id/:provider?',[multipartMiddleware,uploadImage],authController.uploadImage);

/** Peticion para cargar la imagen del usuario */
router.get('/get-image/:imageFile',authController.getImageFile);

/**Peticion HTTP para renovar el token */
router.get('/renew', validateJWT, AuthController.renewToken);

/**Peticion HTTP para Validar autenticacion de google */
router.get('/validateToken', AuthController.authGoogle);

/**Peticion HTTP para validar la autenticacion de facebook */
router.get('/auth/facebook/token', AuthController.authFb);

export default router