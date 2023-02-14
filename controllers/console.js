const { response } = require('express');
const Console = require('../models/console');

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

const updateConsole = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarConsole'
    });
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

const deleteConsole = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getConsoles'
    });
}


module.exports = {
    getConsole,
    updateConsole,
    createConsole,
    deleteConsole
}