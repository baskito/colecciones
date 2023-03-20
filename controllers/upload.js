const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const numero = req.params.numero;
    console.log(tipo);
    console.log(id);
    console.log(numero);
    console.log(req.files);

    // Validar tipo
    const tiposValidos = ['usuarios', 'consoles', 'accesorios', 'collections', 'brands', 'platforms', 'games'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo válido aceptado'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.image;

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ numero }/${ nombreArchivo }`;
    console.log(path);
    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
            return;
        }

        // Actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo, numero );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const getImage = (req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.image;
    const numero = req.params.numero;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ numero }/${ foto }` );
    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    getImage
}