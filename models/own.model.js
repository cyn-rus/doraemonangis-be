const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ownSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  taste: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
}, {
  timestamp: true
})

const Own = mongoose.model('Own', ownSchema)

module.exports = Own