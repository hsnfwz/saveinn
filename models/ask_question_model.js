const pool = require('../pg');

const AskQuestionModel = {};

AskQuestionModel.getAllRows = async (budgetMemberId) => {
  try {
    let rows = [];

    if (budgetMemberId) {
      const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", budget_member_id AS "budgetMemberId" FROM ask_question WHERE budget_member_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [budgetMemberId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", budget_member_id AS "budgetMemberId" FROM ask_question';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.getRowById = async (askQuestionId) => {
  try {
    const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", budget_member_id AS "budgetMemberId" FROM ask_question WHERE ask_question_id=$1';
    const { rows } = await pool.query(poolQuery, [askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.insertRow = async (data) => {
  const {
    budgetMemberId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'INSERT INTO ask_question (budget_member_id, title, description) VALUES ($1, $2, $3)';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, title, description]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.updateRowById = async (askQuestionId, data) => {
  const {
    budgetMemberId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'UPDATE ask_question SET (budget_member_id, title, description) = ($1, $2, $3) WHERE ask_question_id=$4';
    const { rows } = await pool.query(poolQuery, [budgetMemberId, title, description, askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.deleteRowById = async (askQuestionId) => {
  try {
    const poolQuery = 'DELETE FROM ask_question WHERE ask_question_id=$1';
    const { rows } = await pool.query(poolQuery, [askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = AskQuestionModel;
