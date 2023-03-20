/*
    Path: '/api/game'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getGame, getGameOne, updateGame, createGame, deleteGame } = require('../controllers/game');

const { 
    validarJWT, 
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getGame );

router.get( '/:id', validarJWT , getGameOne );

router.post( '/',
    [
        validarJWT,
        check('name', 'El nombre del juego es obligatorio').not().isEmpty(),
        // check('brand', 'La marca del juego es obligatoria').not().isEmpty(),
        // check('platform', 'La plataforma del juego es obligatoria').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ], 
    createGame 
);

router.put( '/:id',
    [
        validarJWT,
        check('name', 'El nombre del juego es obligatorio').not().isEmpty(),
        // check('brand', 'La marca del juego es obligatoria').not().isEmpty(),
        // check('platform', 'La plataforma del juego es obligatoria').not().isEmpty(),
        // check('console', 'El id de la consola tiene que ser válido').isMongoId(),
        validarCampos
    ],
    updateGame
);



router.delete( '/:id',
    deleteGame
);



module.exports = router;