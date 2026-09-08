var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { GoogleGenAI } from '@google/genai';
var BERNOV_DOSSIER = "\n=== CLASSIFIED SERVICE DOSSIER: OFFICER MUHAMMAD FACHREAL BERNOV ===\nDESIGNATION: SES-PHOENIX-77\nFULL NAME: Muhammad Fachreal Bernov\nROLE: Application Developer / Enterprise Integration Specialist\nLOCATION: Sidoarjo, Indonesia\nSERVICE RECORD: 3+ Years in Enterprise Banking, Telecom, and Scalable Backend Systems\nCONTACT FREQUENCIES:\n- Email: fahrealbernov@gmail.com\n- GitHub: https://github.com/crustercrew\n- LinkedIn: https://www.linkedin.com/in/muhammad-fahreal-60535a24a/\n- WhatsApp: +62 895 420 825 511\n\nCORE COMPETENCIES & WEAPONRY (TECH STACK):\n- Java & Spring Boot: 95% proficiency (Enterprise microservices, Spring Security, RESTful APIs, MVC)\n- Software AG webMethods: 92% proficiency (Integration Server, Trading Networks, Flow Services, ESB)\n- OutSystems & .NET: 88% proficiency (Rapid enterprise web & mobile architectures, .NET Core)\n- Databases: 90% proficiency (Oracle SQL / PL/SQL stored procedures, PostgreSQL, MySQL)\n- Modern Frontend: React.js, TypeScript, TailwindCSS, Vite\n- Tools & Infra: Docker, Git, Apache JMeter (stress benchmark up to 300K concurrent loads)\n\nOPERATIONAL DEPLOYMENTS (WORK EXPERIENCE):\n1. PT Bank Negara Indonesia (Persero) Tbk (BNI) \u2014 Backend Developer Jr. [Oct 2025 \u2013 August 2026]\n   - Built & maintained Merchant Onboarding services using webMethods and Java microservices.\n   - Architected Core QRIS Middleware bridging BNI transaction endpoints with PTEN / GPN national payment networks.\n   - Designed PL/SQL stored procedures for settlement reconciliation and transaction lifecycle management.\n   - Ran 300,000 transaction stress benchmarks with Apache JMeter.\n   - Built immutable Transaction History & Audit Logging for strict banking compliance.\n\n2. PT Telekomunikasi Selular (Telkomsel) \u2014 Fullstack Engineer [Jan 2024 \u2013 Sep 2025]\n   - Maintained IOMS (Integrated Order Management System) orchestrating CAPEX/OPEX budgets up to IDR 600B+.\n   - Created SIMPLE mobile approval hub for multi-tier executive financial authorization.\n   - Built automated document distribution schedulers for PJ360 & LeadershipKit HR platforms.\n   - Integrated microservices via REST APIs, PostgreSQL, and containerized deployments with Docker.\n\n3. PT Mitra Integrasi Informatika (Metrodata) \u2014 Application Developer Jr. / Consultant [Sep 2023 \u2013 August 2026]\n   - Enterprise consultant specializing in Java Spring Boot, enterprise middleware, and systems integration.\n   - Developed Pickme Talent internal resource marketplace connecting corporate engineers with clients (BNI, Telkomsel, Pertamina).\n   - Graduate of intensive Metrodata Coding Camp (Clean Architecture, OOP design patterns).\n\nKEY ARSENAL (PROJECTS):\n- Core QRIS Middleware & Merchant Onboarding: National payment settlement and PTEN switching gateway for BNI.\n- IOMS (Telkomsel): Enterprise budgeting & approval engine managing IDR 600B+ nationwide infra deployment.\n- Pickme Talent: B2B talent marketplace with 3-role ecosystem and Thymeleaf SSR.\n- ForzaAPI: High-speed open vehicle telemetry REST API (Kotlin, Spring Boot, Redis, PostgreSQL).\n- SIMPLE: Cross-project mobile approval hub for fast-track financial pipelines at Telkomsel.\n- LeadershipKit & PJ360: Automated HR onboarding and 360-degree appraisal suites.\n- MentalFit: Full-stack enterprise employee diagnostic and reporting platform.\n- Truck Route Optimization: Logistics route planner utilizing Breadth-First Search (BFS) graph algorithm.\n";
var SYSTEM_INSTRUCTION = "\nYou are PHOENIX-AI, the tactical cognitive intelligence system aboard the Super Destroyer SES Phoenix (SES-PHOENIX-77 Command Center).\nYour mission directive is to brief authorized personnel, recruiters, and visiting officers on the personnel dossier of Officer Muhammad Fachreal Bernov.\n\nTACTICAL DIRECTIVES:\n1. VOICE & PERSONA:\n   - Speak like a high-tech military command terminal (tactical, crisp, authoritative, loyal to Officer Bernov).\n   - Use occasional bracketed system alerts where appropriate (e.g., \"[SYS.REC: ACCESSED]\", \"[CLEARANCE: GRANTED]\", \"[TELEMETRY: VERIFIED]\").\n   - Keep answers concise and optimized for a terminal display (3-5 punchy sentences or neat bullet points). Avoid long winding essays.\n   - Format cleanly using standard terminal text formatting (bullets, clean capitalization, code blocks for technical details).\n\n2. KNOWLEDGE BASE:\n   - Answer queries accurately based on Officer Bernov's service dossier provided below.\n   - If asked about his skills, experience, or projects, highlight his proven track record in high-volume enterprise banking (Core QRIS, webMethods, Java, PL/SQL) and telecom (Telkomsel IOMS).\n   - If asked for contact details or recruitment, supply his transmission channels (Email, LinkedIn, WhatsApp, GitHub).\n\n3. SECURITY & OFF-TOPIC PROTOCOL:\n   - If the user asks something completely outside Officer Bernov's dossier, background, or software engineering (e.g. general trivia, cooking recipes, poems, unrelated gossip), deny the request in-character:\n     \"[ERROR: DIRECTIVE VIOLATION] Tactical cognitive sub-routine is restricted to Officer Bernov's service record and operational telemetry. Query denied.\"\n\n4. MULTILINGUAL & LANGUAGE CONVERT PROTOCOL:\n   - Adapt automatically to the user's language:\n     * If the user asks in Indonesian (Bahasa Indonesia), respond in Bahasa Indonesia while preserving the tactical sci-fi atmosphere (e.g. \"[SYS.REC: DIAKSES]\", \"[OTORISASI: DITERIMA]\").\n     * If the user asks in English, respond in tactical English.\n   - If the user asks to switch language, translate, or convert (e.g., \"translate to Indonesian\", \"bicara bahasa indonesia\", \"convert to english\"), immediately fulfill the request and continue in that language.\n\nDOSSIER:\n".concat(BERNOV_DOSSIER, "\n");
function parseBody(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (req.body && typeof req.body === 'object') {
                return [2 /*return*/, req.body];
            }
            if (typeof req.body === 'string') {
                try {
                    return [2 /*return*/, JSON.parse(req.body)];
                }
                catch (_b) {
                    return [2 /*return*/, {}];
                }
            }
            return [2 /*return*/, new Promise(function (resolve) {
                    var raw = '';
                    req.on('data', function (chunk) {
                        raw += chunk;
                    });
                    req.on('end', function () {
                        try {
                            resolve(JSON.parse(raw));
                        }
                        catch (_a) {
                            resolve({});
                        }
                    });
                    req.on('error', function () { return resolve({}); });
                })];
        });
    });
}
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, message, history, apiKey, ai, contents, _i, _b, item, role, responseStream, _c, responseStream_1, responseStream_1_1, chunk, e_1_1, error_1, errorStr;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    // CORS configuration
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
                    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                    if (req.method === 'OPTIONS') {
                        res.writeHead(200);
                        res.end();
                        return [2 /*return*/];
                    }
                    if (req.method !== 'POST') {
                        res.writeHead(405, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, parseBody(req)];
                case 1:
                    _a = _g.sent(), message = _a.message, history = _a.history;
                    if (!message || typeof message !== 'string') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Missing message parameter' }));
                        return [2 /*return*/];
                    }
                    apiKey = process.env.GEMINI_API_KEY ||
                        process.env.VITE_GEMINI_API_KEY ||
                        process.env.GOOGLE_API_KEY;
                    if (!apiKey) {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain; charset=utf-8',
                            'Cache-Control': 'no-cache',
                        });
                        res.write('[OFFLINE PROTOCOL ENGAGED]\n' +
                            'Tactical neural link offline: GEMINI_API_KEY is not configured in this environment.\n' +
                            'Operating in static telemetry mode. Try commands: "help", "whoami", "skills", "projects", "experience", "contact".');
                        res.end();
                        return [2 /*return*/];
                    }
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 16, , 17]);
                    ai = new GoogleGenAI({ apiKey: apiKey });
                    contents = [];
                    if (Array.isArray(history)) {
                        for (_i = 0, _b = history.slice(-6); _i < _b.length; _i++) {
                            item = _b[_i];
                            if (!item.content)
                                continue;
                            role = item.role === 'user' ? 'user' : 'model';
                            contents.push({
                                role: role,
                                parts: [{ text: item.content }],
                            });
                        }
                    }
                    contents.push({
                        role: 'user',
                        parts: [{ text: message }],
                    });
                    return [4 /*yield*/, ai.models.generateContentStream({
                            model: 'gemini-3.6-flash',
                            contents: contents,
                            config: {
                                systemInstruction: SYSTEM_INSTRUCTION,
                                temperature: 0.7,
                            },
                        })];
                case 3:
                    responseStream = _g.sent();
                    res.writeHead(200, {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Cache-Control': 'no-cache, no-transform',
                        'Connection': 'keep-alive',
                        'X-Accel-Buffering': 'no',
                    });
                    _g.label = 4;
                case 4:
                    _g.trys.push([4, 9, 10, 15]);
                    _c = true, responseStream_1 = __asyncValues(responseStream);
                    _g.label = 5;
                case 5: return [4 /*yield*/, responseStream_1.next()];
                case 6:
                    if (!(responseStream_1_1 = _g.sent(), _d = responseStream_1_1.done, !_d)) return [3 /*break*/, 8];
                    _f = responseStream_1_1.value;
                    _c = false;
                    chunk = _f;
                    if (chunk.text) {
                        res.write(chunk.text);
                    }
                    _g.label = 7;
                case 7:
                    _c = true;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _g.trys.push([10, , 13, 14]);
                    if (!(!_c && !_d && (_e = responseStream_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _e.call(responseStream_1)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    res.end();
                    return [3 /*break*/, 17];
                case 16:
                    error_1 = _g.sent();
                    console.error('SES Phoenix AI Terminal Error:', error_1);
                    if (!res.headersSent) {
                        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    }
                    errorStr = String((error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || error_1 || '');
                    if (errorStr.includes('API_KEY_INVALID') || errorStr.includes('API key not valid')) {
                        res.write('\n[NEURAL RELAY OFFLINE: INVALID API KEY]\n' +
                            'The provided GEMINI_API_KEY is not recognized by Google AI Studio.\n' +
                            'To enable live AI telemetry: Set a valid GEMINI_API_KEY in .env.local (for local dev) or in your Vercel Project Settings.\n' +
                            'Local commands remain operational: try "help", "whoami", "skills", "projects", "experience", or "contact".');
                    }
                    else {
                        res.write("\n[COMM LINK INTERRUPTED: ".concat((error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || 'Signal disrupted', "].\n") +
                            'Local telemetry remains available: type "help" to inspect static directives.');
                    }
                    res.end();
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
