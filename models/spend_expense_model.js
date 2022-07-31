const pool = require('../pg');

const SpendExpenseModel = {};

SpendExpenseModel.getAllRows = async (budgetMemberId) => {
  try {
    let rows = [];

    if (budgetMemberId) {
      const poolQuery = 'SELECT * FROM spend_expense WHERE budget_member_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [budgetMemberId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT * FROM spend_expense';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.getRowById = async (spendExpenseId) => {
  try {
    const poolQuery = 'SELECT * FROM spend_expense WHERE spend_expense_id=$1';
    const { rows } = await pool.query(poolQuery, [spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.insertRow = async (data) => {
  const {
    budgetMemberId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'INSERT INTO spend_expense (budget_member_id, amount, title, description, category) VALUES ($1, $2, $3, $4, $5)';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, amount, title, description, category]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.updateRowById = async (spendExpenseId, data) => {
  const {
    budgetMemberId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'UPDATE spend_expense SET (budget_member_id, amount, title, description, category) = ($1, $2, $3, $4, $5) WHERE spend_expense_id=$6';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, amount, title, description, category, spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.deleteRowById = async (spendExpenseId) => {
  try {
    const poolQuery = 'DELETE FROM spend_expense WHERE spend_expense_id=$1';
    const { rows } = await pool.query(poolQuery, [spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = SpendExpenseModel;
