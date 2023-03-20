const { response } = require('express');
const Brand = require('../models/brand');
const ObjectID = require("mongodb").ObjectId;

const getBrand = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const uid = req.uid;

    const [ brands, total ] = await Promise.all([
        Brand.find({usuario: uid})
            .populate('usuario', 'nombre email img')
            .skip( from )
            .limit( 10 ),

        Brand.find({usuario: uid})
    ]);

    res.json({
        ok: true,
        brands,
        total: total.length
    });
}

const getBrandOne = async (req, res = response) => {

    const id = req.params.id;
    
    try {

        if (!ObjectID.isValid(id)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id de la Marca no es válido'
            });
        }

        const brand = await Brand.findById( id );
        
        if (!brand) {
            return res.status(404).json({
                ok: false,
                msg: 'Marca no encontrada por id'
            });
        }

        res.json({
            ok: true,
            brand
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const updateBrand = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const brand = await Brand.findById( id );

        if (!brand) {
            return res.status(404).json({
                ok: false,
                msg: 'Marca no encontrada por id'
            });
        }

        const newBrand = {
            ...req.body,
            usuario: uid
        }

        if (newBrand.brand) {
            if (!ObjectID.isValid(newBrand.brand)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El id de la marca no es válido'
                });
            }
        }


        const brandDB = await Brand.findByIdAndUpdate( id, newBrand, { new: true });

        res.json({
            ok: true,
            brand: brandDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}

const createBrand = async (req, res = response) => {

    const uid = req.uid;
    const brand = new Brand({
        usuario: uid,
        ...req.body
    }); 

    if (brand.brand) {
        if (!ObjectID.isValid(brand.brand)) {
            return res.status(404).json({
                ok: false,
                msg: 'El id de la marca no es válido'
            });
        }
    }

    try {
  
        // Guardar plataforma
        const brandDB = await brand.save();

        res.json({
            ok: true,
            brand: brandDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteBrand = async (req, res = response) => {

    const id = req.params.id;

    try {

        const brand = await Brand.findById( id );

        if (!brand) {
            return res.status(404).json({
                ok: false,
                msg: 'Marca no encontrada por id'
            });
        }

        await Brand.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Marca eliminada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, consulte con le administrador'
        });
    }
}


module.exports = {
    getBrand,
    getBrandOne,
    updateBrand,
    createBrand,
    deleteBrand
}