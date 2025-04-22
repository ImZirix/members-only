const pool = require("./pool");
const bcrypt = require("bcryptjs");

const createUser = async (firstName, lastName, email, plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  const result = await pool.query(
    `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [firstName, lastName, email, hashedPassword]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [id]
  );
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById };
