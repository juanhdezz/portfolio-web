// Every fact here comes from cv.pdf or the GitHub repos documented in CONTENT.md.

export type Locale = "es" | "en";
type L = Record<Locale, string>;

export const SITE_URL = "https://portfolio-web-juanhdezzs-projects.vercel.app";
export const CV_PATH = "/cv-juan-hernandez-sanchez-agesta.pdf";
export const CV_FILENAME = "CV-Juan-Hernandez-Sanchez-Agesta.pdf";

export const person = {
  name: "Juan Hernández Sánchez-Agesta",
  nameLines: ["Juan", "Hernández", "Sánchez-Agesta"],
  email: "jhernandezsanchezagesta@gmail.com",
  linkedin: "https://www.linkedin.com/in/juan-hernandez-sag/",
  github: "https://github.com/juanhdezz",
  location: { es: "Granada, España", en: "Granada, Spain" } satisfies L,
};

export const ui = {
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  nav: {
    about: { es: "Perfil", en: "Profile" },
    projects: { es: "Proyectos", en: "Projects" },
    experience: { es: "Trayectoria", en: "Experience" },
    education: { es: "Formación", en: "Education" },
    contact: { es: "Contacto", en: "Contact" },
  },
  cvShort: { es: "CV", en: "CV" },
  cvNavLabel: { es: "Descargar CV en PDF", en: "Download CV as PDF" },
  langSwitch: { es: "English", en: "Español" },
  langSwitchLabel: { es: "Ver la web en inglés", en: "View the site in Spanish" },
  themeLabel: { es: "Cambiar tema claro u oscuro", en: "Toggle light or dark theme" },
  menu: { es: "Menú", en: "Menu" },
  close: { es: "Cerrar", en: "Close" },
} satisfies Record<string, unknown>;

export const hero = {
  role: { es: "Data Scientist y AI Engineer en Granada", en: "Data Scientist and AI Engineer based in Granada" },
  pitch: {
    es: "Ingeniero informático y graduado en ADE. Llevo modelos predictivos y agentes de IA desde los datos en bruto hasta una decisión de negocio clara.",
    en: "Computer engineer with a business degree. I take predictive models and AI agents from raw data to a clear business decision.",
  },
  now: {
    es: "Ahora: Data Scientist en WhiteBox, en un proyecto de consultoría para Renfe.",
    en: "Now: Data Scientist at WhiteBox, on a consulting project for Renfe.",
  },
  ctaProjects: { es: "Ver proyectos", en: "See projects" },
  ctaCv: { es: "Descargar CV", en: "Download CV" },
  legendObserved: { es: "observado", en: "observed" },
  legendForecast: { es: "previsto", en: "forecast" },
};

export const about = {
  title: { es: "Entre el modelo y la decisión", en: "Between the model and the decision" },
  paragraphs: [
    {
      es: "Soy Data Scientist con un Máster en Ciencia de Datos por la Universidad de Granada y una doble formación en Ingeniería Informática y Administración y Dirección de Empresas. Esa mezcla define cómo trabajo: entiendo el detalle técnico y también lo que necesita oír quien tiene que decidir.",
      en: "I'm a Data Scientist with a Master's in Data Science from the University of Granada and a dual background in Computer Engineering and Business Administration. That mix shapes how I work: I understand the technical detail and also what the person making the decision needs to hear.",
    },
    {
      es: "He pasado por la ingeniería de datos en el ecosistema Hadoop y Spark, por la automatización con IA generativa y LangChain/LangGraph, y hoy aplico machine learning sobre datos operativos ferroviarios reales. Fuera del trabajo construyo agentes: sistemas que razonan, usan herramientas y se evalúan con métricas.",
      en: "I've worked in data engineering on the Hadoop and Spark ecosystem, in automation with generative AI and LangChain/LangGraph, and today I apply machine learning to real railway operations data. Outside work I build agents: systems that reason, use tools and get evaluated with metrics.",
    },
    {
      es: "El fútbol me ha enseñado a liderar bajo presión, a colaborar y a adaptarme cuando el partido cambia.",
      en: "Football taught me to lead under pressure, to collaborate and to adapt when the game changes.",
    },
  ],
  facts: [
    { k: { es: "Máster", en: "Master's" }, v: { es: "Ciencia de Datos, UGR", en: "Data Science, UGR" } },
    { k: { es: "Grado", en: "Degree" }, v: { es: "Ingeniería Informática, UGR", en: "Computer Engineering, UGR" } },
    { k: { es: "Grado", en: "Degree" }, v: { es: "ADE, UGR", en: "Business Administration, UGR" } },
    { k: { es: "Foco", en: "Focus" }, v: { es: "Ciencia de datos y agentic AI", en: "Data science and agentic AI" } },
  ],
  photoAlt: { es: "Retrato de Juan Hernández", en: "Portrait of Juan Hernández" },
};

export type ProjectLink = { label: L; href: string };
export type Project = {
  id: "emergencias" | "voicebank" | "stem" | "tfm";
  name: string;
  tagline: L;
  context: L;
  problem: L;
  approach: L[];
  result?: L;
  stack: string[];
  contribution: L;
  links: ProjectLink[];
  privateNote?: L;
  image?: { src: string; alt: L; width: number; height: number };
};

export const projectsSection = {
  title: { es: "Proyectos", en: "Projects" },
  intro: {
    es: "Cuatro proyectos recientes, elegidos entre mis repositorios por ambición y por su relación con datos, machine learning y agentes. Cada uno se describe con lo que está en su código y su documentación.",
    en: "Four recent projects, picked from my repositories for ambition and their connection to data, machine learning and agents. Each one is described from what's in its code and documentation.",
  },
  labels: {
    problem: { es: "Problema", en: "Problem" },
    approach: { es: "Enfoque", en: "Approach" },
    result: { es: "Resultado", en: "Result" },
    stack: { es: "Stack", en: "Stack" },
    contribution: { es: "Mi parte", en: "My role" },
    more: { es: "Ver detalle", en: "Show details" },
    less: { es: "Ocultar detalle", en: "Hide details" },
  },
};

export const projects: Project[] = [
  {
    id: "emergencias",
    name: "emergencIAs",
    tagline: {
      es: "Sala de mando de emergencias de España con agentes de IA.",
      en: "An emergency command centre for Spain, run alongside AI agents.",
    },
    context: { es: "Octubre 2026, proyecto personal", en: "October 2026, personal project" },
    problem: {
      es: "En una emergencia, alertas, llamadas al 112, recursos y situaciones viven en sistemas distintos y el operador tiene que cruzarlos a mano.",
      en: "During an emergency, alerts, 112 calls, resources and incidents live in separate systems, and operators have to cross-reference them by hand.",
    },
    approach: [
      {
        es: "Una sola pantalla con alertas en tiempo real por WebSocket, una centralita 112 atendida por agentes de IA (transcripción en streaming, emoción, clasificación, prioridad y escalado a una persona) y fichas de situación con informes y recomendaciones generadas por IA que el operador acepta o descarta.",
        en: "One screen with real-time alerts over WebSocket, a 112 switchboard handled by AI agents (streaming transcription, emotion, classification, priority and escalation to a human) and incident files with AI-written reports and recommendations the operator accepts or dismisses.",
      },
      {
        es: "Mapa operativo por comunidades y provincias con vista 3D, reproducción de las últimas 6 horas y comparador de regiones; cronología e informes ejecutivos en PDF.",
        en: "Operational map by region and province with a 3D view, 6-hour replay and region comparison; timeline and executive PDF reports.",
      },
      {
        es: "Monorepo con contrato de dominio en Zod compartido por web y API. Si la API no responde, el mismo motor de simulación arranca en el navegador. Con clave de Anthropic, la capa de IA pasa de un modelo simulado a Claude.",
        en: "Monorepo with a Zod domain contract shared by web and API. If the API is down, the same simulation engine starts in the browser. With an Anthropic key, the AI layer switches from a mock model to Claude.",
      },
    ],
    result: {
      es: "Demo pública funcionando con una simulación realista de España (datos ficticios). Tests e2e con Playwright en tres tamaños de pantalla, contraste AA y movimiento reducido respetado.",
      en: "Public demo running on a realistic simulation of Spain (mock data). Playwright e2e tests across three screen sizes, AA contrast and reduced motion respected.",
    },
    stack: ["TypeScript", "Next.js 16", "React 19", "Tailwind v4", "MapLibre", "deck.gl", "Hono", "Zod", "WebSocket", "Claude API", "Vitest", "Playwright", "Docker"],
    contribution: {
      es: "Proyecto individual: producto, arquitectura y desarrollo.",
      en: "Solo project: product, architecture and development.",
    },
    links: [{ label: { es: "Abrir la demo", en: "Open the demo" }, href: "https://emergencias-platform.vercel.app" }],
    privateNote: { es: "Repositorio privado", en: "Private repository" },
    image: {
      src: "/images/projects/emergencias.jpg",
      alt: {
        es: "Centro de mando de emergencIAs: indicadores en vivo, feed de alertas, crisis activa con recomendaciones de la IA y estado del sistema.",
        en: "emergencIAs command centre: live indicators, alert feed, active crisis with AI recommendations and system status.",
      },
      width: 1440,
      height: 900,
    },
  },
  {
    id: "voicebank",
    name: "Habla con tu dinero",
    tagline: {
      es: "Asistente bancario por voz que responde preguntas sobre tus movimientos con datos y gráficos.",
      en: "A voice banking assistant that answers questions about your transactions with data and charts.",
    },
    context: {
      es: "Reto IA de la Cátedra IA Responsable en Finanzas (Unicaja y UGR), junio a septiembre 2026. Dos iteraciones.",
      en: "AI challenge by the Responsible AI in Finance Chair (Unicaja and UGR), June to September 2026. Two iterations.",
    },
    problem: {
      es: "Consultar el saldo, enviar un Bizum o preguntar \"¿cuánto gasté en restaurantes este mes?\" hablando, y recibir una respuesta hablada con el gráfico adecuado.",
      en: "Check your balance, send a Bizum or ask \"how much did I spend on restaurants this month?\" out loud, and get a spoken answer with the right chart.",
    },
    approach: [
      {
        es: "Primera versión: agente ReAct con LangGraph y tools bancarias (saldo, movimientos, SQL, Bizum simulado), guardrails de dominio y anti-alucinación con LLM-as-judge, voz con la Web Speech API y LLM intercambiable (Gemini, Cerebras, NVIDIA u Ollama). Migrada de Streamlit a Next.js.",
        en: "First version: a LangGraph ReAct agent with banking tools (balance, transactions, SQL, simulated Bizum), domain and anti-hallucination guardrails with LLM-as-judge, voice through the Web Speech API and a swappable LLM (Gemini, Cerebras, NVIDIA or Ollama). Migrated from Streamlit to Next.js.",
      },
      {
        es: "Segunda versión: agent loop propio sobre una WebSocket por sesión. El paso de lenguaje natural a SQL es un subsistema medido: esquema enumerado, anclas de fecha, few-shots, guardrails con sqlglot (solo SELECT, tablas permitidas, límite y timeout), auto-reparación y un set de evaluación de 50 preguntas en español.",
        en: "Second version: a hand-written agent loop over one WebSocket per session. Natural language to SQL is a measured subsystem: enumerated schema, date anchors, few-shots, sqlglot guardrails (SELECT only, allow-listed tables, limit and timeout), self-repair and a 50-question Spanish eval set.",
      },
      {
        es: "Voz en streaming: detección de voz en el navegador, transcripción con Whisper, síntesis por frases con Kokoro o Piper, importes y fechas leídos en palabras, interrupción a mitad de respuesta y un panel de latencia por turno. El Bizum solo se ejecuta tras confirmación, impuesta en código y no en el prompt.",
        en: "Streaming voice: in-browser voice detection, Whisper transcription, sentence-by-sentence synthesis with Kokoro or Piper, amounts and dates read out as words, barge-in and a per-turn latency panel. Bizum only runs after confirmation, enforced in code rather than in the prompt.",
      },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "DuckDB", "PostgreSQL", "sqlglot", "WebSocket", "Whisper", "Gemini", "Next.js", "ECharts", "pytest"],
    contribution: {
      es: "Proyecto individual: definición, arquitectura, evaluación y desarrollo apoyado en agentes de código.",
      en: "Solo project: scoping, architecture, evaluation and development with coding agents.",
    },
    links: [{ label: { es: "Abrir la demo (v1)", en: "Open the demo (v1)" }, href: "https://unicaja-ai-assistant.vercel.app" }],
    privateNote: { es: "Repositorios privados", en: "Private repositories" },
    image: {
      src: "/images/projects/unicaja.jpg",
      alt: {
        es: "Demo de la primera versión: a la pregunta \"¿en qué categorías he gastado más este mes?\" responde con un ranking de gastos en barras y explica por qué eligió ese gráfico.",
        en: "First-version demo: asked \"which categories did I spend most on this month?\", it answers with a bar-chart spending ranking and explains why it chose that chart.",
      },
      width: 780,
      height: 600,
    },
  },
  {
    id: "stem",
    name: "StemAgent",
    tagline: {
      es: "Un agente base que descubre cómo trabajan los expertos, se rediseña y se valida antes de especializarse.",
      en: "A base agent that learns how experts work, redesigns itself and validates before it specialises.",
    },
    context: {
      es: "Mayo 2026, reto planteado por JetBrains",
      en: "May 2026, challenge set by JetBrains",
    },
    problem: {
      es: "¿Y si un agente funcionara como una célula madre? Dada una clase de problemas, y no una tarea concreta, debe decidir qué herramientas y qué forma de trabajar adoptar, y saber cuándo está listo.",
      en: "What if an agent worked like a stem cell? Given a class of problems rather than a single task, it has to decide which tools and way of working to adopt, and know when it's ready.",
    },
    approach: [
      {
        es: "Grafo de LangGraph con cuatro nodos: Discovery busca en la web cómo se hace code review y sintetiza estrategias; Design genera la configuración del agente (system prompt, herramientas y flujo) usando las métricas del intento anterior; Validation lo evalúa contra un benchmark etiquetado; Crystallization exporta el agente final.",
        en: "A LangGraph graph with four nodes: Discovery searches the web for how code review is done and synthesises strategies; Design generates the agent configuration (system prompt, tools and flow) using the previous attempt's metrics; Validation scores it against a labelled benchmark; Crystallization exports the final agent.",
      },
      {
        es: "El bucle Design → Validation se repite hasta superar un umbral fijo de F1 ≥ 0,70, para que la parada sea objetiva y reproducible.",
        en: "The Design → Validation loop repeats until it clears a fixed F1 ≥ 0.70 threshold, so stopping is objective and reproducible.",
      },
    ],
    result: {
      es: "Según el informe del repositorio, el F1 pasa de 0,180 con un agente genérico a 0,743 con el agente especializado (precisión de 0,108 a 0,788).",
      en: "According to the repository report, F1 goes from 0.180 with a generic agent to 0.743 with the specialised agent (precision from 0.108 to 0.788).",
    },
    stack: ["Python", "LangGraph", "LangChain", "OpenAI API", "Tavily", "pytest"],
    contribution: {
      es: "Proyecto individual: código, benchmark e informe.",
      en: "Solo project: code, benchmark and report.",
    },
    links: [{ label: { es: "Ver en GitHub", en: "View on GitHub" }, href: "https://github.com/juanhdezz/stem-agent" }],
  },
  {
    id: "tfm",
    name: "Sesgo demográfico en predicción de glucosa",
    tagline: {
      es: "Trabajo fin de máster: ¿equilibrar edad y sexo en los datos de entrenamiento mejora un LSTM que predice glucosa?",
      en: "Master's thesis: does balancing age and sex in the training data improve an LSTM that predicts glucose?",
    },
    context: { es: "Marzo a septiembre 2026, Máster en Ciencia de Datos, UGR", en: "March to September 2026, Master's in Data Science, UGR" },
    problem: {
      es: "Los modelos que predicen la glucosa en diabetes tipo 1 se entrenan con cohortes desequilibradas, y pueden rendir peor para los grupos menos representados.",
      en: "Glucose prediction models for type 1 diabetes are trained on imbalanced cohorts and may perform worse for under-represented groups.",
    },
    approach: [
      {
        es: "Modelo LSTM sobre datos de monitorización continua de glucosa en tres datasets: T1DiabetesGranada (643 pacientes, más de 30 millones de mediciones), REPLACE-BG y DiaTrend.",
        en: "An LSTM model on continuous glucose monitoring data across three datasets: T1DiabetesGranada (643 patients, over 30 million readings), REPLACE-BG and DiaTrend.",
      },
      {
        es: "Balanceo aplicado solo a los pliegues de entrenamiento con Group K-Fold, para que ningún paciente esté en train y test a la vez: técnicas aleatorias, guiadas e híbridas (ROS, SMOTE, jittering, submuestreo, Tomek) sobre edad y sexo, 21 condiciones en total.",
        en: "Balancing applied only to training folds with Group K-Fold, so no patient appears in both train and test: random, guided and hybrid techniques (ROS, SMOTE, jittering, undersampling, Tomek) on age and sex, 21 conditions in total.",
      },
      {
        es: "Evaluación por rango glucémico (global, en rango e hipoglucemia) con pruebas de Friedman, post-hoc de Nemenyi, d de Cohen y rankings de Borda. Entrenamiento en servidor con SLURM.",
        en: "Evaluation by glucose range (overall, in range and hypoglycaemia) with Friedman tests, Nemenyi post-hoc, Cohen's d and Borda rankings. Training on a server with SLURM.",
      },
    ],
    result: {
      es: "El balanceo no mejora el rendimiento global de forma generalizable: depende del dataset. En DiaTrend aparece un trade-off: las técnicas que mejoran el error global empeoran la hipoglucemia severa, y viceversa.",
      en: "Balancing does not improve overall performance in a generalisable way: it depends on the dataset. In DiaTrend there's a trade-off: techniques that improve overall error worsen severe hypoglycaemia, and vice versa.",
    },
    stack: ["Python", "TensorFlow / Keras", "LSTM", "pandas", "imbalanced-learn", "SLURM", "LaTeX"],
    contribution: { es: "Trabajo fin de máster individual.", en: "Individual master's thesis." },
    links: [
      { label: { es: "Ver en GitHub", en: "View on GitHub" }, href: "https://github.com/juanhdezz/TFM-Glucose-Prediction" },
      { label: { es: "Leer la memoria (PDF)", en: "Read the thesis (PDF)" }, href: "https://juanhdezz.github.io/TFM-Glucose-Prediction/" },
    ],
  },
];

export const experienceSection = {
  title: { es: "Trayectoria", en: "Experience" },
  now: { es: "Actualidad", en: "Present" },
};

export const experience = [
  {
    role: { es: "Data Scientist", en: "Data Scientist" },
    company: "WhiteBox",
    start: { es: "Jul 2026", en: "Jul 2026" },
    end: null,
    summary: {
      es: "En un proyecto de consultoría para Renfe. Ciclo completo de ciencia de datos: preparación de datos, análisis exploratorio, modelado predictivo y entrega de insights accionables a negocio, con machine learning sobre datos operativos ferroviarios reales. Hago de puente entre los equipos técnicos y de negocio, y traduzco los hallazgos en recomendaciones listas para decidir.",
      en: "On a consulting project for Renfe. The full data science lifecycle: data wrangling, exploratory analysis, predictive modelling and actionable insights for the business, applying machine learning to real railway operations data. I act as the bridge between technical and business teams, turning findings into decision-ready recommendations.",
    },
  },
  {
    role: { es: "AI Engineer y Automation Engineer", en: "AI Engineer and Automation Engineer" },
    company: "NTT Data Europe & LATAM",
    start: { es: "Ene 2026", en: "Jan 2026" },
    end: { es: "Jul 2026", en: "Jul 2026" },
    summary: {
      es: "Diseño y desarrollo de soluciones de automatización inteligente que combinan APIs, workflows automatizados y modelos de IA generativa. Integración de datos entre plataformas empresariales y automatización de procesos repetitivos. Trabajo directo con LLMs y LangChain/LangGraph, con foco en la aplicación práctica para negocio.",
      en: "Design and development of intelligent automation solutions combining APIs, automated workflows and generative AI models. Data integration across enterprise platforms and automation of repetitive processes. Hands-on work with LLMs and LangChain/LangGraph, focused on practical business use.",
    },
  },
  {
    role: { es: "Data Engineer Trainee", en: "Data Engineer Trainee" },
    company: "NFQ Advisory, Solutions, Outsourcing",
    start: { es: "Sep 2025", en: "Sep 2025" },
    end: { es: "Ene 2026", en: "Jan 2026" },
    summary: {
      es: "Consultoría Big Data en el ecosistema Hadoop: Spark con Scala y PySpark, optimización de consultas y diseño de pipelines robustos, del dato en bruto al despliegue en producción.",
      en: "Big Data consulting on the Hadoop ecosystem: Spark with Scala and PySpark, query optimisation and robust pipeline design, from raw data to production deployment.",
    },
  },
];

export const educationSection = {
  title: { es: "Formación y logros", en: "Education and achievements" },
  education: { es: "Formación", en: "Education" },
  certifications: { es: "Certificaciones", en: "Certifications" },
  achievements: { es: "Hackathons y competiciones", en: "Hackathons and competitions" },
};

export const education = [
  {
    title: { es: "Máster en Ciencia de Datos", en: "Master's in Data Science" },
    detail: { es: "Data Science & Intelligent Technologies", en: "Data Science & Intelligent Technologies" },
    org: "Universidad de Granada",
    years: "2025–2026",
  },
  {
    title: { es: "Grado en Ingeniería Informática", en: "Bachelor's in Computer Engineering" },
    org: "Universidad de Granada",
    years: "2020–2025",
  },
  {
    title: { es: "Grado en Administración y Dirección de Empresas", en: "Bachelor's in Business Administration and Management" },
    org: "Universidad de Granada",
    years: "2020–2025",
  },
];

export const certifications = [
  { name: "Google Cloud Certified Generative AI Leader", org: "Google Cloud" },
  { name: "Google Cloud Digital Leader", org: "Google Cloud" },
  { name: "Cambridge B2 First (FCE)", org: { es: "Inglés", en: "English" } },
  { name: "Professional course in Project Management", org: "Coursera" },
  { name: "Business Intelligence, Data Discovery and SQL", org: "Civica" },
  { name: "Data-Driven Analytics", org: "Platzi" },
];

export const achievements = [
  {
    title: "HackSpain 2026",
    badge: { es: "Seleccionado", en: "Selected" },
    meta: { es: "Madrid, 18–20 sep 2026", en: "Madrid, 18–20 Sep 2026" },
    text: {
      es: "Uno de los 250 builders técnicos menores de 30 años seleccionados en toda España para un hackathon presencial de 36 horas en la Universidad Politécnica de Madrid: construir productos desde cero en cinco tracks, junto a empresas, startups y fondos de venture capital.",
      en: "One of 250 technical builders under 30 selected across Spain for a 36-hour in-person hackathon at the Universidad Politécnica de Madrid: building products from scratch across five tracks, alongside companies, startups and venture capital firms.",
    },
  },
  {
    title: "Ideas Factory UGR",
    badge: { es: "1.er puesto", en: "1st place" },
    meta: { es: "UGRemprendedora", en: "UGRemprendedora" },
    text: {
      es: "Primer puesto y clasificación para el Concurso Provincial de Ideas de Negocio, donde obtuve el 3.er puesto en la final y un premio de 1.400 €.",
      en: "First place and a spot in the Provincial Business Ideas Competition, where I finished 3rd in the final and won a €1,400 award.",
    },
  },
];

export const skillsSection = {
  title: { es: "Stack", en: "Stack" },
  intro: {
    es: "Las herramientas de mi CV, agrupadas por uso. Sin porcentajes: lo que cuenta es dónde las he aplicado.",
    en: "The tools on my CV, grouped by use. No percentages: what matters is where I've applied them.",
  },
  projectsLabel: { es: "También en mis proyectos recientes", en: "Also in my recent projects" },
};

export const skills = [
  { group: { es: "IA y machine learning", en: "AI and machine learning" }, items: ["Machine Learning", "Deep Learning / LSTM", "LLMs y GenAI", "LangChain / LangGraph", "Agentic AI"] },
  { group: { es: "Lenguajes", en: "Languages" }, items: ["Python (pandas, scikit-learn, PyTorch)", "R", "SQL / NoSQL", "Java", "C++"] },
  { group: { es: "Big Data", en: "Big Data" }, items: ["Spark", "Hadoop", "Databricks", "HDFS", "Pig"] },
  { group: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB"] },
];

export const projectTools = ["FastAPI", "DuckDB", "TensorFlow / Keras", "Next.js", "TypeScript", "Docker", "pytest", "Playwright"];

export const cvSection = {
  title: { es: "Todo esto, en una página", en: "All of this, on one page" },
  text: {
    es: "Mi CV en PDF con experiencia, formación, certificaciones y logros. Está en inglés.",
    en: "My CV as a PDF with experience, education, certifications and achievements.",
  },
  button: { es: "Descargar CV (PDF, 1,1 MB)", en: "Download CV (PDF, 1.1 MB)" },
  open: { es: "Abrir en el navegador", en: "Open in the browser" },
};

export const contactSection = {
  title: { es: "Hablemos", en: "Let's talk" },
  text: {
    es: "Si tienes un problema de datos o una idea para un agente, escríbeme por email o por LinkedIn.",
    en: "If you have a data problem or an idea for an agent, write to me by email or on LinkedIn.",
  },
  copy: { es: "Copiar email", en: "Copy email" },
  copied: { es: "Email copiado", en: "Email copied" },
};

export const footer = {
  built: {
    es: "Diseñado y construido con Next.js, TypeScript y Motion. Contenido verificado contra mi CV y mis repositorios.",
    en: "Designed and built with Next.js, TypeScript and Motion. Content checked against my CV and repositories.",
  },
  top: { es: "Volver arriba", en: "Back to top" },
};

export const meta = {
  title: {
    es: "Juan Hernández Sánchez-Agesta | Data Scientist y AI Engineer",
    en: "Juan Hernández Sánchez-Agesta | Data Scientist and AI Engineer",
  },
  description: {
    es: "Data Scientist y AI Engineer en Granada. Modelado predictivo, LLMs y agentes de IA, con perfil técnico y de negocio. Proyectos, trayectoria y CV.",
    en: "Data Scientist and AI Engineer in Granada, Spain. Predictive modelling, LLMs and AI agents, with a technical and business background. Projects, experience and CV.",
  },
};

export const t = (v: L, locale: Locale) => v[locale];
