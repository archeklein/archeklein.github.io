const express = require('express')
const catalogRoutes = require('./../controllers/catalog-controller.js')

// Create router
const router = express.Router()
// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get('/all', catalogRoutes.catalogAll)
// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/create', catalogRoutes.catalogCreate)
// Add route for PUT request to delete specific book
// In server.js, books route is specified as '/books'
// this means that '/delete' translates to '/books/delete'
router.put('/delete', catalogRoutes.catalogDelete)
// Add route for PUT request to reset bookshelf list
// In server.js, books route is specified as '/books'
// this means that '/reset' translates to '/books/reset'
router.put('/reset', catalogRoutes.catalogReset)
router.put('/quantity', catalogRoutes.quantityUpdate)
// Export router
module.exports = router
