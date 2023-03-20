const { response } = require('express');
const Platform = require('../models/platform');
const ObjectID = require("mongodb").ObjectId;

const getPlatform = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const uid = req.uid;

    const [ platforms, total ] = await Promise.all([
        Platform.find({usuario: uid})
            .populate('usuario', 'nombre email img')
            .populate('brand', 'name country year logo')
            .skip( from )
            .limit( 10 ),

        Platform.find({usuario: uid})
    ]);

    res.json({
        ok: true,
        platforms,
        total: total.length
    });
}

const getPlatformOne = async (req, res = response) => {

    const id = req.params.id;
    
    try {

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id de la plataforma no es válido'
            });
        }

        const platform = await Platform.findById( id );
        
        if (!platform) {
            return res.status(404).json({
                ok: false,
                msg: 'Plataforma no encontrada por id'
            });
        }

        res.json({
            ok: true,
            platform
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const updatePlatform = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const platform = await Platform.findById( id );

        if (!platform) {
            return res.status(404).json({
                ok: false,
                msg: 'Plataforma no encontrada por id'
            });
        }

        const newPlatform = {
            ...req.body,
            usuario: uid
        }

        if (newPlatform.brand) {
            if (!ObjectID.isValid(newPlatform.brand)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El id de la marca no es válido'
                });
            }
        }


        const platformDB = await Platform.findByIdAndUpdate( id, newPlatform, { new: true });

        res.json({
            ok: true,
            platform: platformDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createPlatform = async (req, res = response) => {

    const uid = req.uid;
    const platform = new Platform({
        usuario: uid,
        ...req.body
    }); 

    if (platform.brand) {
        if (!ObjectID.isValid(platform.brand)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id de la marca no es válido'
            });
        }
    }

    try {
  
        // Guardar plataforma
        const platformDB = await platform.save();

        res.json({
            ok: true,
            platform: platformDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deletePlatform = async (req, res = response) => {

    const id = req.params.id;

    try {

        const platform = await Platform.findById( id );

        if (!platform) {
            return res.status(404).json({
                ok: false,
                msg: 'Plataforma no encontrada por id'
            });
        }

        await Platform.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Plataforma eliminada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getPlatform,
    getPlatformOne,
    updatePlatform,
    createPlatform,
    deletePlatform
}