const { response } = require('express');
const Game = require('../models/game');
const ObjectID = require("mongodb").ObjectId;

const getGame = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const uid = req.uid;

    const [ games, total ] = await Promise.all([
        Game.find({usuario: uid})
            .populate('usuario', 'nombre email img')
            .populate('console', 'name model brand img1')
            .skip( from )
            .limit( 10 ),

        Game.find({usuario: uid})
    ]);

    res.json({
        ok: true,
        games,
        total: total.length
    });
}

const getGameOne = async (req, res = response) => {

    const id = req.params.id;
    
    try {

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id del juego no es válido'
            });
        }

        const game = await Game.findById( id );
        
        if (!game) {
            return res.status(404).json({
                ok: false,
                msg: 'Juego no encontrado por id'
            });
        }

        res.json({
            ok: true,
            game
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const updateGame = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const game = await Game.findById( id );

        if (!game) {
            return res.status(404).json({
                ok: false,
                msg: 'Juego no encontrado por id'
            });
        }

        const newGame = {
            ...req.body,
            usuario: uid
        }

        if (newGame.console) {
            if (!ObjectID.isValid(newGame.console)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El id de la consola no es válido'
                });
            }
        }


        const gameDB = await Game.findByIdAndUpdate( id, newGame, { new: true });

        res.json({
            ok: true,
            game: gameDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createGame = async (req, res = response) => {

    const uid = req.uid;
    const game = new Game({
        usuario: uid,
        ...req.body
    }); 

    if (game.console) {
        if (!ObjectID.isValid(game.console)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id de la consola no es válido'
            });
        }
    }

    try {
  
        // Guardar juego
        const gameDB = await game.save();

        res.json({
            ok: true,
            game: gameDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteGame = async (req, res = response) => {

    const id = req.params.id;

    try {

        const game = await Game.findById( id );

        if (!game) {
            return res.status(404).json({
                ok: false,
                msg: 'Juego no encontrado por id'
            });
        }

        await Game.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Juego eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getGame,
    getGameOne,
    updateGame,
    createGame,
    deleteGame
}