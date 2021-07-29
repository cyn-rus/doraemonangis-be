const router = require('express').Router()
const Dorayaki = require('../models/dorayaki.model')
const Own = require('../models/own.model')

router.route('/').get((_req, res) => {
  Own.find()
    .then(owns => res.json(owns))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/get-qty/:name/:taste').get((req, res) => {
  const name = req.params.name.toLowerCase()
  const taste = req.params.taste.toLowerCase()
    Own.findOne(
      { name: name, taste: taste },
      function (err, own) {
        if (err) {
          res.status(400).json('Error: ' + err)
        }
        else {
          if (own === null) res.json(0)
          else res.json(own.qty)
        }
      }
    )
})

router.route('/count/:name').get((req, res) => {
  const name = req.params.name.toLowerCase()
  Dorayaki.countDocuments({name: name})
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const name = req.body.name.toLowerCase()
  const taste = req.body.taste.toLowerCase()
  const qty = req.body.qty

  Own.countDocuments({name: name, taste: taste}, function(_err, count) {
    if (count > 0) {
      Own.findOneAndUpdate(
        { name: name, taste: taste },
        { '$set': { qty: Number(qty) } },
        { useFindAndModify: false },
        function (err, _msg) {
          if (err) {
            res.status(400).json('Error when adding own: ' + err)
          }
          else {
            res.json('Own added!')
          }
        })
    }
    else {
      const own = new Own({
        name,
        taste,
        qty
      })

      own.save()
        .then(() => res.json('New own added!'))
        .catch(err => res.status(400).json('Error when creating new own: ' + err))
    }
  })
})

router.route('/substract').post((req, res) => {
  const name = req.body.name.toLowerCase()
  const taste = req.body.taste.toLowerCase()
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
  const name = req.params.name.toLowerCase()
  
  Own.find({name: name})
    .then(own => res.json(own))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/move').post((req, res) => {
  try {
    const from = req.body.from.toLowerCase()
    const to = req.body.to.toLowerCase()
    const taste = req.body.taste.toLowerCase()
    const qtyFrom = req.body.qtyFrom
    const qtyTo = req.body.qtyTo

    if (qtyFrom === 0) {
      Own.find({name: from, taste: taste}).deleteMany()
        .catch((err) => res.status(400).json('Error when deleting From own: ' + err))
    }
    else {
      Own.findOneAndUpdate(
        { name: from, taste: taste },
        { '$set': { qty: Number(qtyFrom) } },
        { useFindAndModify: false },
        function(err, _msg) {
          if (err) {
            res.status(400).json('Error when reducing: ' + err)
          }
        }
      )
    }

    if (qtyTo === 0) {
      try {
        Own.find({name: to, taste: taste}).deleteMany()
          .catch((err) => res.status(404).json('Error when deleting To own: ' + err))
      } catch (err) {
        console.error(err)
      }
    }
    else {
      try {
        Own.countDocuments(
          { name: to, taste: taste },
          async function(_err, count) {
            try {
              if (count > 0) {
                await Own.findOneAndUpdate(
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
                  .catch(err => res.status(404).json('Error when creating new own: ' + err))
              }
            } catch(err) {
              console.error(err)
            }
          }
        )

      } catch (err) {
        console.error(err)
      }
    }
  } catch (err) {
    console.error("Error all: " + err)
  }
  
})

router.route('/:name/:taste').delete((req, res) => {
  const name = req.params.name.toLowerCase()
  const taste = req.params.taste.toLowerCase()
  Own.find({name: name, taste: taste}).deleteMany()
    .then(() => res.json('Own deleted.'))
    .catch(err => ('Error: ' + err))
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