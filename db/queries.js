const pool = require("./pool")

// USERS
async function createUser({ firstName, lastName, username, passwordHash }) {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password_hash)
     VALUES ($1,$2,$3,$4)
     RETURNING id, first_name, last_name, username, membership_status`,
    [firstName, lastName, username, passwordHash]
  )
  return rows[0]
}

async function findUserByUsername(username) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username=$1`, [
    username,
  ])
  return rows[0]
}

async function findUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id=$1`, [id])
  return rows[0]
}

async function setMembershipStatus(userId, status) {
  await pool.query(`UPDATE users SET membership_status=$1 WHERE id=$2`, [
    status,
    userId,
  ])
}

async function setAdmin(userId, status) {
  await pool.query(`UPDATE users SET admin=$1 WHERE id=$2`, [status, userId])
}

// MESSAGES
async function createMessage({ title, text, userId }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (title, text, user_id)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [title, text, userId]
  )
  return rows[0]
}

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT m.id, m.title, m.text, m.created_at, m.user_id,
            u.first_name, u.last_name
     FROM messages m
     JOIN users u ON u.id = m.user_id
     ORDER BY m.created_at DESC`
  )
  return rows
}

async function deleteMessage(messageId) {
  await pool.query(`DELETE FROM messages WHERE id=$1`, [messageId])
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  setMembershipStatus,
  setAdmin,
  createMessage,
  getAllMessages,
  deleteMessage,
}
