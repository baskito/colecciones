const { response } = require('express');
const Console = require('../models/console');
const Accesorio = require('../models/accesorio');
const Collection = require('../models/collection');
const Usuario = require('../models/usuario');

const getSearchItem = async (req, res = response) => {

    const itemBusqueda = req.params.item;
    const regExp = new RegExp( itemBusqueda.toString(), 'i');
    const from = Number(req.query.from) || 0;

    const [ consoles, accesorios, collections ] = await Promise.all([
        Console.find({$or:[ 
            {name: regExp},
            {model: regExp},
            {tipology: regExp},
            {brand: regExp},
            {tipology: regExp} 
        ]}).populate('usuario', 'nombre email img'),
        Accesorio.find({$or:[ 
            {name: regExp},
            {model: regExp},
            {tipology: regExp},
            {brand: regExp},
            {tipology: regExp},
            {console: regExp}
        ]}).populate('usuario', 'nombre email img')
        .populate('console', 'name model brand img1'),
        Collection.find({$or:[ 
            {name: regExp},
            {tipology: regExp},
            {editorial: regExp} 
        ]}).populate('usuario', 'nombre email img')
    ]);
    const sumArrays = await [...consoles, ...accesorios, ...collections];
    const total = sumArrays.length;
    const finalArray = sumArrays.slice(from, from + 10);

    res.json({
        ok: true,
        results: finalArray,
        total
    });

}

const getSearchFromCollection = async (req, res = response) => {
    const itemBusqueda = req.params.item;
    const tablaBusqueda = req.params.tabla;
    const regExp = new RegExp( itemBusqueda.toString(), 'i');
    const from = Number(req.query.from) || 0;
    let data = [];
    let total = 0;
    const uid = req.uid;

    switch ( tablaBusqueda ) {

        case 'usuarios':
            [ data, total ] = await Promise.all([
                data = Usuario.find({$or:[ 
                    {nombre: regExp},
                    {email: regExp}
                ]}),
        
                total = data = Usuario.find()
            ]);
        break;

        case 'consoles':
            data = await Console.find({$or:[ 
                {name: regExp},
                {model: regExp},
                {tipology: regExp},
                {brand: regExp},
                {tipology: regExp} 
            ]}).populate('usuario', 'nombre email img')
            .skip( from )
            .limit( 10 );
        break;

        case 'accesorios':
            data = await Accesorio.find({$or:[ 
                {name: regExp},
                {model: regExp},
                {tipology: regExp},
                {brand: regExp} 
            ]}).populate('usuario', 'nombre email img')
            .populate('console', 'name model brand img1')
            .skip( from )
            .limit( 10 );
        break;

        case 'games':
            data = await Game.find({$or:[ 
                {name: regExp},
                {genre: regExp},
                {editorial: regExp},
                {platform: regExp} 
            ]}).populate('usuario', 'nombre email img')
            .populate('console', 'name model brand img1')
            .skip( from )
            .limit( 10 );
        break;

        case 'collections':
            [ data, total ] = await Promise.all([
                Collection.find({usuario: uid, $or:[ 
                    {name: regExp},
                    {tipology: regExp},
                    {editorial: regExp} 
                ]}).populate('usuario', 'nombre email img'),

                Collection.find({usuario: uid})

            ]);
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser consoles/accesorios/collections'
            });

    }

    res.json({
        ok: true,
        results: data,
        totalSearch: data.length,
        total: total.length
    });
}


module.exports =  {
    getSearchItem,
    getSearchFromCollection
}
