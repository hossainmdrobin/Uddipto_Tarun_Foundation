# **App Name**: LedgeTrack

## Core Features:

- Multi-Role Authentication: Custom JWT-based auth system featuring role-based access for members and employees with OTP verification via Nodemailer.
- Member Financial Portal: Dedicated member dashboard showing loan summaries, repayment schedules, and transaction history stored in MongoDB.
- Loan Originator Tool: An AI-powered loan term simulation tool that generates amortized repayment schedules based on principal and interest rates.
- Enterprise Dashboard: A QuickBooks-inspired interface for employees to manage members, log payments, and track overdue accounts.
- Real-time Payment Logging: System to log transactions and automatically update loan statuses and installment schedules within the database.
- KPI Reporting & Visuals: Analytical view for managers with chart-based insights using Recharts and exportable PDF/CSV reporting.
- Audit Logging: Back-end tracking of all administrative actions to maintain a transparent history of loan and payment modifications.

## Style Guidelines:

- Primary color: Deep Navy (#1B2A4A) representing stability and professional trust in financial systems.
- Accent color: Vibrant Teal (#0A9396) for call-to-actions and interactive elements, providing a modern tech-focused contrast.
- Background color: Very light slate (#F8FAFC) to ensure high readability in data-heavy dashboard views.
- Headline font: 'Space Grotesk', a geometric sans-serif that lends a precise, technical feel to numerical headers.
- Body font: 'Inter', selected for its exceptional legibility in complex data tables and transaction logs.
- QuickBooks-inspired layout featuring a persistent 240px sidebar for navigation and a centralized, spacious content area for tabular data.
- Smooth status transitions for payment indicators and loading skeletons for asynchronous financial reporting charts.