import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  seat: {
    type: String, // We can store time as a string (e.g., "10:00 AM")
    required: true
  },
 
 
});

const ticket = mongoose.model('ticket', ticketSchema);

export default ticket;
