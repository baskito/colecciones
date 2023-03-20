const { Schema, model } = require('mongoose');

const PlatformSchema = Schema({

    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    generation: {
        type: String,
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
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    }
});


PlatformSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Platform', PlatformSchema );