const router = require('express').Router()
let Dorayaki = require('../models/dorayaki.model')

router.route('/').get((_req, res) => {
  Dorayaki.find()
    .then(dorayakis => res.json(dorayakis))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const taste = req.body.taste
  const description = req.body.description
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

module.exports = router