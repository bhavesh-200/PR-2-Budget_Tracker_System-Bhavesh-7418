const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  const budget = await Budget.findOne();
  const expenses = await Expense.find();
  const totalBudget = budget ? budget.amount : 0;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLeft = totalBudget - totalExpenses;
  res.render('index', { totalBudget, totalExpenses, budgetLeft, expenses });
});

router.post('/add-budget', async (req, res) => {
  await Budget.deleteMany({});
  await Budget.create({ amount: req.body.amount });
  res.redirect('/');
});

router.post('/add-expense', async (req, res) => {
  await Expense.create({ title: req.body.title, amount: req.body.amount });
  res.redirect('/');
});

router.post('/delete-expense/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

router.post('/reset', async (req, res) => {
  await Budget.deleteMany({});
  await Expense.deleteMany({});
  res.redirect('/');
});

module.exports = router;
