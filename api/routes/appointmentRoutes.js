import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from '../controllers/ap.controller.js';

const router = express.Router();

// Create an appointment
router.post('/cappointments', createAppointment);

// Get all appointments
router.get('/gappointments', getAppointments);

// Get a single appointment by ID
router.get('/appointments/:id', getAppointmentById);

// Update an appointment by ID
router.put('/uappointments/:id', updateAppointment);

// Delete an appointment by ID
router.delete('/ppointments/:id', deleteAppointment);



export default router;
