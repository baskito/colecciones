const { response } = require('express');
const ObjectID = require("mongodb").ObjectId;
const Collection = require('../models/collection');

const getCollection = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const uid = req.uid;

    const [ collections, total ] = await Promise.all([
            Collection.find({usuario: uid})
            .populate('usuario', 'nombre email img')
            .skip( from )
            .limit( 10 ),

            Collection.find({usuario: uid})

    ]);

    res.json({
        ok: true,
        collections,
        total: total.length
    });
}

const getCollectionOne = async (req, res = response) => {

    const id = req.params.id;

    try {

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'La id de la colección no es válida'
            });
        }

        const collection = await Collection.findById( id );
        
        if (!collection) {
            return res.status(404).json({
                ok: false,
                msg: 'Colección no encontrada por id'
            });
        }

        res.json({
            ok: true,
            collection
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const updateCollection = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const collection = await Collection.findById( id );

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'La id de la colección no es válida'
            });
        }

        if (!collection) {
            return res.status(404).json({
                ok: false,
                msg: 'Colección no encontrada por id'
            });
        }

        const newCollection = {
            ...req.body,
            usuario: uid
        }
    

        const collectionDB = await Collection.findByIdAndUpdate( id, newCollection, { new: true });

        res.json({
            ok: true,
            collection: collectionDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createCollection = async (req, res = response) => {
    const uid = req.uid;
    const collection = new Collection({
        usuario: uid,
        ...req.body
    }); 

    try {
  
        // Guardar collection
        const collectionDB = await collection.save();

        res.json({
            ok: true,
            collection: collectionDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteCollection = async (req, res = response) => {

    const id = req.params.id;

    try {

        const collection = await Collection.findById( id );

        if (!collection) {
            return res.status(404).json({
                ok: false,
                msg: 'Colección no encontrada por id'
            });
        }

        await Collection.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Colección eliminada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getCollection,
    updateCollection,
    createCollection,
    deleteCollection,
    getCollectionOne
}