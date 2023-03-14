const Usuario = require('../models/usuario');
const fs = require('fs');

const Console = require('../models/console');
const Accesorio = require('../models/accesorio');
const Collection = require('../models/collection');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

const actualizarImagen = async(tipo, id, nombreArchivo, numero = '1') => {

    let pathViejo = '';
    const num = parseInt(numero);
    switch( tipo ) {
        case 'consoles':
            const console = await Console.findById(id);
            
            if ( !console ) {
                console.log('No es una consola por id');
                return false;
            }
            switch( num ) {
                case 1:
                    pathViejo = `./uploads/consoles/${ console.img1 }`;
                    console.img1 = nombreArchivo;
                    break;
                    
                case 2:
                    pathViejo = `./uploads/consoles/${ console.img2 }`;
                    console.img2 = nombreArchivo;
                    break;
                    
                case 3:
                    pathViejo = `./uploads/consoles/${ console.img3 }`;
                    console.img3 = nombreArchivo;
                    break;

            }
            borrarImagen( pathViejo );
            await console.save();
            return true;

        break;
        
        case 'accesorios':
            const accesorio = await Accesorio.findById(id);
            if ( !accesorio ) {
                console.log('No es un accesorio por id');
                return false;
            }

            switch( num ) {
                case 1:
                    pathViejo = `./uploads/accesorios/${ accesorio.img1 }`;
                    accesorio.img1 = nombreArchivo;
                    break;
                    
                case 2:
                    pathViejo = `./uploads/accesorios/${ accesorio.img2 }`;
                    accesorio.img2 = nombreArchivo;
                    break;
                    
                case 3:
                    pathViejo = `./uploads/accesorios/${ accesorio.img3 }`;
                    accesorio.img3 = nombreArchivo;
                    break;

            }
            borrarImagen( pathViejo );

            await accesorio.save();
            return true;

        break;

        case 'collections':
            const collection = await Collection.findById(id);
            if ( !collection ) {
                console.log('No es una colección por id');
                return false;
            }
            
            switch( num ) {
                case 1:
                    pathViejo = `./uploads/collections/${ num }/${ collection.img1 }`;
                    collection.img1 = nombreArchivo;
                    break;
                    
                case 2:
                    pathViejo = `./uploads/collections/${ num }/${ collection.img2 }`;
                    collection.img2 = nombreArchivo;
                    break;
                    
                case 3:
                    pathViejo = `./uploads/collections/${ num }/${ collection.img3 }`;
                    collection.img3 = nombreArchivo;
                    break;

            }
            borrarImagen( pathViejo );

            await collection.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/1/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }
    
}



module.exports = { 
    actualizarImagen
}
