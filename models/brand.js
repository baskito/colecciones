const { Schema, model } = require('mongoose');

const BrandSchema = Schema({

    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


BrandSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Brand', BrandSchema );