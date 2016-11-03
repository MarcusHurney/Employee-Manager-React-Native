const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  shift: {
    type: String
  }
});

module.exports = mongoose.model('employee', employeeSchema);
