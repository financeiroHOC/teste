
import React, { useMemo } from 'react';
import { Account, Transaction, TransactionType } from '../types';
import { PlusCircleIcon, PencilSquareIcon, TrashIcon, BanknotesIcon } from '../components/icons';
import { CURRENCY_SYMBOL } from '../constants';

interface AccountsPageProps {
  accounts: Account[];
  transactions: Transaction[];
  onAddAccount: () => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (id: string) => void;
}

const formatCurrency = (value: number) => 
    `${CURRENCY_SYMBOL}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const AccountsPage: React.FC<AccountsPageProps> = ({ accounts, transactions, onAddAccount, onEditAccount, onDeleteAccount }) => {

  const accountsWithBalances = useMemo(() => {
    return accounts.map(acc => {
      const accountTransactions = transactions.filter(t => t.accountId === acc.id);
      const income = accountTransactions
        .filter(t => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = accountTransactions
        .filter(t => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);
      
      // For transfers, if it's an expense, it's outgoing. If it's income, it's incoming.
      // This simple model assumes transfer are recorded as Expense from source, Income to dest.
      // A more robust transfer system might mark them differently.
      // For now, initialBalance + income - expense is the primary calculation.

      const balance = acc.initialBalance + income - expenses;
      return { ...acc, currentBalance: balance };
    }).sort((a,b) => a.name.localeCompare(b.name));
  }, [accounts, transactions]);

  const totalNetWorth = useMemo(() => {
    return accountsWithBalances.reduce((sum, acc) => {
        // Credit cards often represent debt, so their balance might be subtracted or handled differently based on convention
        if (acc.type === AccountType.CREDIT_CARD || acc.type === AccountType.LOAN) {
            return sum - acc.currentBalance; // If balance is positive on card, it's debt
        }
        return sum + acc.currentBalance;
    },0);
  }, [accountsWithBalances]);


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-50">Gerenciamento de Contas</h2>
        <button
            onClick={onAddAccount}
            className="mt-4 sm:mt-0 flex items-center bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-darker text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 ease-in-out text-sm transform hover:scale-105"
        >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Adicionar Conta
        </button>
      </div>

       <div className="bg-white dark:bg-neutral-850 p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-100 mb-1">Patrimônio Líquido Total</h3>
            <p className={`text-3xl font-bold ${totalNetWorth >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {formatCurrency(totalNetWorth)}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Soma dos saldos de todas as contas (exclui dívidas de cartões/empréstimos do cálculo positivo).</p>
        </div>


      {accountsWithBalances.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountsWithBalances.map(account => (
            <div key={account.id} className="bg-white dark:bg-neutral-850 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-primary dark:text-primary-light">{account.name}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{account.type}</p>
                   {account.bankName && <p className="text-xs text-neutral-400 dark:text-neutral-500">Banco: {account.bankName}</p>}
                   {account.accountNumberLast4 && <p className="text-xs text-neutral-400 dark:text-neutral-500">Final: •••• {account.accountNumberLast4}</p>}
                </div>
                <div className={`p-2.5 rounded-lg bg-primary-light/15 dark:bg-primary-dark/25`}>
                     <BanknotesIcon className="h-6 w-6 text-primary dark:text-primary-light" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-neutral-600 dark:text-neutral-300">Saldo Atual:</p>
                <p className={`text-2xl font-bold ${account.currentBalance >= 0 ? 'text-neutral-800 dark:text-neutral-100' : 'text-red-500 dark:text-red-400'}`}>
                  {formatCurrency(account.currentBalance)}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Saldo Inicial: {formatCurrency(account.initialBalance)}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-700/60 flex justify-end space-x-2">
                <button
                  onClick={() => onEditAccount(account)}
                  className="p-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-primary dark:hover:text-primary-light rounded-lg transition-colors"
                  aria-label="Editar conta"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDeleteAccount(account.id)}
                  className="p-2 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
                  aria-label="Excluir conta"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-neutral-850 rounded-2xl shadow-xl">
          <BanknotesIcon className="h-16 w-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-neutral-600 dark:text-neutral-300">Nenhuma conta cadastrada.</p>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">Adicione sua primeira conta para começar a organizar suas finanças.</p>
        </div>
      )}
    </div>
  );
};
