/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, activarUsuario } = require('../controllers/usuario');
const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getUsuarios );

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password tiene una longitud mínima de 6').isLength({ min: 6}),
        check('email', 'El email no es correcto').isEmail(),
        validarCampos,
    ], 
    crearUsuario 
);

router.put( '/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es correcto').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.put( '/activar/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE,
        validarCampos,
    ],
    activarUsuario
);

router.delete( '/:id',
    [ validarJWT, varlidarADMIN_ROLE ],
    borrarUsuario
);



module.exports = router;