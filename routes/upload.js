/*
    Ruta: /api/upload/
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, getImage } = require('../controllers/upload');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use( expressFileUpload() );

router.put( '/:tipo/:numero/:id/', validarJWT, fileUpload );

router.get('/:tipo/:numero/:image', getImage );

module.exports = router;