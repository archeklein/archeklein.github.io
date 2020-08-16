// Import database
const knex = require('./../db')

// Retrieve all cataloged items
exports.catalogAll = async (req, res) => {
    knex.select('*') // select all records
        .from('catalog') // from 'books' table
        .then((userData) => {
            // Send books extracted from database in response
            res.json(userData)
        })
        .catch((err) => {
            // Send a error message in response
            res.json({
                message: `There was an error retrieving catalog item: ${err}`,
            })
        })
}

exports.catalogCreate = async (req, res) => {
    knex('catalog')
        .insert({
            variantId: req.body.variantId,
            quantity: 0,
        })
        .then(() => {
            res.json({
                message: `Item '${req.body.variantId}' cataloged.`,
            })
        })
        .catch((err) => {
            res.json({
                message: `There was an error creating ${req.body.variantId}: ${err}`,
            })
        })
}

exports.catalogDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('catalog')
        .where('variantId', req.body.variantId) // find correct record based on id
        .del() // delete the record
        .then(() => {
            // Send a success message in response
            res.json({ message: `Variant ${req.body.variantId} deleted.` })
        })
        .catch((err) => {
            // Send a error message in response
            res.json({
                message: `There was an error deleting catalog: ${err}`,
            })
        })
}

exports.quantityUpdate = async (req, res) => {
    knex('catalog')
        .where('variantId', req.body.variantId)
        .update({ quantity: req.body.quantity })
        .then(() => {
            res.json({ message: `Quantity is updated to ${req.body.quantity}` })
        })
        .catch((err) => {
            res.json({
                message: `Quantity not updated`,
            })
        })
}

exports.catalogReset = async (req, res) => {
    knex.select('*') // select all records
        .from('catalog') // from 'catalog' table
        .truncate() // remove the selection
        .then(() => {
            // Send a success message in response
            res.json({ message: 'Catalog list cleared.' })
        })
        .catch((err) => {
            // Send a error message in response
            res.json({
                message: `There was an error resetting catalog list: ${err}.`,
            })
        })
}
