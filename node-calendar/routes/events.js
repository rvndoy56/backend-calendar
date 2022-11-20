/*
    Event Routes
    /api/events
*/

const { check } = require('express-validator');
const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");

//Obtener eventos
router.get('/', getEventos);

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de Fin es obligatoria').custom(isDate),
        // validarCampos
    ],
    crearEvento);

router.put('/:id',actualizarEvento);

router.delete('/:id',eliminarEvento);

module.exports = router;