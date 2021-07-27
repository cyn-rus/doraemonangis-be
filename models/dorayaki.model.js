const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dorayakiSchema = new Schema({
  taste: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamp: true
})

const Dorayaki = mongoose.model('Dorayaki', dorayakiSchema)

module.exports = Dorayaki