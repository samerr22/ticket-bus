import express from 'express';
import {
 
  tget,
  tgett,
  tcreate,
  tupdate,
  tdelete,
} from '../controllers/tick.controller.js';

const router = express.Router();

// Create an appointment
router.post('/cappointments', tcreate);

// Get all appointments
router.get('/gappointments', tget);

// Get a single appointment by ID
router.get('/appointments/:id', tgett);

// Update an appointment by ID
router.put('/uappointments/:id', tupdate);

// Delete an appointment by ID
router.delete('/ppointments/:id', tdelete);



export default router;
