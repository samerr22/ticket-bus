import mongoose from 'mongoose';

const DocterSchema = new mongoose.Schema({
  
  doctorName: {
    type: String,
    required: true
  },
  Docdate: {
    type: String,
    required: true
  },
  Time: {
    type: String, // We can store time as a string (e.g., "10:00 AM")
    required: true
  },
 
 
});

const doctertment = mongoose.model('doctertment', DocterSchema);

export default doctertment;
