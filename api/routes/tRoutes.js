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
router.post('/cticket', tcreate);

// Get all appointments
router.get('/gcticket', tget);

// Get a single appointment by ID
router.get('/ucticket/:id', tgett);

// Update an appointment by ID
router.put('/ucticket/:id', tupdate);

// Delete an appointment by ID
router.delete('/deletcticket/:id', tdelete);



export default router;
