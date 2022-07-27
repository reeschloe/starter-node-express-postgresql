// const env = process.env.NODE_ENV || "development";
// const config = require("../../knexfile")[env];
const knex = require("knex")({client: 'postgresql', connection: process.env.DATABASE_URL});

module.exports = knex;