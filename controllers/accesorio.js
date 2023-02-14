const { response } = require('express');
const Accesorio = require('../models/accesorio')

const getAccesorio = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const [ accesorio, total ] = await Promise.all([
        Accesorio.find()
            .populate('usuario', 'nombre email img')
            .populate('console', 'name model brand img1')
            .skip( from )
            .limit( 5 ),

        Accesorio.countDocuments()
    ]);

    res.json({
        ok: true,
        accesorio,
        total
    });
}

const updateAccesorio = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarAccesorio'
    });
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

const deleteAccesorio = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getAccesorios'
    });
}


module.exports = {
    getAccesorio,
    updateAccesorio,
    createAccesorio,
    deleteAccesorio
}