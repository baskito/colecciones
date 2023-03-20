/*
    Path: '/api/platform'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getPlatform, getPlatformOne, updatePlatform, createPlatform, deletePlatform } = require('../controllers/platform');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getPlatform );

router.get( '/:id', validarJWT , getPlatformOne );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre de la plataforma es obligatorio').not().isEmpty(),
        check('year', 'El año de la plataforma es obligatorio').not().isEmpty(),
        check('brand', 'La marca de la plataforma es obligatoria').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ], 
    createPlatform 
);

router.put( '/:id',
    [
        validarJWT,
        check('name', 'El nombre de la plataforma es obligatorio').not().isEmpty(),
        check('year', 'El año de la plataforma es obligatorio').not().isEmpty(),
        check('brand', 'La marca de la plataforma es obligatoria').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ],
    updatePlatform
);



router.delete( '/:id',
    deletePlatform
);



module.exports = router;