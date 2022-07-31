const path = require('path');
const cors = require('cors');
const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const authentication = require('./utilities/authentication');

// app - pg
const pool = require('./pg');

// app - routes
const budgetMemberRoutes = require('./routes/budget_member_routes');
const memberLocationRoutes = require('./routes/member_location_routes');
const budgetAssistantRoutes = require('./routes/budget_assistant_routes');
const assistantLocationRoutes = require('./routes/assistant_location_routes');
const earnIncomeRoutes = require('./routes/earn_income_routes');
const spendExpenseRoutes = require('./routes/spend_expense_routes');
const askQuestionRoutes = require('./routes/ask_question_routes');
const answerRoutes = require('./routes/answer_routes');
const planBudgetPlanRoutes = require('./routes/plan_budget_plan_routes');
const budgetPlanDurationRoutes = require('./routes/budget_plan_duration_routes');
const setBudgetGoalRoutes = require('./routes/set_budget_goal_routes');
const budgetGoalDurationRoutes = require('./routes/budget_goal_duration_routes');
const planHasGoalRoutes = require('./routes/plan_has_goal_routes');
const budgetMemberGroupRoutes = require('./routes/budget_member_group_routes');
const budgetMemberBelongsToGroupRoutes = require('./routes/budget_member_belongs_to_group_routes');

// app - server
const app = express();

// app - client
app.use(express.static(path.join(__dirname, '/app/build')));

// app - middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app - session
app.use(expressSession({
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 14 * 24 * 60 * 60 * 1000 },
}));

// app - routes (authentication)
app.get('/user', authentication.isAuthenticated, async (req, res, next) => {
  res.json({ message: 'Authenticated', user: req.session.user });
});

app.post('/user/sign_in', async (req, res, next) => {
  const { email, password } = req.body;

  // can be done on frontend
  // if (email === '' || password === '') return res.json({ message: 'Please fill in all fields.' });

  try {
    const poolQuery1 = 'SELECT budget_member_id AS budgetMemberId, email, username FROM budget_member WHERE email=$1'
    const { rows: rows1 } = await pool.query(poolQuery1, [email]);
  
    const poolQuery2 = 'SELECT budget_assistant_id AS budgetAssistantId, email, username FROM budget_assistant WHERE email=$1'
    const { rows: rows2 } = await pool.query(poolQuery2, [email]);
  
    if ((rows1.length === 0) && (rows2.length === 0)) res.json({ message: `An account with email ${email} does not exist.`, user: undefined });

    if (rows1.length > 0) {
      const isValid = encryption.validatePassword(password, rows1[0].hash, rows1[0].salt);

      if (!isValid) res.json({ message: 'Password is incorrect.', user: undefined });
    
      req.session.user = {
        id: rows1[0].budgetMemberId,
        email: rows1[0].email,
        username: rows1[0].username,
      };
    
      res.json({ message: `Signed in as ${rows1[0].email}`, user: req.session.user });
    } else if (rows2.length > 0) {
      const isValid = encryption.validatePassword(password, rows2[0].hash, rows2[0].salt);
      
      if (!isValid) res.json({ message: 'Password is incorrect.', user: undefined });
    
      req.session.user = {
        id: rows2[0].budgetMemberId,
        email: rows2[0].email,
        username: rows2[0].username,
      };
    
      res.json({ message: `Signed in as ${rows2[0].email}`, user: req.session.user });
    }
  } catch(error) {
    res.json({ message: error, user: undefined });
  }
});

app.delete('/user/sign_out', async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) console.log(error);
      res.json({ message: 'Signed out.', user: req.session });
    });
  } catch(error) {
    res.json({ message: error, user: req.session });
  }
});

// app - routes (relations)
app.use('/budget_member', budgetMemberRoutes);
app.use('/member_location', memberLocationRoutes);
app.use('/budget_assistant', budgetAssistantRoutes);
app.use('/assistant_location', assistantLocationRoutes);
app.use('/earn_income', earnIncomeRoutes);
app.use('/spend_expense', spendExpenseRoutes);
app.use('/ask_question', askQuestionRoutes);
app.use('/answer', answerRoutes);
app.use('/plan_budget_plan', planBudgetPlanRoutes);
app.use('/budget_plan_duration', budgetPlanDurationRoutes);
app.use('/set_budget_goal', setBudgetGoalRoutes);
app.use('/budget_goal_duration', budgetGoalDurationRoutes);
app.use('/plan_has_goal', planHasGoalRoutes);
app.use('/budget_member_group', budgetMemberGroupRoutes);
app.use('/budget_member_belongs_to_group', budgetMemberBelongsToGroupRoutes);

// app - run
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));