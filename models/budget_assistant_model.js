// const pool = require('../pg');
// const encryption = require('../utilities/encryption');

// const BudgetAssistantModel = {};

// BudgetAssistantModel.getAllRows = async () => {
//   try {
//     const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant';
//     const { rows } = await pool.query(poolQuery);
//     return { message: 'Success', rows };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.getRowById = async (budgetAssistantId) => {
//   try {
//     const poolQuery = 'SELECT email, username, first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant WHERE budget_assistant_id=$1';
//     const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
//     return { message: 'Success', row: rows[0] };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.insertRow = async (data) => {
//   const {
//     email,
//     username,
//     password,
//     firstName,
//     lastName,
//     areaOfExpertise,
//     postalCode,
//     yearsOfExperience,
//   } = data;

//   try {
//     const poolQuery1 = 'SELECT * FROM budget_member WHERE email=$1 OR username=$2';
//     const { rows: rows1 } = await pool.query(poolQuery1, [email, username]);
  
//     if (rows1.length > 0 && (rows1[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
//     if (rows1.length > 0 && (rows1[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
//     const poolQuery2 = 'SELECT * FROM budget_assistant WHERE email=$1 OR username=$2';
//     const { rows: rows2 } = await pool.query(poolQuery2, [email, username]);
  
//     if (rows2.length > 0 && (rows2[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
//     if (rows2.length > 0 && (rows2[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
//     const encryptedPassword = await encryption.generatePassword(password);
//     const salt = encryptedPassword.salt;
//     const hash = encryptedPassword.hash;
  
//     const poolQuery3 = 'INSERT INTO budget_assistant (username, email, salt, hash, first_name, last_name, area_of_expertise, postal_code, years_of_experience) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
  
//     const { rows: rows3 } = await pool.query(poolQuery3, [username, email, salt, hash, firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience]);

//     return { message: 'Success', rows: rows3 };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.updateRowById = async (budgetAssistantId, data) => {
//   const {
//     firstName,
//     lastName,
//     areaOfExpertise,
//     postalCode,
//     yearsOfExperience
//   } = data;

//   try {  
//     const poolQuery = 'UPDATE budget_assistant SET (first_name, last_name, area_of_expertise, postal_code, years_of_experience) = ($1, $2, $3, $4, $5) WHERE budget_assistant_id=$6';
//     const { rows } = await pool.query(poolQuery, [firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience, budgetAssistantId]);
//     return { message: 'Success', rows };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.updateEmail = async (budgetAssistantId, data) => {
//   const { email } = data;

//   try {
//     const poolQuery1 = 'SELECT * FROM budget_member WHERE email=$1';
//     const { rows: rows1 } = await pool.query(poolQuery1, [email]);
  
//     if (rows1.length > 0 && (rows1[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
//     const poolQuery2 = 'SELECT * FROM budget_assistant WHERE email=$1';
//     const { rows: rows2 } = await pool.query(poolQuery2, [email]);
  
//     if (rows2.length > 0 && (rows2[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
//     const poolQuery3 = 'UPDATE budget_assistant SET email=$1 WHERE budget_assistant_id=$2';
  
//     const { rows: rows3 } = await pool.query(poolQuery3, [email, budgetAssistantId]);

//     return { message: 'Success', rows: rows3 };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.updateUsername = async (budgetAssistantId, data) => {
//   const { username } = data;

//   try {
//     const poolQuery1 = 'SELECT * FROM budget_member WHERE username=$1';
//     const { rows: rows1 } = await pool.query(poolQuery1, [username]);
  
//     if (rows1.length > 0 && (rows1[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
//     const poolQuery2 = 'SELECT * FROM budget_assistant WHERE username=$1';
//     const { rows: rows2 } = await pool.query(poolQuery2, [username]);
  
//     if (rows2.length > 0 && (rows2[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
//     const poolQuery3 = 'UPDATE budget_assistant SET username=$1 WHERE budget_assistant_id=$2';
  
//     const { rows: rows3 } = await pool.query(poolQuery3, [username, budgetAssistantId]);

//     return { message: 'Success', rows: rows3 };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.updatePassword = async (budgetAssistantId, data) => {
//   const { password } = data;

//   try {
//     const encryptedPassword = await encryption.generatePassword(password);
//     const salt = encryptedPassword.salt;
//     const hash = encryptedPassword.hash;

//     const poolQuery = 'UPDATE budget_assistant SET (salt, hash) = ($1, $2) WHERE budget_assistant_id=$3';

//     const { rows } = await pool.query(poolQuery, [salt, hash, budgetAssistantId]);

//     return { message: 'Success', rows };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// BudgetAssistantModel.deleteRowById = async (budgetAssistantId) => {
//   try {
//     const poolQuery = 'DELETE FROM budget_assistant WHERE budget_assistant_id=$1';
//     const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
//     return { message: 'Success', rows };
//   } catch(error) {
//     return { message: error, rows: [] };
//   }
// }

// module.exports = BudgetAssistantModel;









const pool = require('../pg');

const BudgetAssistantModel = {};

BudgetAssistantModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.getRowById = async (budgetAssistantId) => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant WHERE budget_assistant_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.insertRow = async (data) => {
  const {
    firstName,
    lastName,
    areaOfExpertise,
    postalCode,
    yearsOfExperience,
  } = data;

  try {
    const poolQuery = 'INSERT INTO budget_assistant (first_name, last_name, area_of_expertise, postal_code, years_of_experience) VALUES ($1, $2, $3, $4, $5) RETURNING budget_assistant_id AS "budgetAssistantId"';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updateRowById = async (budgetAssistantId, data) => {
  const {
    firstName,
    lastName,
    areaOfExpertise,
    postalCode,
    yearsOfExperience
  } = data;

  try {  
    const poolQuery = 'UPDATE budget_assistant SET (first_name, last_name, area_of_expertise, postal_code, years_of_experience) = ($1, $2, $3, $4, $5) WHERE budget_assistant_id=$6';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience, budgetAssistantId]);
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
