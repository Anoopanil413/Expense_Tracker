const Expense = require('../models/Expense');
const User = require('../models/User')

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error getng expenses' });
  }
};


exports.addExpense = async (req, res) => {
    try {
      const { amount, category } = req.body;
      const currentMonth = new Date().getMonth() + 1
      
      let existingExpense = await Expense.findOne({
        user: req.user.userId,
        category,
        $expr: { $eq: [{ $month: '$date' }, currentMonth] }, 
      });
      console.log(currentMonth,existingExpense)
  
      if (existingExpense) {
        existingExpense.amount += Number(amount);
        await existingExpense.save();
      } else {
        const newExpense = new Expense({
          amount,
          category,
          user: req.user.userId,
        });
        await newExpense.save();
      }
  
      res.status(201).json({ message: 'Expense addedd successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error add expense' });
    }
  };
  

exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};



exports.getTotalExpensesForCurrentMonth = async (req, res) => {
    
    try {
      const currentMonth = new Date().getMonth() + 1;
      console.log("simply geting the req",req.user.userId)

      console.log(currentMonth)
      const expenses = await Expense.find({ user: mongoose.Types.ObjectId(req.user.userId) });

  
    //   const expenses = await Expense.aggregate([
    //     {
    //       $match: {
    //         user: mongoose.Types.ObjectId(req.user.userId),
    //       },
    //     },
    //   ]);
  
      const total = (expenses.length > 0) ? expenses[0].total : 0
      console.log("Heyyyy tot expense",expenses,total)
res.status(200).json({ total });
    } catch (error) {
      res.status(500).json({ message: 'Error get total expenses' });
    }
  };
  


  exports.setBudgetLimit = async (req, res) => {
    try {
      const { budgetLimit } = req.body;
      console.log(budgetLimit)
      let user = await User.findByIdAndUpdate(req.user.userId, { budgetLimit });
      res.status(200).json({ message: 'Budget limit set successfully', user});
    } catch (error) {
      res.status(500).json({ message: 'Error setting budget limit' });
    }
  };

  exports.getUser = async(req,res)=>{
    try {
      const user = await User.findById(req.user.userId)
      res.status(200).json({ message: 'user data', user});

      
    } catch (error) {
      res.status(500).json({ message: 'Error setting budget limit' });

    }
  }
