const pool = require('../pg');

const EarnIncomeModel = {};

EarnIncomeModel.getAllRows = async (budgetMemberId) => {
  try {
    let rows = [];

    if (budgetMemberId) {
      const poolQuery = 'SELECT * FROM earn_income WHERE budget_member_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [budgetMemberId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT * FROM earn_income';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.getRowById = async (earnIncomeId) => {
  try {
    const poolQuery = 'SELECT * FROM earn_income WHERE earn_income_id=$1';
    const { rows } = await pool.query(poolQuery, [earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.insertRow = async (data) => {
  const {
    budgetMemberId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'INSERT INTO earn_income (budget_member_id, amount, title, description, category) VALUES ($1, $2, $3, $4, $5)';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, amount, title, description, category]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.updateRowById = async (earnIncomeId, data) => {
  const {
    budgetMemberId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'UPDATE earn_income SET (budget_member_id, amount, title, description, category) = ($1, $2, $3, $4, $5) WHERE earn_income_id=$6';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, amount, title, description, category, earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.deleteRowById = async (earnIncomeId) => {
  try {
    const poolQuery = 'DELETE FROM earn_income WHERE earn_income_id=$1';
    const { rows } = await pool.query(poolQuery, [earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = EarnIncomeModel;
