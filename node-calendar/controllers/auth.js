const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT} = require('../helpers/jwt');

//El res = response se agrega para obtener los datos del intellisense para el json.
const loginUsuario = async (req, res = response) => {

    const { email,password } = req.body;

    try{
        const usuario = await Usuario.findOne({ email })

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no eixste'
            })
        }
        
        //Confirmar Password
        const validPassword = bcrypt.compareSync(password,usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        //Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name ); 

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })


    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adm'
        })
    }
}

const crearUsuario = async (req, res = response) =>{

    const { email,password } = req.body;

    try{
        let usuario = await Usuario.findOne({ email })

        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            })
        }
        
        
        usuario = new Usuario(req.body);
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        await usuario.save();

        res.status(201).json({
            ok:true,
            msg:'registro',
        })
    }
    catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Hable con el adm'
        })
    }
}

const revalidarToken = async (req, res = response) =>{

    const {uid,name} = req;
    //Generar nuevo token
    const token = await generarJWT( uid, name ); 

    res.json({
        ok:true,
        uid,
        name,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}