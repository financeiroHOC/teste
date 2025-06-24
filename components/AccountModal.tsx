
import React, { useState, useEffect } from 'react';
import { Account, AccountType } from '../types';
import { XMarkIcon } from './icons';
import { DEFAULT_CURRENCY } from '../constants';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Omit<Account, 'id' | 'createdAt'> & { id?: string }) => void;
  accountToEdit?: Account;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSave, accountToEdit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<AccountType>(AccountType.CHECKING);
  const [initialBalance, setInitialBalance] = useState<number | ''>('');
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY); // For now, fixed. Could be a select later.
  const [bankName, setBankName] = useState('');
  const [accountNumberLast4, setAccountNumberLast4] = useState('');


  const [internalVisible, setInternalVisible] = useState(false);

  useEffect(() => {
    setInternalVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (accountToEdit) {
        setName(accountToEdit.name);
        setType(accountToEdit.type);
        setInitialBalance(accountToEdit.initialBalance);
        setCurrency(accountToEdit.currency);
        setBankName(accountToEdit.bankName || '');
        setAccountNumberLast4(accountToEdit.accountNumberLast4 || '');
      } else {
        setName('');
        setType(AccountType.CHECKING);
        setInitialBalance('');
        setCurrency(DEFAULT_CURRENCY);
        setBankName('');
        setAccountNumberLast4('');
      }
    }
  }, [accountToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || initialBalance === '') {
      alert("Nome da conta e Saldo Inicial são obrigatórios.");
      return;
    }
    onSave({
      id: accountToEdit?.id,
      name,
      type,
      initialBalance: Number(initialBalance),
      currency,
      bankName: bankName || undefined,
      accountNumberLast4: accountNumberLast4 || undefined,
    });
  };

  if (!isOpen && !internalVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out ${internalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white dark:bg-neutral-850 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out ${internalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-700/60">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">{accountToEdit ? 'Editar' : 'Adicionar Nova'} Conta</h2>
          <button onClick={onClose} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="accountName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nome da Conta</label>
            <input
              type="text"
              id="accountName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
              required
            />
          </div>
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tipo de Conta</label>
            <select
              id="accountType"
              value={type}
              onChange={(e) => setType(e.target.value as AccountType)}
              className="mt-1 block w-full pl-4 pr-10 py-2.5 text-base border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            >
              {Object.values(AccountType).map(accType => (
                <option key={accType} value={accType}>{accType}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="initialBalance" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Saldo Inicial ({currency})</label>
            <input
              type="number"
              id="initialBalance"
              value={initialBalance}
              onChange={(e) => setInitialBalance(parseFloat(e.target.value) || '')}
              className="mt-1 block w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
              required
              step="0.01"
            />
             <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Para cartões de crédito, insira 0 se não houver saldo devedor inicial, ou o valor da fatura atual se desejar rastrear o pagamento.</p>
          </div>
          <div>
            <label htmlFor="bankName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Nome do Banco (Opcional)</label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="mt-1 block w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
            />
          </div>
          <div>
            <label htmlFor="accountNumberLast4" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Últimos 4 Dígitos da Conta (Opcional)</label>
            <input
              type="text"
              id="accountNumberLast4"
              value={accountNumberLast4}
              onChange={(e) => setAccountNumberLast4(e.target.value.replace(/\D/g, '').slice(0,4))}
              className="mt-1 block w-full px-4 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light sm:text-sm bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
              maxLength={4}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 dark:focus:ring-offset-neutral-850 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-darker rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark dark:focus:ring-offset-neutral-850 transition-all"
            >
              {accountToEdit ? 'Salvar Alterações' : 'Adicionar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
