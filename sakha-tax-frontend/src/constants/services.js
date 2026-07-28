import {
  FiFileText,
  FiPercent,
  FiRepeat,
  FiBookOpen,
  FiBook,
  FiUsers,
  FiBriefcase,
  FiUserCheck,
  FiHome,
  FiShield,
  FiTrendingUp,
  FiPieChart,
  FiCheckSquare,
  FiClipboard,
  FiCreditCard,
  FiHash,
} from 'react-icons/fi'

// Each service carries a real government form/scheme reference code —
// used as the signature "ledger tab" detail on service cards instead of
// generic 01/02/03 numbering, since these codes are authentic to the domain.
export const services = [
  {
    slug: 'income-tax-return',
    code: 'ITR',
    icon: FiFileText,
    title: 'Income Tax Return (ITR)',
    short: 'Accurate, on-time ITR filing for salaried individuals, professionals and businesses.',
    description:
      'We prepare and file your Income Tax Return with a full review of deductions, exemptions and applicable regime, so you file correctly and claim every eligible benefit.',
    points: ['Salary, capital gains & business income', 'Old vs new regime comparison', 'Refund tracking & notice support'],
  },
  {
    slug: 'gst-registration',
    code: 'GST-REG',
    icon: FiPercent,
    title: 'GST Registration',
    short: 'End-to-end GST registration for new businesses, startups and shops.',
    description:
      'From document preparation to ARN tracking and certificate issuance, we handle your GST registration so you can start invoicing without delay.',
    points: ['Document verification', 'Application filing & follow-up', 'GSTIN & certificate delivery'],
  },
  {
    slug: 'gst-return-filing',
    code: 'GST-RET',
    icon: FiRepeat,
    title: 'GST Return Filing',
    short: 'Monthly, quarterly and annual GST return filing, done on schedule, every time.',
    description:
      'GSTR-1, GSTR-3B, GSTR-9 and reconciliation with purchase records — we keep your filings compliant and your input tax credit intact.',
    points: ['GSTR-1 / 3B / 9 filing', 'ITC reconciliation', 'Late fee & notice prevention'],
  },
  {
    slug: 'accounting',
    code: 'ACC',
    icon: FiBookOpen,
    title: 'Accounting',
    short: 'Reliable monthly accounting so you always know where your business stands.',
    description:
      'We maintain accurate books using standard accounting practices, giving you clear financial statements ready for review, audit or funding.',
    points: ['Monthly ledgers & trial balance', 'Financial statement preparation', 'Audit-ready records'],
  },
  {
    slug: 'bookkeeping',
    code: 'BK',
    icon: FiBook,
    title: 'Bookkeeping',
    short: 'Day-to-day transaction recording that keeps your accounts current.',
    description:
      'Sales, purchases, expenses and bank reconciliation, recorded consistently so nothing falls behind at year end.',
    points: ['Daily/weekly transaction entry', 'Bank reconciliation', 'Expense categorisation'],
  },
  {
    slug: 'tds-return',
    code: 'TDS',
    icon: FiCheckSquare,
    title: 'TDS Return',
    short: 'Quarterly TDS return filing with error-free challan and deductee mapping.',
    description:
      'We prepare and file 24Q/26Q returns, generate Form 16/16A, and correct mismatches before they become notices.',
    points: ['24Q / 26Q filing', 'Form 16 & 16A generation', 'Correction statements'],
  },
  {
    slug: 'payroll',
    code: 'PAY',
    icon: FiUsers,
    title: 'Payroll',
    short: 'Payroll processing with statutory compliance built in.',
    description:
      'Salary computation, PF/ESI, professional tax and payslips managed monthly, so your team gets paid accurately and on time.',
    points: ['Salary & payslip processing', 'PF / ESI compliance', 'Statutory filings'],
  },
  {
    slug: 'company-registration',
    code: 'COMP-REG',
    icon: FiBriefcase,
    title: 'Company Registration',
    short: 'Private Limited and OPC incorporation, handled from name approval to certificate.',
    description:
      'We manage DIN, DSC, name reservation, MOA/AOA drafting and ROC filing to get your company legally incorporated.',
    points: ['DIN & DSC processing', 'MOA / AOA drafting', 'ROC filing & COI'],
  },
  {
    slug: 'partnership-registration',
    code: 'PART-REG',
    icon: FiUserCheck,
    title: 'Partnership Registration',
    short: 'Partnership deed drafting and registration for your firm.',
    description:
      'From deed drafting to registrar filing, we set up your partnership on a clear legal and financial footing.',
    points: ['Partnership deed drafting', 'Registrar filing', 'PAN & bank account support'],
  },
  {
    slug: 'msme-registration',
    code: 'MSME',
    icon: FiHome,
    title: 'MSME Registration',
    short: 'Udyam registration to unlock government schemes and benefits.',
    description:
      'We complete your Udyam/MSME registration so you can access priority lending, subsidies and buyer protection under the MSME Act.',
    points: ['Udyam registration', 'Classification advisory', 'Scheme eligibility guidance'],
  },
  {
    slug: 'professional-tax',
    code: 'PT',
    icon: FiShield,
    title: 'Professional Tax',
    short: 'Registration and periodic payment of professional tax for employers and professionals.',
    description:
      'We handle PT registration, computation and return filing in line with your state\'s slab and due dates.',
    points: ['PT registration', 'Periodic payment', 'Return filing'],
  },
  {
    slug: 'tax-planning',
    code: 'PLAN',
    icon: FiTrendingUp,
    title: 'Tax Planning',
    short: 'Forward-looking tax strategy that legally reduces your liability.',
    description:
      'We review your income structure and investments to build a tax plan that fits your goals, well before filing season begins.',
    points: ['Investment & deduction planning', 'Regime selection strategy', 'Year-round advisory'],
  },
  {
    slug: 'financial-consultation',
    code: 'FIN-CONS',
    icon: FiPieChart,
    title: 'Financial Consultation',
    short: 'Practical financial guidance for individuals and growing businesses.',
    description:
      'From cash flow planning to funding readiness, we advise on the financial decisions that shape your next stage of growth.',
    points: ['Cash flow & budgeting', 'Funding readiness', 'Growth & structuring advice'],
  },
  {
    slug: 'audit-support',
    code: 'AUDIT',
    icon: FiClipboard,
    title: 'Audit Support',
    short: 'Documentation and coordination support for statutory and tax audits.',
    description:
      'We prepare records, reconcile discrepancies and coordinate with auditors so your audit closes smoothly and on time.',
    points: ['Statutory audit support', 'Tax audit (44AB) support', 'Documentation & reconciliation'],
  },
  {
    slug: 'business-registration',
    code: 'BIZ-REG',
    icon: FiBriefcase,
    title: 'Business Registration',
    short: 'Right structure, registered right — proprietorship to LLP.',
    description:
      'We help you choose and register the correct business structure, and complete every licence and registration it needs.',
    points: ['Structure advisory', 'Licence & registration filing', 'Compliance calendar setup'],
  },
  {
    slug: 'pan-services',
    code: 'PAN',
    icon: FiCreditCard,
    title: 'PAN Services',
    short: 'New PAN applications and corrections, handled end-to-end.',
    description:
      'We assist with fresh PAN applications, corrections and reprints for individuals, firms and companies.',
    points: ['New PAN application', 'Corrections & updates', 'Reprint requests'],
  },
  {
    slug: 'tan-services',
    code: 'TAN',
    icon: FiHash,
    title: 'TAN Services',
    short: 'TAN application and management for TDS deductors.',
    description:
      'We obtain and maintain your Tax Deduction Account Number so your TDS filings are never blocked by compliance gaps.',
    points: ['New TAN application', 'Corrections', 'TAN-PAN linkage checks'],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
