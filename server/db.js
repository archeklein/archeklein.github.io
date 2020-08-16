// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true,
})

// Create a table in the database called "catalog"
knex.schema
    // Make sure no "catalog" table exists
    // before trying to create new
    .hasTable('catalog')
    .then((exists) => {
        if (!exists) {
            // If no "catalog" table exists
            // create new, with "id", "variantId"
            // and increment "id" with every new record (book)
            return knex.schema
                .createTable('catalog', (table) => {
                    table.string('variantId').primary(),
                    table.integer('quantity')
                })
                .then(() => {
                    // Log success message
                    console.log("Table 'Catalog' created")
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        // Log success message
        console.log('done')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    })
// Just for debugging purposes:
// Log all data in "books" table
knex.select('*')
    .from('catalog')
    .then((data) => console.log('data:', data))
    .catch((err) => console.log(err))
// Export the database
module.exports = knex
