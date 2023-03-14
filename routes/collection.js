/*
    Path: '/api/Collections'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getCollection, getCollectionOne, updateCollection, createCollection, deleteCollection } = require('../controllers/Collection');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCollection );

router.get( '/:id', validarJWT , getCollectionOne );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('year', 'El año es obligatorio').not().isEmpty(),
        check('editorial', 'La editorial es obligatoria').not().isEmpty(),
        validarCampos,
    ], 
    createCollection 
);

router.put( '/:id',
    [
        
    ],
    updateCollection
);



router.delete( '/:id',
    deleteCollection
);



module.exports = router;