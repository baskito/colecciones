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

const deleteCollection = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getCollections'
    });
}


module.exports = {
    getCollection,
    updateCollection,
    createCollection,
    deleteCollection
}