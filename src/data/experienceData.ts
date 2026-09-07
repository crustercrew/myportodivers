import type { ExperienceItem } from '../utils/types'

export const experiences: ExperienceItem[] = [
  {
    id: 'EXP-01',
    role: 'BACKEND DEVELOPER Jr.',
    company: 'PT Bank Negara Indonesia (Persero) Tbk (BNI)',
    period: 'Oct 2025 — August 2026',
    status: 'COMPLETED',
    description: [
      'Engineered and maintained Merchant Onboarding enterprise services using webMethods and Java-based microservices.',
      'Designed and integrated Core QRIS Middleware, bridging banking transactional endpoints with national payment switching networks (PTEN / GPN).',
      'Architected PL/SQL stored procedures for settlement reconciliation and high-volume transaction lifecycle management (NMID and PTEN header validation).',
      'Conducted stress and performance benchmark tests simulating up to 300,000 data entries using Apache JMeter.',
      'Implemented persistent Transaction History & Audit Logging mechanisms for banking regulatory compliance.',
    ],
    techStack: ['webMethods', 'Java', 'Spring Boot', 'Oracle PL/SQL', 'Apache JMeter', 'QRIS Standards'],
  },
  {
    id: 'EXP-02',
    role: 'FULLSTACK ENGINEER',
    company: 'PT Telekomunikasi Selular (Telkomsel)',
    period: 'Jan 2024 — Sep 2025',
    status: 'COMPLETED',
    description: [
      'Maintained and integrated enterprise features for the Integrated Order Management System (IOMS) managing CAPEX/OPEX budgeting up to IDR 600B+.',
      'Developed SIMPLE mobile approval hub to streamline multi-tier executive financial authorization workflows.',
      'Contributed to PJ360 & LeadershipKit Human Capital platforms with automated document distribution and onboarding schedulers.',
      'Orchestrated API integration workflows between internal telecom microservices and third-party systems via RESTful APIs and PostgreSQL.',
      'Streamlined service dependencies and containerized services using Docker for local testing and standardized staging deployments.',
    ],
    techStack: ['OutSystems', '.NET Core', 'PostgreSQL', 'Docker', 'REST APIs'],
  },
  {
    id: 'EXP-03',
    role: 'APPLICATION DEVELOPER Jr. / CONSULTANT',
    company: 'PT Mitra Integrasi Informatika (Metrodata)',
    period: 'Sep 2023 — August 2026',
    status: 'COMPLETED',
    description: [
      'Enterprise application consultant specializing in Java Spring Boot, enterprise middleware, and systems integration.',
      'Developed and maintained Pickme Talent internal resource management platform connecting corporate engineers with enterprise clients.',
      'Graduated from intensive Metrodata Coding Camp focusing on OOP design patterns, clean architecture, and enterprise RESTful API development.',
    ],
    techStack: ['Java', 'Spring Boot', 'Spring MVC', 'MySQL', 'Thymeleaf', 'Enterprise Architecture'],
  },
  {
    id: 'EXP-04',
    role: 'INFRASTRUCTURE & DESKTOP SUPPORT ENGINEER',
    company: 'PT Berca Hardayaperkasa',
    period: 'Jul 2023 — Aug 2023',
    status: 'COMPLETED',
    description: [
      'Executed endpoint computer standardization and network security configurations across Bank Syariah Indonesia (BSI) branches.',
      'Configured network endpoint security policies, routing protocols, and enterprise VPN tunnels (GlobalProtect).',
    ],
    techStack: ['Network Security', 'GlobalProtect VPN', 'Endpoint Infrastructure', 'Linux / Windows'],
  },
  {
    id: 'EXP-05',
    role: 'PHP WEB DEVELOPER (FREELANCE / CONTRACT)',
    company: 'PT SBG Solusi Bisnis',
    period: 'Nov 2022 — Dec 2022',
    status: 'COMPLETED',
    description: [
      'Developed core modules for internal enterprise solutions: Employee Payroll System (E-Claims) and Sales Management System (SMS).',
      'Implemented geolocation check-in integrations and modernized UI/UX flows for field representative attendance and expense tracking.',
    ],
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
  },
]
