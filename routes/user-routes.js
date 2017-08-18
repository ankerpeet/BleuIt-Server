var express = require('express')
var router = express.Router()
var user = require('../models/user')

//Standard routes get/push/put/delete 
router

.get('/', (req, res, next) => {
    user.find({})
      .then(user => {
        res.send(user)
      })
      .catch(next)
  })


.post('/', (req, res, next) => {
    user.create(req.body)
      .then(user => {
        res.send("Success")
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
