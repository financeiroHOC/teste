
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER', // Added for inter-account transfers
}

export interface Transaction {
  id: string;
  date: string; // ISO string format
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  accountId: string; // Each transaction belongs to an account
  notes?: string; // Optional notes
  imported?: boolean;
  isRecurringInstance?: boolean; // True if generated from a recurring transaction
  peerTransactionId?: string; // For linking transfer parts
}

export interface Category {
  id:string;
  name: string;
  type: TransactionType; // Can be INCOME or EXPENSE. TRANSFER transactions won't use traditional categories.
}

export interface NavSubItem {
  name: string;
  path: string;
  dotColor?: string; // e.g., 'bg-blue-500'
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.FC<{className?: string}>;
  type?: 'link'; // Indicates a clickable navigation link
  subItems?: NavSubItem[];
  exact?: boolean; // For NavLink end prop
}

export interface NavHeader {
  name: string;
  type: 'header';
}

export type SidebarItem = NavItem | NavHeader;

// New Types for Future Features

export enum AccountType {
  CHECKING = 'Corrente',
  SAVINGS = 'Poupança',
  CREDIT_CARD = 'Cartão de Crédito',
  CASH = 'Dinheiro Físico',
  INVESTMENT = 'Investimento',
  LOAN = 'Empréstimo',
  OTHER = 'Outro',
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currency: string; // e.g., 'BRL', 'USD' - For now, assume a single app currency from constants
  createdAt: string; // ISO string
  bankName?: string; // Optional
  accountNumberLast4?: string; // Optional
}


export enum BudgetPeriod {
  MONTHLY = 'Mensal',
  QUARTERLY = 'Trimestral',
  ANNUAL = 'Anual',
  CUSTOM = 'Personalizado' // Requires startDate and endDate
}

export interface Budget {
  id: string;
  name: string; // e.g., "Orçamento de Supermercado" or "Orçamento Geral de Lazer"
  categoryId: string; // Link to a Category
  amount: number;
  period: BudgetPeriod;
  startDate?: string; // ISO string, for custom period
  endDate?: string; // ISO string, for custom period
  createdAt: string; // ISO string
  notes?: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string; // ISO string
  description?: string;
  createdAt: string; // ISO string
  linkedAccountId?: string; // Optional: an account specifically for this goal
}

export enum RecurrenceFrequency {
  DAILY = 'Diário',
  WEEKLY = 'Semanal',
  BI_WEEKLY = 'Quinzenal',
  MONTHLY = 'Mensal',
  QUARTERLY = 'Trimestral',
  SEMI_ANNUALLY = 'Semestral',
  ANNUALLY = 'Anual',
}

export interface RecurringTransaction {
  id: string;
  templateTransaction: Omit<Transaction, 'id' | 'date' | 'accountId' | 'isRecurringInstance'> & { accountId: string }; // The base transaction details
  frequency: RecurrenceFrequency;
  startDate: string; // ISO string, when it starts
  endDate?: string; // ISO string, optional, when it ends
  nextDueDate: string; // ISO string, calculated
  lastGeneratedDate?: string; // ISO string
  notes?: string;
  autoGenerate: boolean; // Whether to automatically create transaction on due date
}

export interface DashboardPageProps {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[]; // Added accounts
  budgets: Budget[]; // Added for future dashboard integration
  financialGoals: FinancialGoal[]; // Added for future dashboard integration
}

export type PeriodOption =
  | 'currentMonth'
  | 'lastMonth'
  | 'currentQuarter'
  | 'lastQuarter'
  | 'currentYear'
  | 'lastYear';
