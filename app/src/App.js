import { Routes, Route } from 'react-router-dom';

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
import RegistrationLayout from './layouts/RegistrationLayout';
import LogInLayout from './layouts/LogInLayout';
import ErrorLayout from './layouts/ErrorLayout';

// context
import { AuthContext } from './context/AuthContext';

// css
import './App.css';
import { useContext } from 'react';

function App() {
  const auth = useContext(AuthContext);

  return (
    // <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="dashboard" element={auth.user ? <DashboardLayout /> : <LogInLayout />} />
        <Route path="questions" element={<QuestionsLayout />} />
        <Route path="questions/:id" element={<AnswersLayout />} />
        <Route path="income-transactions" element={<IncomeTransactionsLayout />} />
        <Route path="expense-transactions" element={<ExpenseTransactionsLayout />} />
        <Route path="budget-goals" element={<BudgetGoalsLayout />} />
        <Route path="budget-plans" element={<BudgetPlansLayout />} />
        <Route path="budget-plans/:id" element={<BudgetGoalsLayout />} />
        <Route path="budget-members" element={<BudgetMembersLayout />} />
        <Route path="budget-members/:id" element={<BudgetMemberLayout />} />
        <Route path="budget-assistants" element={<BudgetAssistantsLayout />} />
        <Route path="budget-assistants/:id" element={<BudgetAssistantLayout />} />
        <Route path="sign-up" element={<RegistrationLayout/>}/>
        <Route path="log-in" element={auth.user ? <DashboardLayout /> : <LogInLayout />} />
        <Route path="groups" element={<GroupsLayout />} />
        <Route path="groups/:id" element={<GroupLayout />} />
        <Route path="*" element={<ErrorLayout />} />
      </Routes>
    // </AuthProvider>
  );
}

export default App;