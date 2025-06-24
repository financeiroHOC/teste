
import React from 'react';
import { Transaction, TransactionType, Account } from '../types';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, TrashIcon, PencilSquareIcon, CalendarDaysIcon, BuildingLibraryIcon } from './icons'; // Added BuildingLibraryIcon
import { CURRENCY_SYMBOL } from '../constants';

interface TransactionItemProps {
  transaction: Transaction;
  account?: Account; // Make account optional, to be resolved from accounts list if needed
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, account, onDelete, onEdit }) => {
  const isIncome = transaction.type === TransactionType.INCOME;
  const isTransfer = transaction.type === TransactionType.TRANSFER;
  
  let amountColor = '';
  let IconComponent;

  if (isTransfer) {
    amountColor = 'text-blue-500 dark:text-blue-400'; // Or some other color for transfers
    IconComponent = ArrowTrendingDownIcon; // Or a specific transfer icon if available
  } else if (isIncome) {
    amountColor = 'text-green-500 dark:text-green-400';
    IconComponent = ArrowTrendingUpIcon;
  } else { // Expense
    amountColor = 'text-red-500 dark:text-red-400';
    IconComponent = ArrowTrendingDownIcon;
  }

  const iconColorClass = isTransfer ? 'text-blue-600 dark:text-blue-400' : (isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400');
  const iconBgClass = isTransfer ? 'bg-blue-100 dark:bg-blue-500/20' : (isIncome ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20');


  return (
    <div className="bg-white dark:bg-neutral-850 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 transform hover:scale-[1.01] hover:z-10">
      <div className="flex items-center space-x-4 flex-grow">
        <div className={`p-3 rounded-xl ${iconBgClass}`}>
          <IconComponent className={`h-6 w-6 ${iconColorClass}`} />
        </div>
        <div>
          <p className="text-base font-semibold text-neutral-800 dark:text-neutral-100">{transaction.description}</p>
          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex flex-wrap items-center mt-1 gap-x-3 gap-y-1">
            <span className="flex items-center">
              <CalendarDaysIcon className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              {new Date(transaction.date).toLocaleDateString()} - {transaction.category}
            </span>
            {account && (
              <span className="flex items-center">
                <BuildingLibraryIcon className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                {account.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-end sm:items-center sm:space-x-4 w-full sm:w-auto mt-2 sm:mt-0">
         <p className={`text-xl font-semibold ${amountColor} self-start sm:self-center sm:ml-auto whitespace-nowrap`}>
            {isIncome ? '+' : (isTransfer ? '' : '-')}{CURRENCY_SYMBOL}{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-primary dark:hover:text-primary-light rounded-lg transition-colors"
            aria-label="Editar transação"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2.5 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
            aria-label="Excluir transação"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
