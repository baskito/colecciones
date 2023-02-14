const { Schema, model } = require('mongoose');

const AccesorioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    tipology: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: Date
    },
    releasePrice: {
        type: Number
    },
    support: {
        type: String
    },
    compatibility: {
        type: String
    },
    serialNumber: {
        type: String
    },
    purchaseDate: {
        type: Date
    },
    purchasePrice: {
        type: Number,
    },
    purchasePlace: {
        type: String,
    },
    sold: {
        type: Boolean
    },
    saleDate: {
        type: Date,
    },
    salePrice: {
        type: Number
    },
    salePlace: {
        type: String
    },
    notes: {
        type: String,
    },
    img1: {
        type: String
    },
    img2: {
        type: String
    },
    img3: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    console: {
        type: Schema.Types.ObjectId,
        ref: 'Console',
        required: true
    }
});


AccesorioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Accesorio', AccesorioSchema );