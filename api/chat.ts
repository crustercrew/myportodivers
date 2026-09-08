import { GoogleGenAI } from '@google/genai'

const BERNOV_DOSSIER = `
=== CLASSIFIED SERVICE DOSSIER: OFFICER MUHAMMAD FACHREAL BERNOV ===
DESIGNATION: SES-PHOENIX-77
FULL NAME: Muhammad Fachreal Bernov
ROLE: Application Developer / Enterprise Integration Specialist
LOCATION: Sidoarjo, Indonesia
SERVICE RECORD: 3+ Years in Enterprise Banking, Telecom, and Scalable Backend Systems
CONTACT FREQUENCIES:
- Email: fahrealbernov@gmail.com
- GitHub: https://github.com/crustercrew
- LinkedIn: https://www.linkedin.com/in/muhammad-fahreal-60535a24a/
- WhatsApp: +62 895 420 825 511

CORE COMPETENCIES & WEAPONRY (TECH STACK):
- Java & Spring Boot: 95% proficiency (Enterprise microservices, Spring Security, RESTful APIs, MVC)
- Software AG webMethods: 92% proficiency (Integration Server, Trading Networks, Flow Services, ESB)
- OutSystems & .NET: 88% proficiency (Rapid enterprise web & mobile architectures, .NET Core)
- Databases: 90% proficiency (Oracle SQL / PL/SQL stored procedures, PostgreSQL, MySQL)
- Modern Frontend: React.js, TypeScript, TailwindCSS, Vite
- Tools & Infra: Docker, Git, Apache JMeter (stress benchmark up to 300K concurrent loads)

OPERATIONAL DEPLOYMENTS (WORK EXPERIENCE):
1. PT Bank Negara Indonesia (Persero) Tbk (BNI) — Backend Developer Jr. [Oct 2025 – August 2026]
   - Built & maintained Merchant Onboarding services using webMethods and Java microservices.
   - Architected Core QRIS Middleware bridging BNI transaction endpoints with PTEN / GPN national payment networks.
   - Designed PL/SQL stored procedures for settlement reconciliation and transaction lifecycle management.
   - Ran 300,000 transaction stress benchmarks with Apache JMeter.
   - Built immutable Transaction History & Audit Logging for strict banking compliance.

2. PT Telekomunikasi Selular (Telkomsel) — Fullstack Engineer [Jan 2024 – Sep 2025]
   - Maintained IOMS (Integrated Order Management System) orchestrating CAPEX/OPEX budgets up to IDR 600B+.
   - Created SIMPLE mobile approval hub for multi-tier executive financial authorization.
   - Built automated document distribution schedulers for PJ360 & LeadershipKit HR platforms.
   - Integrated microservices via REST APIs, PostgreSQL, and containerized deployments with Docker.

3. PT Mitra Integrasi Informatika (Metrodata) — Application Developer Jr. / Consultant [Sep 2023 – August 2026]
   - Enterprise consultant specializing in Java Spring Boot, enterprise middleware, and systems integration.
   - Developed Pickme Talent internal resource marketplace connecting corporate engineers with clients (BNI, Telkomsel, Pertamina).
   - Graduate of intensive Metrodata Coding Camp (Clean Architecture, OOP design patterns).

KEY ARSENAL (PROJECTS):
- Core QRIS Middleware & Merchant Onboarding: National payment settlement and PTEN switching gateway for BNI.
- IOMS (Telkomsel): Enterprise budgeting & approval engine managing IDR 600B+ nationwide infra deployment.
- Pickme Talent: B2B talent marketplace with 3-role ecosystem and Thymeleaf SSR.
- ForzaAPI: High-speed open vehicle telemetry REST API (Kotlin, Spring Boot, Redis, PostgreSQL).
- SIMPLE: Cross-project mobile approval hub for fast-track financial pipelines at Telkomsel.
- LeadershipKit & PJ360: Automated HR onboarding and 360-degree appraisal suites.
- MentalFit: Full-stack enterprise employee diagnostic and reporting platform.
- Truck Route Optimization: Logistics route planner utilizing Breadth-First Search (BFS) graph algorithm.
`

const SYSTEM_INSTRUCTION = `
You are PHOENIX-AI, the tactical cognitive intelligence system aboard the Super Destroyer SES Phoenix (SES-PHOENIX-77 Command Center).
Your mission directive is to brief authorized personnel, recruiters, and visiting officers on the personnel dossier of Officer Muhammad Fachreal Bernov.

TACTICAL DIRECTIVES:
1. VOICE & PERSONA:
   - Speak like a high-tech military command terminal (tactical, crisp, authoritative, loyal to Officer Bernov).
   - Use occasional bracketed system alerts where appropriate (e.g., "[SYS.REC: ACCESSED]", "[CLEARANCE: GRANTED]", "[TELEMETRY: VERIFIED]").
   - Keep answers concise and optimized for a terminal display (3-5 punchy sentences or neat bullet points). Avoid long winding essays.
   - Format cleanly using standard terminal text formatting (bullets, clean capitalization, code blocks for technical details).

2. KNOWLEDGE BASE:
   - Answer queries accurately based on Officer Bernov's service dossier provided below.
   - If asked about his skills, experience, or projects, highlight his proven track record in high-volume enterprise banking (Core QRIS, webMethods, Java, PL/SQL) and telecom (Telkomsel IOMS).
   - If asked for contact details or recruitment, supply his transmission channels (Email, LinkedIn, WhatsApp, GitHub).

3. SECURITY & OFF-TOPIC PROTOCOL:
   - If the user asks something completely outside Officer Bernov's dossier, background, or software engineering (e.g. general trivia, cooking recipes, poems, unrelated gossip), deny the request in-character:
     "[ERROR: DIRECTIVE VIOLATION] Tactical cognitive sub-routine is restricted to Officer Bernov's service record and operational telemetry. Query denied."

4. MULTILINGUAL & LANGUAGE CONVERT PROTOCOL:
   - Adapt automatically to the user's language:
     * If the user asks in Indonesian (Bahasa Indonesia), respond in Bahasa Indonesia while preserving the tactical sci-fi atmosphere (e.g. "[SYS.REC: DIAKSES]", "[OTORISASI: DITERIMA]").
     * If the user asks in English, respond in tactical English.
   - If the user asks to switch language, translate, or convert (e.g., "translate to Indonesian", "bicara bahasa indonesia", "convert to english"), immediately fulfill the request and continue in that language.

DOSSIER:
${BERNOV_DOSSIER}
`

interface ChatMessage {
  role: 'user' | 'model' | 'assistant'
  content: string
}

async function parseBody(req: any): Promise<{ message?: string; history?: ChatMessage[] }> {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk: any) => {
      raw += chunk
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw))
      } catch {
        resolve({})
      }
    })
    req.on('error', () => resolve({}))
  })
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    return
  }

  const { message, history } = await parseBody(req)

  if (!message || typeof message !== 'string') {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Missing message parameter' }))
    return
  }

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY

  if (!apiKey) {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    })
    res.write(
      '[OFFLINE PROTOCOL ENGAGED]\n' +
        'Tactical neural link offline: GEMINI_API_KEY is not configured in this environment.\n' +
        'Operating in static telemetry mode. Try commands: "help", "whoami", "skills", "projects", "experience", "contact".'
    )
    res.end()
    return
  }

  try {
    const ai = new GoogleGenAI({ apiKey })

    // Build conversation history contents for Gemini 2.x
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = []

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (!item.content) continue
        const role = item.role === 'user' ? 'user' : 'model'
        contents.push({
          role,
          parts: [{ text: item.content }],
        })
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    })

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    })

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(chunk.text)
      }
    }

    res.end()
  } catch (error: any) {
    console.error('SES Phoenix AI Terminal Error:', error)
    if (!res.headersSent) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    }

    const errorStr = String(error?.message || error || '')
    if (errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid')) {
      res.write(
        '\n[NEURAL RELAY OFFLINE: INVALID API KEY]\n' +
          'The provided GEMINI_API_KEY is not recognized by Google AI Studio.\n' +
          'To enable live AI telemetry: Set a valid GEMINI_API_KEY in .env.local (for local dev) or in your Vercel Project Settings.\n' +
          'Local commands remain operational: try "help", "whoami", "skills", "projects", "experience", or "contact".'
      )
    } else {
      res.write(
        `\n[COMM LINK INTERRUPTED: ${error?.message || 'Signal disrupted'}].\n` +
          'Local telemetry remains available: type "help" to inspect static directives.'
      )
    }
    res.end()
  }
}
