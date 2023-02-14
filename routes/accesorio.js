/*
    Path: '/api/Accesorios'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getAccesorio, updateAccesorio, createAccesorio, deleteAccesorio } = require('../controllers/Accesorio');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getAccesorio );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre del accesorio es obligatorio').not().isEmpty(),
        check('model', 'El modelo del accesorio es obligatorio').not().isEmpty(),
        check('brand', 'La marca del accesorio es obligatoria').not().isEmpty(),
        check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ], 
    createAccesorio 
);

router.put( '/:id',
    [
        validarJWT,
        check('name', 'El nombre del accesorio es obligatorio').not().isEmpty(),
        check('model', 'El modelo del accesorio es obligatorio').not().isEmpty(),
        check('brand', 'La marca del accesorio es obligatoria').not().isEmpty(),
        check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ],
    updateAccesorio
);



router.delete( '/:id',
    deleteAccesorio
);



module.exports = router;