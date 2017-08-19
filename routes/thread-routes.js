var express = require('express')
var router = express.Router()
var threads = require('../models/thread')
var comments = require('../models/comment')

//Standard routes get/push/put/delete 
//For Thread Use
router
  .get('/', (req, res, next) => {
    threads.find({})
      .then(threads => {
        res.send(threads)
      })
      .catch(next)
  })

  // CUSTOM ROUTES
  //for Threads by ID
  .get('/:id', (req, res, next) => {
    threads.findById(req.params.id)
      .then(threads => {
        res.send(threads)
      }).catch(next)
  })

  //Routes for Comments
  .get('/:id/comments', (req, res, next) => {
    comments.find({ threadId: req.params.id })
      .then(comments => {
        res.send(comments)
      }).catch(next)
  })

router
  .post('/', (req, res, next) => {
    threads.create(req.body)
      .then(threads => {
        if (req.session.uid) {
          res.send(threads)
        }
      }).catch(next)
  })
  .put('/:id', (req, res, next) => {
    var id = req.params.id
    threads.findByIdAndUpdate(id, req.body)
      .then(threads => {
        if (req.session.uid) {
          res.send({ message: 'Successfully Updated' })
        }
      }).catch(next)
  })
  .delete('/:id', (req, res, next) => {
    threads.findByIdAndRemove(req.params.id)
      .then(threads => {
        if (req.session.uid) {
          res.send({ message: 'Successfully Removed' })
        }
      }).catch(next)
  })

  .post('/:id/comments', (req, res, next) => {
    comments.create(req.body)
      .then(comment => {
        if (req.session.uid) {
          res.send(comment)
        }
      }).catch(next)
  })

  .delete('/:id/comments/:commentId', (req, res, next) => {
    comments.findByIdAndRemove(req.params.commentId)
      .then(comment => {
        if (req.session.uid) {
          res.send({ message: 'Successfully Removed' })
        }
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
