import { Routes, Route, Link } from 'react-router-dom';

// layouts
import HomeLayout from './layouts/HomeLayout';
import QuestionsLayout from './layouts/QuestionsLayout';
import AnswersLayout from './layouts/AnswersLayout';
import BudgetPlansLayout from './layouts/BudgetPlansLayout';
import DashboardLayout from './layouts/DashboardLayout';
import GroupsLayout from './layouts/GroupsLayout';
import GroupLayout from './layouts/GroupLayout';
import BudgetGoalsLayout from './layouts/BudgetGoalsLayout';
import IncomeTransactionsLayout from './layouts/IncomeTransactionsLayout';
import ExpenseTransactionsLayout from './layouts/ExpenseTransactionsLayout';
import BudgetMembersLayout from './layouts/BudgetMembersLayout';
import BudgetMemberLayout from './layouts/BudgetMemberLayout';
import BudgetAssistantsLayout from './layouts/BudgetAssistantsLayout';
import BudgetAssistantLayout from './layouts/BudgetAssistantLayout';
import ErrorLayout from './layouts/ErrorLayout';

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
      <Link to="/income-transactions">Income Transactions</Link>
      <br/>
      <Link to="/expense-transactions">Expense Transactions</Link>
      <br/>
      <Link to="/budget-plans">Budget Plans</Link>
      <br/>
      <Link to="/groups">Groups</Link>
      <br/>
      <Link to="/group">Group</Link>
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
        <Route path="questions/:id" element={<AnswersLayout />} />
        <Route path="income-transactions" element={<IncomeTransactionsLayout />} />
        <Route path="expense-transactions" element={<ExpenseTransactionsLayout />} />
        <Route path="budget-goals" element={<BudgetGoalsLayout />} />
        <Route path="budget-plans" element={<BudgetPlansLayout />} />
        <Route path="budget-plans/:id" element={<BudgetGoalsLayout />} />
        <Route path="budget-members" element={<BudgetMembersLayout />} />
        <Route path="budget-member" element={<BudgetMemberLayout />} />
        <Route path="budget-assistants" element={<BudgetAssistantsLayout />} />
        <Route path="budget-assistant" element={<BudgetAssistantLayout />} />
        <Route path="groups" element={<GroupsLayout />} />
        <Route path="groups/:id" element={<GroupLayout />} />
        <Route path="*" element={<ErrorLayout />} />
      </Routes>
    </>
  );
}

export default App;