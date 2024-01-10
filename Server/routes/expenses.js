const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middlewares/authToken');

router.get('/getAll', authenticateToken, expenseController.getAllExpenses);
router.post('/add', authenticateToken, expenseController.addExpense);
router.delete('/delete/:id', authenticateToken, expenseController.deleteExpense);
router.get('/total', authenticateToken, expenseController.getTotalExpensesForCurrentMonth);
router.post('/budget/set', authenticateToken, expenseController.setBudgetLimit);
router.get('/user',authenticateToken,expenseController.getUser)



module.exports = router;