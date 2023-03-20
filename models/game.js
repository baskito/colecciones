const { Schema, model } = require('mongoose');

const GameSchema = Schema({

    name: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: String
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
    estimatedValue: {
        type: Number,
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
        type: Boolean,
        default: false
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
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    platform: {
        type: Schema.Types.ObjectId,
        ref: 'Platform',
    },
    console: {
        type: Schema.Types.ObjectId,
        ref: 'Console'
    }
});


GameSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Game', GameSchema );