const router = require('express').Router()

module.exports = db => {
  const Controller = require('../controllers/bookController')()
  // Pages
  router.get('/books', Controller.getDbBooks)
  router.post('/books/:id', Controller.saveDbBook)
  router.delete('/books/:id', Controller.deleteDbBook)
  router.get('/detail/:id', Controller.googleBookById)
  router.get('/search/:str', Controller.googleBooks)

  return router
}