/*
    Ruta: /api/search/
*/

const { Router } = require('express');
const { getSearchItem, getSearchFromCollection } = require('../controllers/search');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/:item', validarJWT, getSearchItem );
router.get( '/collection/:tabla/:item', validarJWT, getSearchFromCollection );

module.exports = router;