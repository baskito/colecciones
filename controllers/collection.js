const { response } = require('express');
const Collection = require('../models/collection');

const getCollection = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const [ collection, total ] = await Promise.all([
        Collection.find()
            .populate('usuario', 'nombre email img')
            .skip( from )
            .limit( 5 ),

        Collection.countDocuments()
    ]);

    res.json({
        ok: true,
        collection,
        total
    });
}

const updateCollection = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const collection = await Collection.findById( id );

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
    deleteCollection
}