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

const setMember = async (id) => {
  const result = await pool.query(
    `
    UPDATE users SET membership_status = true
    WHERE id = $1
    `,
    [id]
  );
  return result.rowCount;
};

const createMsg = async (text, user_id) => {
  const result = pool.query(
    `
    INSERT INTO messages (text, timestamp, user_id)
    VALUES ($1,NOW() , $2)
    RETURNING *;
    `,
    [text, user_id]
  );
  return result.rows;
};

const getAllMsgs = async () => {
  const result = await pool.query(
    `
    SELECT messages.*, users.first_name, users.is_admin
    FROM messages
    LEFT JOIN users ON messages.user_id = users.id
    ORDER BY messages.timestamp DESC;
    `
  );
  return result.rows;
};

const deleteMsgById = async (msgId) => {
  const result = await pool.query(
    `
    DELETE FROM messages WHERE id = $1
    RETURNING *;
    `,[msgId]
  );
  return result;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  setMember,
  createMsg,
  getAllMsgs,
  deleteMsgById,
};
