require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTables() {
  try {
    console.log("Creating tables...");

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        membership_status BOOLEAN DEFAULT FALSE,
        is_admin BOOLEAN DEFAULT FALSE
      );
    `;

    const createMessagesTable = `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    await pool.query(createUsersTable);
    await pool.query(createMessagesTable);

    console.log("✅ Tables created successfully!");
  } catch (err) {
    console.error("Error creating tables: ", err);
  }
}

async function seed() {
  try {
    console.log("Starting seed...");

    await pool.query("DELETE FROM messages");
    await pool.query("DELETE FROM users");

    const users = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "hashed_password_1",
        membership_status: true,
        is_admin: false,
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        password: "hashed_password_2",
        membership_status: true,
        is_admin: true,
      },
    ];

    for (const user of users) {
      await pool.query(
        "INSERT INTO users(first_name, last_name, email, password, membership_status, is_admin) VALUES($1, $2, $3, $4, $5, $6)",
        [
          user.first_name,
          user.last_name,
          user.email,
          user.password,
          user.membership_status,
          user.is_admin,
        ]
      );
    }

    const messages = [
      {
        text: "Hello, this is a message from John!",
        user_id: 1,
      },
      {
        text: "Welcome to the platform, this is a message from Jane!",
        user_id: 2,
      },
    ];

    for (const message of messages) {
      await pool.query("INSERT INTO messages(text, user_id) VALUES($1, $2)", [
        message.text,
        message.user_id,
      ]);
    }

    console.log("✅ Data seeded successfully!");
  } catch (err) {
    console.error("Error during seeding: ", err);
  } finally {
    await pool.end();
  }
}

async function main() {
  await createTables();
  await seed();
}

main();
