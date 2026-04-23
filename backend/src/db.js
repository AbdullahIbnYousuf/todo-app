require('dotenv').config({ path: __dirname + '/../../.env' });
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing. Add it to todo-app/.env');
}

const shouldUseSsl =
  /sslmode=require/i.test(connectionString) || process.env.PGSSLMODE === 'require';

const poolConfig = { connectionString };
if (shouldUseSsl) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

module.exports = pool;