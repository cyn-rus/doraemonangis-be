const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  subdistrict: { type: String, required: true },
  province: { type: String, required: true },
}, {
  timestamp: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store