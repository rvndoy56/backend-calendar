/*
    Event Routes
    /api/events
*/


const { response } = require("express");
const Evento = require('../models/Evento');

const getEventos = (req, res = response) =>{
        res.json({
            ok:true,
            msg:'mostrar evento'
        })
}

const crearEvento = async (req, res = response) =>{
    
    const evento = new Evento(req.body);
    
    try {
        console.log(req);
        evento.user = req.uid;    
        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }

}

const actualizarEvento = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'updatear evento'
    })
}

const eliminarEvento = (req, res = response) =>{
    res.json({
        ok:true,
        msg:'eliminar evento'
    })
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};