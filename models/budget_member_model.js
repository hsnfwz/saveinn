const pool = require('../pg');
const encryption = require('../utilities/encryption');

const BudgetMemberModel = {};

BudgetMemberModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", employment_position AS "employmentPosition", postal_code AS "postalCode", budget_member_id AS "budgetMemberId" FROM budget_member';
    const { rows } = await pool.query(poolQuery);
    console.log(rows);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.getRowById = async (budgetMemberId) => {
  try {
    const poolQuery = 'SELECT email, username, first_name AS "firstName", last_name AS "lastName", employment_position AS "employmentPosition", postal_code AS "postalCode", budget_member_id AS "budgetMemberId" FROM budget_member WHERE budget_member_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetMemberId]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.insertRow = async (data) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    employmentPosition,
    postalCode,
  } = data;

  try {
    const poolQuery1 = 'SELECT * FROM budget_member WHERE email=$1 OR username=$2';
    const { rows: rows1 } = await pool.query(poolQuery1, [email, username]);
  
    if (rows1.length > 0 && (rows1[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
    if (rows1.length > 0 && (rows1[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const poolQuery2 = 'SELECT * FROM budget_assistant WHERE email=$1 OR username=$2';
    const { rows: rows2 } = await pool.query(poolQuery2, [email, username]);
  
    if (rows2.length > 0 && (rows2[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
    if (rows2.length > 0 && (rows2[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const encryptedPassword = await encryption.generatePassword(password);
    const salt = encryptedPassword.salt;
    const hash = encryptedPassword.hash;
  
    const poolQuery3 = 'INSERT INTO budget_member (username, email, salt, hash, first_name, last_name, employment_position, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  
    const { rows: rows3 } = pool.query(poolQuery3, [username, email, salt, hash, firstName, lastName, employmentPosition, postalCode]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.updateRowById = async (budgetMemberId, data) => {
  const {
    firstName,
    lastName,
    employmentPosition,
    postalCode,
  } = data;

  try {  
    const poolQuery = 'UPDATE budget_member SET (first_name, last_name, employment_position, postal_code) = ($1, $2, $3, $4) WHERE budget_member_id=$5';
    const { rows } = pool.query(poolQuery, [firstName, lastName, employmentPosition, postalCode, budgetMemberId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.updateEmail = async (budgetMemberId, data) => {
  const { email } = data;

  try {
    const poolQuery1 = 'SELECT * FROM budget_member WHERE email=$1';
    const { rows: rows1 } = await pool.query(poolQuery1, [email]);
  
    if (rows1.length > 0 && (rows1[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
    const poolQuery2 = 'SELECT * FROM budget_assistant WHERE email=$1';
    const { rows: rows2 } = await pool.query(poolQuery2, [email]);
  
    if (rows2.length > 0 && (rows2[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
    const poolQuery3 = 'UPDATE budget_member SET email=$1 WHERE budget_member_id=$2';
  
    const { rows: rows3 } = pool.query(poolQuery3, [email, budgetMemberId]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.updateUsername = async (budgetMemberId, data) => {
  const { username } = data;

  try {
    const poolQuery1 = 'SELECT * FROM budget_member WHERE username=$1';
    const { rows: rows1 } = await pool.query(poolQuery1, [username]);
  
    if (rows1.length > 0 && (rows1[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const poolQuery2 = 'SELECT * FROM budget_assistant WHERE username=$1';
    const { rows: rows2 } = await pool.query(poolQuery2, [username]);
  
    if (rows2.length > 0 && (rows2[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const poolQuery3 = 'UPDATE budget_member SET username=$1 WHERE budget_member_id=$2';
  
    const { rows: rows3 } = pool.query(poolQuery3, [username, budgetMemberId]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.updatePassword = async (budgetMemberId, data) => {
  const { password } = data;

  try {
    const encryptedPassword = await encryption.generatePassword(password);
    const salt = encryptedPassword.salt;
    const hash = encryptedPassword.hash;

    const poolQuery = 'UPDATE budget_member SET (salt, hash) = ($1, $2) WHERE budget_member_id=$3';

    const { rows } = pool.query(poolQuery, [salt, hash, budgetMemberId]);

    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.deleteRowById = async (budgetMemberId) => {
  try {
    const poolQuery = 'DELETE FROM budget_member WHERE budget_member_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetMemberId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = BudgetMemberModel;
