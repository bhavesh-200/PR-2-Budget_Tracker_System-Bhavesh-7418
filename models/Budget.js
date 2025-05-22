const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);