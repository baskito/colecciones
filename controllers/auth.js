const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
// const { getMenuFrontEnd } = require('../helpers/menu-frontend');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Esperamos 1 segundo para iniciar el login
        await sleep(1000)
        function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
        }
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email y/o contraseña incorrectos'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token,
            // menu: getMenuFrontEnd( usuarioDB.role )
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    const googleUser = await googleVerify( googleToken )
        .catch((err) => {
            console.log(err);
            return;
        });
        // const { name, email, picture } = await googleVerify( googleToken );
        // console.log(email);
 
    if ( googleUser === undefined ) {
        return res.status(403).json({
            ok: false,
            msg: 'Token no válido'
        });
    } else {
        const { name, email, picture } = googleUser;
        try {
            const usuarioDB = await Usuario.findOne({ email });
            let usuario;

            if ( !usuarioDB ) {
                // si no existe el usuario
                usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@@',
                    img: picture,
                    google: true
                });
            } else {
                // existe usuario
                usuario = usuarioDB;
                usuario.google = true;
            }

            // Guardar en DB
            await usuario.save();

            // Generar el TOKEN - JWT
            const token = await generarJWT( usuario.id );
            
            res.json({
                ok: true,
                email, name, picture,
                token,
                // menu: getMenuFrontEnd( usuario.role )
            });

        } catch (error) {
            
            res.status(401).json({
                ok: false,
                msg: 'Token no es correcto',
                error
            });
        }
    }

}


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario,
        // menu: getMenuFrontEnd( usuario.role )
    });

}




module.exports = {
    login,
    googleSignIn,
    renewToken
}
