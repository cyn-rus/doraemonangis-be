const router = require('express').Router()
const Own = require('../models/own.model')

router.route('/').get((_req, res) => {
  Own.find()
    .then(owns => res.json(owns))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const name = req.body.name
  const taste = req.body.taste
  const qty = req.body.qty

  Own.count({name: name, taste: taste}, function(_err, count) {
    if (count > 0) {
      Own.find({name: name, taste: taste})
        .then(own => {
          own.qty += qty
        })
    }
    else {
      const own = new Own({
        name,
        taste,
        qty
      })

      own.save()
        .then(() => res.json('Own added!'))
        .catch(err => res.status(400).json('Error: ' + err))
    }
  })
})

router.route('/substract').post((req, res) => {
  const name = req.body.name
  const taste = req.body.taste
  const qty = req.body.qty

  Own.findOneAndUpdate(
    { name: name, taste: taste },
    { '$set': { qty: Number(qty) } },
    { useFindAndModify: false },
    function(err, _msg) {
      if (err) {
        res.status(400).json('Error: ' + err)
      }
      else {
        res.json('Success')
      }
    }
  )
})

router.route('/:name').get((req, res) => {
  const name = req.params.name
  
  Own.find({name: name})
    .then(own => res.json(own))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/move').post((req, res) => {
  const from = req.body.from
  const to = req.body.to
  const taste = req.body.taste
  const qtyFrom = req.body.qtyFrom
  const qtyTo = req.body.qtyTo

  Own.findOneAndUpdate(
    { name: from, taste: taste },
    { '$set': { qty: Number(qtyFrom) } },
    { useFindAndModify: false },
    function(err, _msg) {
      if (err) {
        res.status(400).json('Error when reducing: ' + err)
      }
      else {
        res.json('Quantity from ' + from + ' reduced')
      }
    }
  )

  Own.countDocuments(
    { name: to, taste: taste },
    function(_err, count) {
      console.log(count)
      if (count > 0) {
        Own.findOneAndUpdate(
          { name: to, taste: taste },
          { '$set': { qty: Number(qtyTo) } },
          { useFindAndModify: false },
          function(err, _msg) {
            if (err) {
              res.status(400).json('Error when adding: ' + err)
            }
          }
        )
      }
      else {
        const own = new Own({
          name: to,
          taste,
          qty: qtyTo
        })
      
        own.save()
          .then(() => res.json('New own added!'))
          .catch(err => res.status(400).json('Error when creating new own: ' + err))
      }
    }
  )
})

router.route('/:id').delete((req, res) => {
  Own.findByIdAndDelete(req.params.id)
    .then(() => res.json('Own deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  Own.findById(req.params.id)
    .then(own => {
      own.name = req.body.name
      own.taste = req.body.taste
      own.qty = req.body.qty
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router