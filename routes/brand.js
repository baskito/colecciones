/*
    Path: '/api/brand'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getBrand, getBrandOne, updateBrand, createBrand, deleteBrand } = require('../controllers/brand');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getBrand );

router.get( '/:id', validarJWT , getBrandOne );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre de la plataforma es obligatorio').not().isEmpty(),
        check('year', 'El año de la plataforma es obligatorio').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ], 
    createBrand 
);

router.put( '/:id',
    [
        validarJWT,
        check('name', 'El nombre de la plataforma es obligatorio').not().isEmpty(),
        check('year', 'El año de la plataforma es obligatorio').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ],
    updateBrand
);



router.delete( '/:id',
    deleteBrand
);



module.exports = router;