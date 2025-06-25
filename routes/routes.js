const express = require('express');
const router = express.Router();
const { sendMail } = require('../controllers/mailController');
const { addClient, loginClient, changePass, addClientGoogle, addClientPhone, getClientId } = require('../controllers/userController');
const { loginAdmin, getAdmins, changePassAdmin } = require('../controllers/adminController');
const { obtenerCredencialesPaypal } = require('../controllers/paypalController');
const { addReservation, obtenerTodas, obtenerReservacion, actualizar, eliminar } = require('../controllers/reservacionController');
const { getAllServices, getService, addService, updateService, deleteService } = require('../controllers/serviciosController');

// FireBase API REST
router.post('/reservaciones/crear', addReservation);
router.get('/reservaciones/todas', obtenerTodas);
router.get('/reservaciones/:no_reservacion', obtenerReservacion);
router.put('/reservaciones/editar/:no_reservacion', actualizar);
router.delete('/reservaciones/eliminar/:no_reservacion', eliminar);

// FireBase API REST (Servicios)
router.get('/servicios/todos', getAllServices);
router.get('/servicios/:no_servicio', getService);
router.post('/servicios/crear', addService);
router.put('/servicios/editar/:no_servicio', updateService);
router.delete('/servicios/eliminar/:no_servicio', deleteService);

// Clientes FireBase API 
router.post('/client', addClient);
router.post('/client/login', loginClient);
router.post('/client/changepass', changePass);
router.post('/client/loginGoogle', addClientGoogle);
router.post('/client/loginPhone', addClientPhone);
router.get('/client/:id', getClientId);

// Nodemailer API
router.post('/mail', sendMail);

// Admins FireBase API
router.get('/admins', getAdmins);
router.post('/admins/login', loginAdmin);
router.post('/admins/changepass', changePassAdmin);

// Paypal API
router.get('/cliente_paypal', obtenerCredencialesPaypal);

module.exports = router;