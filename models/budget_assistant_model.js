const pool = require('../pg');
const encryption = require('../utilities/encryption');

const BudgetAssistantModel = {};

BudgetAssistantModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT * FROM budget_assistant';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.getRowById = async (budgetAssistantId) => {
  try {
    const poolQuery = 'SELECT * FROM budget_assistant WHERE budget_assistant_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.insertRow = async (data) => {
  const {
    email,
    username,
    password,
    // confirmPassword,
    firstName,
    lastName,
    areaOfExpertise,
    postalCode,
    yearsOfExperience,
  } = data;

  // can be done on the frontend
  // if (email === '' || username === '' || password === '' || confirmPassword === '') return res.json({ message: 'Please fill in all fields.' });
    // can be done on the frontend
  // if (username.length < 8 || username.length > 20) return res.json({ message: 'Username must be between 8 and 20 characters long.', isSuccessful: 0 });
  // if (password.length < 8 || password.length > 20) return res.json({ message: 'Password must be between 8 and 20 characters long.', isSuccessful: 0 });
  // if (confirmPassword !== password) return res.json({ message: 'Passwords do not match.', isSuccessful: 0 });

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
  
    const poolQuery3 = 'INSERT INTO budget_assistant (username, email, salt, hash, first_name, last_name, employment_position, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  
    const { rows: rows3 } = pool.query(poolQuery3, [username, email, salt, hash, firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updateRowById = async (budgetAssistantId, data) => {
  const {
    firstName,
    lastName,
    employmentPosition,
    postalCode,
  } = data;

  try {  
    const poolQuery = 'UPDATE budget_assistant SET (first_name, last_name, employment_position, postal_code) = ($1, $2, $3, $4) WHERE budget_assistant_id=$5';
    const { rows } = pool.query(poolQuery, [firstName, lastName, employmentPosition, postalCode, budgetAssistantId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updateEmail = async (budgetAssistantId, data) => {
  const { email } = data;

  try {
    const poolQuery1 = 'SELECT * FROM budget_member WHERE email=$1';
    const { rows: rows1 } = await pool.query(poolQuery1, [email]);
  
    if (rows1.length > 0 && (rows1[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
    const poolQuery2 = 'SELECT * FROM budget_assistant WHERE email=$1';
    const { rows: rows2 } = await pool.query(poolQuery2, [email]);
  
    if (rows2.length > 0 && (rows2[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
    const poolQuery3 = 'UPDATE budget_assistant SET email=$1 WHERE budget_assistant_id=$2';
  
    const { rows: rows3 } = pool.query(poolQuery3, [email, budgetAssistantId]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updateUsername = async (budgetAssistantId, data) => {
  const { username } = data;

  try {
    const poolQuery1 = 'SELECT * FROM budget_member WHERE username=$1';
    const { rows: rows1 } = await pool.query(poolQuery1, [username]);
  
    if (rows1.length > 0 && (rows1[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const poolQuery2 = 'SELECT * FROM budget_assistant WHERE username=$1';
    const { rows: rows2 } = await pool.query(poolQuery2, [username]);
  
    if (rows2.length > 0 && (rows2[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const poolQuery3 = 'UPDATE budget_assistant SET username=$1 WHERE budget_assistant_id=$2';
  
    const { rows: rows3 } = pool.query(poolQuery3, [username, budgetAssistantId]);

    return { message: 'Success', rows: rows3 };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updatePassword = async (budgetAssistantId, data) => {
  const { password } = data;

  try {
    const encryptedPassword = await encryption.generatePassword(password);
    const salt = encryptedPassword.salt;
    const hash = encryptedPassword.hash;

    const poolQuery = 'UPDATE budget_assistant SET (salt, hash) = ($1, $2) WHERE budget_assistant_id=$3';

    const { rows } = pool.query(poolQuery, [salt, hash, budgetAssistantId]);

    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.deleteRowById = async (budgetAssistantId) => {
  try {
    const poolQuery = 'DELETE FROM budget_assistant WHERE budget_assistant_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = BudgetAssistantModel;
