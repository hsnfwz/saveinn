const { Pool } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:5432/test';
const pool = new Pool({ connectionString });

module.exports = pool;