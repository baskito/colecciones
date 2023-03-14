const { response } = require('express');
const Accesorio = require('../models/accesorio');
const ObjectID = require("mongodb").ObjectId;

const getAccesorio = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const uid = req.uid;

    const [ accesorios, total ] = await Promise.all([
        Accesorio.find({usuario: uid})
            .populate('usuario', 'nombre email img')
            .populate('console', 'name model brand img1')
            .skip( from )
            .limit( 10 ),

        Accesorio.find({usuario: uid})
    ]);

    res.json({
        ok: true,
        accesorios,
        total: total.length
    });
}

const getAccesorioOne = async (req, res = response) => {

    const id = req.params.id;
    
    try {

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id del accesorio no es válido'
            });
        }

        const accesorio = await Accesorio.findById( id );
        
        if (!accesorio) {
            return res.status(404).json({
                ok: false,
                msg: 'Accesorio no encontrado por id'
            });
        }

        res.json({
            ok: true,
            accesorio
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const updateAccesorio = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const accesorio = await Accesorio.findById( id );

        if (!accesorio) {
            return res.status(404).json({
                ok: false,
                msg: 'Accesorio no encontrado por id'
            });
        }

        const newAccesorio = {
            ...req.body,
            usuario: uid
        }

        const accesorioDB = await Accesorio.findByIdAndUpdate( id, newAccesorio, { new: true });

        res.json({
            ok: true,
            accesorio: accesorioDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createAccesorio = async (req, res = response) => {

    const uid = req.uid;
    const accesorio = new Accesorio({
        usuario: uid,
        ...req.body
    }); 

    try {
  
        // Guardar accesorio
        const accesorioDB = await accesorio.save();

        res.json({
            ok: true,
            accesorio: accesorioDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteAccesorio = async (req, res = response) => {

    const id = req.params.id;

    try {

        const accesorio = await Accesorio.findById( id );

        if (!accesorio) {
            return res.status(404).json({
                ok: false,
                msg: 'Accesorio no encontrada por id'
            });
        }

        await Accesorio.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Accesorio eliminada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getAccesorio,
    getAccesorioOne,
    updateAccesorio,
    createAccesorio,
    deleteAccesorio
}