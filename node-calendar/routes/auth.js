/**
 * Rutas de Usuario / Auth
 * host + /api/auth
 */

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('email','La clave es 6 digitos').isLength({min:6}),
    validarCampos
],loginUsuario);

router.get('/renew', validarJWT ,revalidarToken)

module.exports = router