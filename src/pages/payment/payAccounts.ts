import {
  User,
  GraduationCap,
  Building2,
  Factory,
  type LucideIcon,
} from "lucide-react";

export type PayAccountType = "individual" | "business" | "student" | "corporate";

export interface PayPermission {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface PayAccountConfig {
  type: PayAccountType;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  nav: { label: string; key: string }[];
  permissions: string[];
  limits: { send: string; receive: string; daily: string };
}

export const PERMISSIONS: Record<string, string> = {
  send_money: "Send money to anyone, anywhere",
  receive_money: "Receive payments instantly",
  bank_transfer: "Link and withdraw to bank accounts",
  debit_card: "Virtual & physical debit cards",
  crypto: "Buy, sell & hold crypto",
  international: "Multi-currency international payments",
  invoices: "Create & manage invoices",
  payroll: "Payroll & team payouts",
  team_cards: "Issue unlimited team cards",
  analytics: "Business spend analytics",
  treasury: "Treasury management & yield",
  expense_management: "Expense tracking & approvals",
  tax_tools: "Tax-ready reporting",
  student_discounts: "Student discounts & campus perks",
  tuition: "Tuition & fee payments",
  savings_goals: "Guided savings goals",
  api_access: "API & developer access",
};

export const ACCOUNT_TYPES: Record<PayAccountType, PayAccountConfig> = {
  individual: {
    type: "individual",
    name: "Individual",
    description: "For everyday personal money management",
    icon: User,
    accent: "from-blue-500 to-indigo-500",
    nav: [
      { label: "Overview", key: "overview" },
      { label: "Cards", key: "cards" },
      { label: "Transfer", key: "transfer" },
      { label: "Crypto", key: "crypto" },
      { label: "History", key: "history" },
    ],
    permissions: [
      "send_money",
      "receive_money",
      "bank_transfer",
      "debit_card",
      "crypto",
      "international",
    ],
    limits: { send: "$10,000", receive: "$25,000", daily: "$5,000" },
  },
  student: {
    type: "student",
    name: "Student",
    description: "For students managing education & everyday money",
    icon: GraduationCap,
    accent: "from-emerald-500 to-teal-500",
    nav: [
      { label: "Overview", key: "overview" },
      { label: "Tuition", key: "tuition" },
      { label: "Cards", key: "cards" },
      { label: "Transfer", key: "transfer" },
      { label: "Savings", key: "savings" },
    ],
    permissions: [
      "send_money",
      "receive_money",
      "bank_transfer",
      "debit_card",
      "international",
      "student_discounts",
      "tuition",
      "savings_goals",
    ],
    limits: { send: "$5,000", receive: "$12,000", daily: "$2,500" },
  },
  business: {
    type: "business",
    name: "Business",
    description: "For startups & small businesses",
    icon: Building2,
    accent: "from-amber-500 to-orange-500",
    nav: [
      { label: "Overview", key: "overview" },
      { label: "Payments", key: "payments" },
      { label: "Invoices", key: "invoices" },
      { label: "Cards", key: "cards" },
      { label: "Payroll", key: "payroll" },
      { label: "Analytics", key: "analytics" },
      { label: "Team", key: "team" },
    ],
    permissions: [
      "send_money",
      "receive_money",
      "bank_transfer",
      "debit_card",
      "international",
      "invoices",
      "payroll",
      "team_cards",
      "analytics",
      "expense_management",
    ],
    limits: { send: "$100,000", receive: "$250,000", daily: "$25,000" },
  },
  corporate: {
    type: "corporate",
    name: "Corporate",
    description: "For enterprises & global treasury teams",
    icon: Factory,
    accent: "from-violet-500 to-purple-500",
    nav: [
      { label: "Overview", key: "overview" },
      { label: "Treasury", key: "treasury" },
      { label: "Payments", key: "payments" },
      { label: "Invoices", key: "invoices" },
      { label: "Cards", key: "cards" },
      { label: "Payroll", key: "payroll" },
      { label: "Analytics", key: "analytics" },
      { label: "Team", key: "team" },
      { label: "API", key: "api" },
    ],
    permissions: [
      "send_money",
      "receive_money",
      "bank_transfer",
      "debit_card",
      "crypto",
      "international",
      "invoices",
      "payroll",
      "team_cards",
      "analytics",
      "treasury",
      "expense_management",
      "tax_tools",
      "api_access",
    ],
    limits: { send: "$5,000,000", receive: "Unlimited", daily: "$1,000,000" },
  },
};

export const ACCOUNT_TYPE_LIST: PayAccountType[] = [
  "individual",
  "student",
  "business",
  "corporate",
];

export function getAccountConfig(type: string | null | undefined): PayAccountConfig {
  if (type && type in ACCOUNT_TYPES) return ACCOUNT_TYPES[type as PayAccountType];
  return ACCOUNT_TYPES.individual;
}

export function hasPermission(config: PayAccountConfig, permission: string): boolean {
  return config.permissions.includes(permission);
}
