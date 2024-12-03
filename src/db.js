import pg from 'pg';
import {
  DB_NAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from './config.js';

/*
const pool = new pg.Pool({
  host: 'db',
  port: 5432,
  user: 'user123',
  password: 'password123',
  database: "db123"
});
*/

const pool = new pg.Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

export default pool;
