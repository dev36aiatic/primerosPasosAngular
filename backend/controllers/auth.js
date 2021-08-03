const { response } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const authController = {
    crearUsuario: (req, res = response) => {

        const { nombre, email, password } = req.body;
        console.log(nombre, email, password);

        return res.json({
            ok: true,
            msg: 'Crear usuario /new'
        });

    },
    loginUsuario: (req, res = response) => {

        const { email, password } = req.body;

        console.log(email,password);
        
        return res.json({
            ok: true,
            msg: 'Login usuario /'
        });

    },
    renovarToken: (req, res = response) => {

        return res.json({
            ok: true,
            msg: 'renew'
        });

    }
}


module.exports = authController;