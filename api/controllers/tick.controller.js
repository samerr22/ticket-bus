
import ticket from '../models/ticket.model.js';

// Create an appointment
export const tcreate = async (req, res) => {
  try {
    const {Name, location, price, seat } = req.body;
    
    const newAppointment = new ticket({
      Name, location, price, seat
    });

    await newAppointment.save();
    return res.status(201).json({ message: 'Appointment created successfully', newAppointment });
  } catch (error) {
    return res.status(400).json({ message: 'Error creating appointment', error: error.message });
  }
};



// Get all appointments
export const tget = async (req, res) => {
  try {
    const appointments = await ticket.find();
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Get a single appointment by ID
export const tgett = async (req, res) => {
  const { id } = req.params;
  try {
    const tiket = await ticket.findById(id);
    if (!tiket) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json(tiket);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching appointment', error: error.message });
  }
};

// Update an appointment
export const tupdate = async (req, res) => {
  const { id } = req.params;
  try {
    const tiket = await ticket.findByIdAndUpdate(id, req.body, { new: true });
    if (!tiket) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ message: 'Appointment updated successfully', tiket });
  } catch (error) {
    return res.status(400).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete an appointment
export const tdelete = async (req, res) => {
  const { id } = req.params;
  try {
    const tiket = await ticket.findByIdAndDelete(id);
    if (!tiket) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting appointment', error: error.message });
  }
};








