const express = require('express');
const EarnIncomeController = require('../controllers/earn_income_controller');

const router = express.Router();

router.get('/', EarnIncomeController.handleGetAllRows);
router.get('/:id', EarnIncomeController.handleGetRowById);
router.post('/', EarnIncomeController.handleInsertRow);
router.put('/:id', EarnIncomeController.handleUpdateRowById);
router.delete('/:id', EarnIncomeController.handleDeleteRowById);
router.all('*', EarnIncomeController.handle404NotFound);

module.exports = router;
