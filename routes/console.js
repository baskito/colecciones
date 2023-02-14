/*
    Path: '/api/consoles'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getConsole, updateConsole, createConsole, deleteConsole } = require('../controllers/console');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getConsole );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre de la consola es obligatorio').not().isEmpty(),
        check('model', 'El modelo de la consola es obligatorio').not().isEmpty(),
        check('brand', 'La marca de la consola es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    createConsole 
);

router.put( '/:id',
    [
        
    ],
    updateConsole
);



router.delete( '/:id',
    deleteConsole
);



module.exports = router;