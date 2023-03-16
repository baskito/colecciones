const { response } = require('express');
const Console = require('../models/console');
const ObjectID = require("mongodb").ObjectId;

const getConsole = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const [ consoles, total ] = await Promise.all([
        Console
            .find()
            .populate('usuario', 'nombre email img')
            .skip( from )
            .limit( 5 ),

        Console.countDocuments()
    ]);

    res.json({
        ok: true,
        consoles,
        total
    });
}

const getConsoleAcc = async (req, res = response) => {

    const uid = req.uid;

    const consoles = await Console
            .find({usuario: uid})
            .populate('usuario', 'nombre email img');

    res.json({
        ok: true,
        consoles,
        total: consoles.length
    });
}

const updateConsole = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const console = await Console.findById( id );
        if (!console) {
            return res.status(404).json({
                ok: false,
                msg: 'Consola no encontrada por id'
            });
        }

        const newConsole = {
            ...req.body,
            usuario: uid
        }
        const consoleDB = await Console.findByIdAndUpdate( id, newConsole, { new: true });

        res.json({
            ok: true,
            console: consoleDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createConsole = async (req, res = response) => {

    const uid = req.uid;
    const console = new Console({
        usuario: uid,
        ...req.body
    }); 

    try {

        // Guardar console
        const consoleDB = await console.save();

        res.json({
            ok: true,
            console: consoleDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteConsole = async (req, res = response) => {

    const id = req.params.id;

    try {

        const console = await Console.findById( id );

        if (!console) {
            return res.status(404).json({
                ok: false,
                msg: 'Consola no encontrada por id'
            });
        }

        await Console.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Conosla eliminada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getConsole,
    getConsoleAcc,
    updateConsole,
    createConsole,
    deleteConsole
}