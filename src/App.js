import { Routes, Route, Link } from 'react-router-dom';

// layouts
import HomeLayout from './layouts/HomeLayout';
import QuestionsLayout from './layouts/QuestionsLayout';
import QuestionLayout from './layouts/QuestionLayout';
import BudgetPlansLayout from './layouts/BudgetPlansLayout';
import BudgetPlanLayout from './layouts/BudgetPlanLayout';
import DashboardLayout from './layouts/DashboardLayout';
import GroupsLayout from './layouts/GroupsLayout';
import GroupLayout from './layouts/GroupLayout';
import BudgetGoalsLayout from './layouts/BudgetGoalsLayout';
import BudgetGoalLayout from './layouts/BudgetGoalLayout';
import IncomeTransactionsLayout from './layouts/IncomeTransactionsLayout';
import IncomeTransactionLayout from './layouts/IncomeTransactionLayout';
import ExpenseTransactionsLayout from './layouts/ExpenseTransactionsLayout';
import ExpenseTransactionLayout from './layouts/ExpenseTransactionLayout';
import BudgetMembersLayout from './layouts/BudgetMembersLayout';
import BudgetMemberLayout from './layouts/BudgetMemberLayout';
import BudgetAssistantsLayout from './layouts/BudgetAssistantsLayout';
import BudgetAssistantLayout from './layouts/BudgetAssistantLayout';

// css
import './App.css';

function App() {
  return (
    <>
      {/* <Link to="/">Home</Link>
      <br/>
      <Link to="/dashboard">Dashboard</Link>
      <br/>
      <Link to="/questions">Questions</Link>
      <br/>
      <Link to="/question">Question</Link>
      <br/>
      <Link to="/budget-plans">Budget Plans</Link>
      <br/>
      <Link to="/budget-plan">Budget Plan</Link>
      <br/>
      <Link to="/groups">Groups</Link>
      <br/>
      <Link to="/group">Group</Link>
      <br/>
      <Link to="/budget-goals">Budget Goals</Link>
      <br/>
      <Link to="/budget-goal">Budget Goal</Link>
      <br/>
      <Link to="/income-transactions">Income Transactions</Link>
      <br/>
      <Link to="/income-transaction">Income Transaction</Link>
      <br/>
      <Link to="/expense-transactions">Expense Transactions</Link>
      <br/>
      <Link to="/expense-transaction">Expense Transaction</Link>
      <br/>
      <Link to="/budget-members">Budget Members</Link>
      <br/>
      <Link to="/budget-member">Budget Member</Link>
      <br/>
      <Link to="/budget-assistants">Budget Assistants</Link>
      <br/>
      <Link to="/budget-assistant">Budget Assistant</Link>
      <br/> */}

      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="dashboard" element={<DashboardLayout />} />
        <Route path="questions" element={<QuestionsLayout />} />
        <Route path="question" element={<QuestionLayout />} />
        <Route path="budget-plans" element={<BudgetPlansLayout />} />
        <Route path="budget-plan" element={<BudgetPlanLayout />} />
        <Route path="groups" element={<GroupsLayout />} />
        <Route path="group" element={<GroupLayout />} />
        <Route path="budget-goals" element={<BudgetGoalsLayout />} />
        <Route path="budget-goal" element={<BudgetGoalLayout />} />
        <Route path="income-transactions" element={<IncomeTransactionsLayout />} />
        <Route path="income-transaction" element={<IncomeTransactionLayout />} />
        <Route path="expense-transactions" element={<ExpenseTransactionsLayout />} />
        <Route path="expense-transaction" element={<ExpenseTransactionLayout />} />
        <Route path="budget-members" element={<BudgetMembersLayout />} />
        <Route path="budget-member" element={<BudgetMemberLayout />} />
        <Route path="budget-assistants" element={<BudgetAssistantsLayout />} />
        <Route path="budget-assistant" element={<BudgetAssistantLayout />} />
      </Routes>
    </>
  );
}

export default App;