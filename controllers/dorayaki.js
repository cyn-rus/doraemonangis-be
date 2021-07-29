const router = require('express').Router()
let Dorayaki = require('../models/dorayaki.model')

router.route('/').get((_req, res) => {
  Dorayaki.find()
    .then(dorayakis => res.json(dorayakis))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/count').get((_req, res) => {
  Dorayaki.countDocuments()
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:taste').get((req, res) => {
  const taste = req.params.taste.toLowerCase()
  taste.replace('%20', ' ')
  Dorayaki.find({taste: taste})
    .then(dorayaki => res.json(dorayaki))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const taste = req.body.taste.toLowerCase()
  const description = req.body.description.toLowerCase()
  const image = req.body.image

  const newDorayaki = new Dorayaki({
    taste,
    description,
    image
  })

  newDorayaki.save()
    .then(() => res.json('Dorayaki added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  const id = req.params.id
  Dorayaki.findByIdAndDelete(id)
    .then(() => res.json('Dorayaki deleted!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router