const { Schema, model } = require('mongoose');

const CollectionSchema = Schema({

    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
    },
    editorial: {
        type: String,
        required: true,
    },
    tipology: {
        type: String
    },
    description: {
        type: String
    },
    fullCollection: {
        type: Number
    },
    extras: {
        type: String
    },
    missing: {
        type: String
    },
    repeated: {
        type: String,
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
    }
});


CollectionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model( 'Collection', CollectionSchema );