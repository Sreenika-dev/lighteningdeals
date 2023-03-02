const mongoose = require('./dealsdb.js');

const dealSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  actualPrice: {
    type: Number,
    required: true
  },
  finalPrice: {
    type: Number,
    required: true
  },
  totalUnits: {
    type: Number,
    required: true
  },
  availableUnits: {
    type: Number,
    required: true
  },
  expiryTime: {
    type: Date,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const LightningDeal = mongoose.model('LightningDeal', dealSchema);

module.exports = LightningDeal;
