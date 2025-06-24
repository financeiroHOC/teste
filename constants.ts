
import { Category, Transaction, TransactionType, SidebarItem } from './types';
import {
    HomeIcon, ListBulletIcon, Cog8ToothIcon, DocumentChartBarIcon,
    ChatBubbleLeftRightIcon, ChartPieIcon, MagnifyingGlassIcon,
    BuildingLibraryIcon, // New
    ClipboardDocumentListIcon, // New
    FlagIcon, // New
    ClockIcon, // New
    CreditCardIcon, // placeholder/alternative
    PresentationChartLineIcon // placeholder/alternative
} from './components/icons';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_income_salary', name: 'Salário', type: TransactionType.INCOME },
  { id: 'cat_income_freelance', name: 'Freelance', type: TransactionType.INCOME },
  { id: 'cat_income_investments', name: 'Investimentos', type: TransactionType.INCOME },
  { id: 'cat_income_gifts', name: 'Presentes', type: TransactionType.INCOME },
  { id: 'cat_income_other', name: 'Outras Receitas', type: TransactionType.INCOME },
  { id: 'cat_expense_groceries', name: 'Supermercado', type: TransactionType.EXPENSE },
  { id: 'cat_expense_rent_mortgage', name: 'Aluguel/Hipoteca', type: TransactionType.EXPENSE },
  { id: 'cat_expense_utilities', name: 'Contas (Luz, Água, Gás)', type: TransactionType.EXPENSE },
  { id: 'cat_expense_transport', name: 'Transporte', type: TransactionType.EXPENSE },
  { id: 'cat_expense_dining_out', name: 'Restaurantes/Lanches', type: TransactionType.EXPENSE },
  { id: 'cat_expense_entertainment', name: 'Entretenimento', type: TransactionType.EXPENSE },
  { id: 'cat_expense_healthcare', name: 'Saúde', type: TransactionType.EXPENSE },
  { id: 'cat_expense_education', name: 'Educação', type: TransactionType.EXPENSE },
  { id: 'cat_expense_shopping', name: 'Compras', type: TransactionType.EXPENSE },
  { id: 'cat_expense_other', name: 'Outras Despesas', type: TransactionType.EXPENSE },
  { id: 'cat_transfer', name: 'Transferência', type: TransactionType.TRANSFER }, // For internal transfers
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: new Date(Date.now() - 86400000 * 15).toISOString(), description: 'Salário Mensal - Mês Anterior', amount: 5200, type: TransactionType.INCOME, category: 'Salário', accountId: 'acc_initial_checking' },
  { id: 't2', date: new Date(Date.now() - 86400000 * 10).toISOString(), description: 'Compras de Supermercado', amount: 85.30, type: TransactionType.EXPENSE, category: 'Supermercado', accountId: 'acc_initial_checking' },
  { id: 't3', date: new Date(Date.now() - 86400000 * 8).toISOString(), description: 'Conta de Luz', amount: 65.00, type: TransactionType.EXPENSE, category: 'Contas (Luz, Água, Gás)', accountId: 'acc_initial_checking' },
  { id: 't4', date: new Date(Date.now() - 86400000 * 5).toISOString(), description: 'Pagamento Projeto Freelance', amount: 750, type: TransactionType.INCOME, category: 'Freelance', accountId: 'acc_initial_savings' },
  { id: 't5', date: new Date(Date.now() - 86400000 * 3).toISOString(), description: 'Jantar no Italiano', amount: 62.75, type: TransactionType.EXPENSE, category: 'Restaurantes/Lanches', accountId: 'acc_initial_credit_card' },
  { id: 't6', date: new Date(Date.now() - 86400000 * 2).toISOString(), description: 'Aluguel Mensal', amount: 1350, type: TransactionType.EXPENSE, category: 'Aluguel/Hipoteca', accountId: 'acc_initial_checking' },
  { id: 't7', date: new Date(Date.now() - 86400000 * 1).toISOString(), description: 'Ingressos Cinema', amount: 30.00, type: TransactionType.EXPENSE, category: 'Entretenimento', accountId: 'acc_initial_credit_card' },
];

export const NAVIGATION_ITEMS: SidebarItem[] = [
    { name: 'Visão Geral', path: '/', icon: HomeIcon, type: 'link', exact: true },
    { name: 'Saúde Financeira', path: '/dashboard/health', icon: ChartPieIcon, type: 'link', exact: true },
    { name: 'Análises', path: '/dashboard/analytics', icon: MagnifyingGlassIcon, type: 'link', exact: true },
    { name: 'FINANÇAS', type: 'header' },
    { name: 'Contas', path: '/accounts', icon: BuildingLibraryIcon, type: 'link', exact: true },
    { name: 'Transações', path: '/transactions', icon: ListBulletIcon, type: 'link', exact: true },
    { name: 'Recorrentes', path: '/recurring', icon: ClockIcon, type: 'link', exact: true },
    { name: 'PLANEJAMENTO', type: 'header' },
    { name: 'Orçamentos', path: '/budgets', icon: ClipboardDocumentListIcon, type: 'link', exact: true },
    { name: 'Metas', path: '/goals', icon: FlagIcon, type: 'link', exact: true },
    { name: 'FERRAMENTAS', type: 'header' },
    { name: 'Relatórios', path: '/reports', icon: DocumentChartBarIcon, type: 'link', exact: true },
    { name: 'Assistente IA', path: '/chat', icon: ChatBubbleLeftRightIcon, type: 'link', exact: true },
    { name: 'Preferências', path: '/settings/preferences', icon: Cog8ToothIcon, type: 'link', exact: true },
];

export const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1', '#06b6d4'];

export const CURRENCY_SYMBOL = 'R$'; // Changed to BRL
export const DEFAULT_CURRENCY = 'BRL';
