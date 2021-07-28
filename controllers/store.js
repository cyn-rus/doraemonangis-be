const router = require('express').Router()
const Store = require('../models/store.model')
const Own = require('../models/own.model')

router.route('/').get((_req, res) => {
  Store.find()
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const name = req.body.name
  const address = req.body.address
  const subdistrict = req.body.subdistrict
  const province = req.body.province

  const store = new Store({
    name,
    address,
    subdistrict,
    province
  })

  store.save()
    .then(() => res.json('Store added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:name').get((req, res) => {
  const name = req.params.name
  Store.find({name: name})
    .then(store => res.json(store))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:name').delete(async (req, res) => {
  try {
    const name = req.params.name
    await Store.find({name: name}).deleteOne()
      .then(() => res.json('Store deleted.'))
      .catch(err => ('Error when deleting store: ' + err))

    await Own.countDocuments({name: name}, function(_err, count) {
      if (count > 0) {
        Own.find({name: name}).deleteMany()
          .then(() => res.json('Own deleted.'))
          .catch(err => ('Error when deleting own: ' + err))
      }
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.route('/update/:id').post((req, res) => {
  Store.findById(req.params.id)
    .then(store => {
      store.name = req.body.name
      store.address = req.body.address
      store.subdistrict = req.body.subdistrict
      store.province = req.body.province
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router