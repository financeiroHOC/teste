
import React, { useState, useCallback, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ChatPage } from './pages/ChatPage';
import { AccountsPage } from './pages/AccountsPage'; // New
import { AccountModal } from './components/AccountModal'; // New
import { TransactionModal } from './components/TransactionModal';
import { Transaction, TransactionType, Category, Account, AccountType, Budget, FinancialGoal, RecurringTransaction } from './types';
import { DEFAULT_CATEGORIES, INITIAL_TRANSACTIONS, DEFAULT_CURRENCY } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import { useSidebarVisibility } from './hooks/useSidebarVisibility';

// Initial default accounts for demonstration
const INITIAL_ACCOUNTS: Account[] = [
  { id: 'acc_initial_checking', name: 'Conta Corrente Principal', type: AccountType.CHECKING, initialBalance: 1500, currency: DEFAULT_CURRENCY, createdAt: new Date().toISOString() },
  { id: 'acc_initial_savings', name: 'Poupança Sonhos', type: AccountType.SAVINGS, initialBalance: 3000, currency: DEFAULT_CURRENCY, createdAt: new Date().toISOString() },
  { id: 'acc_initial_credit_card', name: 'Cartão de Crédito Gold', type: AccountType.CREDIT_CARD, initialBalance: 0, currency: DEFAULT_CURRENCY, createdAt: new Date().toISOString() },
];


const App: React.FC = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', INITIAL_TRANSACTIONS);
  const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', INITIAL_ACCOUNTS);
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', []);
  const [financialGoals, setFinancialGoals] = useLocalStorage<FinancialGoal[]>('financialGoals', []);
  const [recurringTransactions, setRecurringTransactions] = useLocalStorage<RecurringTransaction[]>('recurringTransactions', []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | undefined>(undefined);

  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isSidebarVisible, toggleSidebarVisibility] = useSidebarVisibility(true);

  const availableCategories = DEFAULT_CATEGORIES;

  // Transaction Modal
  const handleOpenTransactionModal = useCallback((transactionToEdit?: Transaction) => {
    setEditingTransaction(transactionToEdit);
    setIsModalOpen(true);
  }, []);

  const handleCloseTransactionModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTransaction(undefined);
  }, []);

  const handleSaveTransaction = useCallback((transactionData: Omit<Transaction, 'id'> & { id?: string }) => {
    if (!transactionData.accountId) {
        alert("Uma conta deve ser selecionada para a transação.");
        return;
    }
    if (transactionData.id) {
      setTransactions(prev => prev.map(t => t.id === transactionData.id ? { ...t, ...transactionData } as Transaction : t));
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: `txn_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`,
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
    handleCloseTransactionModal();
  }, [setTransactions, handleCloseTransactionModal]);

  const handleDeleteTransaction = useCallback((id: string) => {
    if (window.confirm('Você tem certeza que deseja excluir esta transação?')) {
        setTransactions(prev => prev.filter(t => t.id !== id));
    }
  }, [setTransactions]);

  // Account Modal
  const handleOpenAccountModal = useCallback((accountToEdit?: Account) => {
    setEditingAccount(accountToEdit);
    setIsAccountModalOpen(true);
  }, []);

  const handleCloseAccountModal = useCallback(() => {
    setIsAccountModalOpen(false);
    setEditingAccount(undefined);
  }, []);

  const handleSaveAccount = useCallback((accountData: Omit<Account, 'id' | 'createdAt'> & { id?: string }) => {
    if (accountData.id) {
      setAccounts(prev => prev.map(acc => acc.id === accountData.id ? { ...acc, ...accountData } as Account : acc));
    } else {
      const newAccount: Account = {
        ...accountData,
        id: `acc_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      setAccounts(prev => [newAccount, ...prev]);
    }
    handleCloseAccountModal();
  }, [setAccounts, handleCloseAccountModal]);

  const handleDeleteAccount = useCallback((id: string) => {
    const transactionsExist = transactions.some(t => t.accountId === id);
    if (transactionsExist) {
        alert("Não é possível excluir esta conta pois existem transações associadas a ela. Por favor, reatribua ou exclua essas transações primeiro.");
        return;
    }
    if (window.confirm('Você tem certeza que deseja excluir esta conta?')) {
        setAccounts(prev => prev.filter(acc => acc.id !== id));
    }
  }, [setAccounts, transactions]);


  const handleImportTransactions = useCallback((importedTransactions: Omit<Transaction, 'id' | 'accountId'>[]) => {
    if (accounts.length === 0) {
      alert("Por favor, crie pelo menos uma conta antes de importar transações.");
      return;
    }
    const defaultAccountId = accounts[0].id; // Assign to the first available account

    const newTransactionsWithIds: Transaction[] = importedTransactions.map(t => ({
      ...t,
      id: `txn_imported_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`,
      accountId: defaultAccountId, 
      imported: true,
    }));
    setTransactions(prev => [...newTransactionsWithIds, ...prev]);
    alert(`${newTransactionsWithIds.length} transações importadas com sucesso para a conta "${accounts[0].name}"!`);
  }, [setTransactions, accounts]);

  const PlaceholderPage: React.FC<{title: string; comingSoon?: boolean}> = ({title, comingSoon = false}) => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-50 mb-4">{title}</h1>
      <div className="bg-white dark:bg-neutral-850 p-6 rounded-2xl shadow-xl">
        <p className="text-neutral-600 dark:text-neutral-300">
            {comingSoon ? "Esta funcionalidade está em desenvolvimento e estará disponível em breve. " : "Esta página é um placeholder para conteúdo futuro. "}
            Explore outras seções para funcionalidades completas.
        </p>
      </div>
    </div>
  );

  return (
    <HashRouter>
      <div className={`flex h-screen bg-transparent text-neutral-800 ${isDarkMode ? 'dark dark:text-neutral-200' : 'light'}`}>
        <Sidebar isSidebarVisible={isSidebarVisible} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onAddTransactionClick={() => handleOpenTransactionModal()}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            toggleSidebar={toggleSidebarVisibility}
            isSidebarVisible={isSidebarVisible}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<DashboardPage transactions={transactions} categories={availableCategories} accounts={accounts} budgets={budgets} financialGoals={financialGoals} />} />
              <Route path="/dashboard/health" element={<PlaceholderPage title="Painel de Saúde Financeira" comingSoon />} />
              <Route path="/dashboard/analytics" element={<PlaceholderPage title="Análises Detalhadas" comingSoon />} />
              <Route
                path="/accounts"
                element={<AccountsPage
                            accounts={accounts}
                            transactions={transactions}
                            onEditAccount={handleOpenAccountModal}
                            onDeleteAccount={handleDeleteAccount}
                            onAddAccount={() => handleOpenAccountModal()}
                          />}
              />
              <Route
                path="/transactions"
                element={<TransactionsPage
                            transactions={transactions}
                            accounts={accounts}
                            onDelete={handleDeleteTransaction}
                            onEdit={handleOpenTransactionModal}
                            onImportTransactions={handleImportTransactions}
                          />}
              />
              <Route path="/recurring" element={<PlaceholderPage title="Transações Recorrentes" comingSoon />} />
              <Route path="/budgets" element={<PlaceholderPage title="Orçamentos" comingSoon />} />
              <Route path="/goals" element={<PlaceholderPage title="Metas Financeiras" comingSoon />} />
              <Route path="/reports" element={<ReportsPage transactions={transactions} categories={availableCategories} accounts={accounts} />} />
              <Route path="/chat" element={<ChatPage transactions={transactions} accounts={accounts} />} />
              <Route path="/settings/preferences" element={<PlaceholderPage title="Configurações e Preferências" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={handleCloseTransactionModal}
          onSave={handleSaveTransaction}
          categories={availableCategories}
          accounts={accounts} // Pass accounts
          transactionToEdit={editingTransaction}
        />
      )}
      {isAccountModalOpen && (
        <AccountModal
            isOpen={isAccountModalOpen}
            onClose={handleCloseAccountModal}
            onSave={handleSaveAccount}
            accountToEdit={editingAccount}
        />
      )}
    </HashRouter>
  );
};

export default App;
