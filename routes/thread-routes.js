var express = require('express')
var router = express.Router()
var threads = require('../models/thread')


//Standard routes get/push/put/delete 
router
  .get('/', (req, res, next) => {
    threads.find({})
      .then(threads => {
        res.send(threads)
      })
      .catch(next)
  })
  .post('/', (req, res, next) => {
    threads.create(req.body)
      .then(threads => {
        res.send(threads)
      }).catch(next)
  })
  .put('/:id', (req, res, next) => {
    var id = req.params.id
    threads.findByIdAndUpdate(id, req.body)
      .then(threads => {
        res.send({ message: 'Successfully Updated' })
      }).catch(next)
  })
  .delete('/:id', (req, res, next) => {
    threads.findByIdAndRemove(req.params.id)
      .then(threads => {
        res.send({ message: 'Successfully Removed' })
      }).catch(next)
  })




// CUSTOM ROUTES
router
  .get('/:id', (req, res, next) => {
    threads.find( req.query )
      .then(threads => {
        res.send(threads)
      }).catch(next)
  })
  .get('/:id/stars/:starId', (req, res, next) => {
    stars.find({ galaxyId: req.params.id, _id: req.params.starId })
      .then(star => {
        res.send(star)
      }).catch(next)
  })
  .get('/:id/stars/:starId/planets', (req, res, next) => {
    planets.find({ starId: req.params.starId })
      .then(planets => {
        res.send(planets)
      }).catch(next)
  })
  .get('/:id/stars/:starId/planets/:planetId', (req, res, next) => {
    planets.find({ galaxyId: req.params.id, starId: req.params.starId, _id: req.params.planetId })
      .then(planet => {
        res.send(planet)
      }).catch(next)
  })
  .get('/:id/stars/:starId/planets/:planetId/moons', (req, res, next) => {
    moons.find({ galaxyId: req.params.id, starId: req.params.starId, planetId: req.params.starId })
      .then(moons => {
        res.send(moons)
      }).catch(next)
  })
  .get('/:id/stars/:starId/planets/:planetId/moons/:moonId', (req, res, next) => {
    moons.find({ galaxyId: req.params.id, starId: req.params.starId, planetId: req.params.starId, _id: req.params.moonId })
      .then(moon => {
        res.send(moon)
      }).catch(next)
  })
  .get('/:id/planets', (req, res, next) => {
    planets.find({ galaxyId: req.params.id })
      .then(planets => {
        res.send(planets)
      }).catch(next)
  })
  .get('/:id/planets/:planetId', (req, res, next) => {
    stars.find({ galaxyId: req.params.id, _id: req.params.planetId })
      .then(planet => {
        res.send(planet)
      }).catch(next)
  })

// ERROR HANDLER
router.use('/', (err, req, res, next) => {
  if (err) {
    res.send(418, {
      success: false,
      error: err.message
    })
  } else {
    res.send(400, {
      success: false,
      error: 'Something failed please try again later'
    })
  }
})

module.exports = router
