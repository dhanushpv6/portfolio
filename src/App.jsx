import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, MapPin, GraduationCap, Code, ChevronDown, Globe, Briefcase } from 'lucide-react';
import Profile from "./assets/dhanush.jpeg"

const translations = {
  de: {
  nav: {
    about: 'Über mich',
    experience: 'Erfahrung',
    education: 'Bildung',
    projects: 'Projekte',
    contact: 'Kontakt'
  },

  hero: {
    greeting: 'Hallo, ich bin',
    title: 'Dhanush',
    subtitle: 'Masterstudent für Artificial Intelligence und Robotik in Deutschland. Ich baue KI-Systeme, die nachweisen können, dass sie richtig liegen: LLM-/RAG-Anwendungen, Agenten und Evaluation, mit Berufserfahrung in RAG, Agenten und LLM-Evaluation.',
    cta: 'Kontaktieren Sie mich'
  },

  about: {
    title: 'Wer bin ich?',
    content: 'Hallo, ich bin Dhanush und studiere derzeit Artificial Intelligence und Robotik in Deutschland.\n\nMein Schwerpunkt liegt auf angewandter KI: Dokumenten-KI, Retrieval/RAG, LLM-Agenten und deren Evaluation. Dabei setze ich auf Python, FastAPI, PostgreSQL und messbare Qualität statt reiner Demos.\n\nMeine Berufserfahrung mit RAG-Systemen und LLM-Agenten hilft mir, KI-Anwendungen zuverlässig, getestet und nachvollziehbar zu bauen.',
    button: 'Mehr über mich'
  },

  experience: {
    title: 'Berufserfahrung',
    description: 'Praxiserfahrung im Aufbau von RAG-Systemen, LLM-Agenten und Evaluations-Pipelines mit Python, FastAPI und Cloud-Plattformen.',
    download: 'Lebenslauf herunterladen',
    jobs: [
      {
        title: 'Associate AI Engineer',
        company: 'Company Name',
        duration: 'MM/YYYY - MM/YYYY',
        points: [
          'Entwicklung einer RAG-Anwendung zur Beantwortung natürlichsprachlicher Fragen über hochgeladene PDF- und Word-Dokumente, mit quellenbasierten Antworten, die jede Aussage mit ihrer Belegstelle verknüpfen.',
          'Umsetzung von Dokument-Chunking, Embeddings und semantischer Ähnlichkeitssuche mit den Vektorspeichern ChromaDB und FAISS.',
          'Kombination von BM25-Keyword-Suche und Vektorsuche sowie Cross-Encoder-Reranking zur Verbesserung der Relevanz der gefundenen Abschnitte.',
          'Entwicklung konfigurierbarer Prompt-Templates und Parsing strukturierter LLM-Ausgaben mit den OpenAI-APIs.',
          'Entwicklung automatisierter Evaluatoren und eines LLM-as-a-Judge-Frameworks zur Bewertung von Faithfulness und Relevanz generierter Antworten.'
        ]
      },
      {
        title: 'AI Engineer',
        company: 'Company Name',
        duration: 'MM/YYYY - Heute',
        points: [
          'Konzeption und Betrieb produktiver RAG-Plattformen für Enterprise-Wissenssuche mit Foundation-Modellen, pgvector oder Pinecone und LLM-Orchestrierungs-Frameworks.',
          'Aufbau von Multi-Agenten-Workflows mit LangGraph, inklusive Planner-, Retriever- und Validator-Agenten, Zustandsverwaltung, Tool Calling und Human-in-the-Loop-Kontrollen.',
          'Integration der Evaluation in die GitHub-Actions-CI mit Qualitätsschwellen für Faithfulness, Relevanz und Zitatabdeckung.',
          'Umsetzung von Responsible-AI-Kontrollen: Schutz vor Prompt Injection, PII-Schutz, Halluzinationsminderung und Audit-Logging.',
          'Einführung von LLM-Telemetrie, Modellwechsel und Kostenkontrolle sowie Deployment von KI-Diensten in der Cloud.'
        ]
      }
    ]
  },

  education: {
    title: 'Bildung',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2024 - Heute',
        degree: 'Master in Artificial Intelligence und Robotik'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Ausgewählte KI-Projekte',
    items: [
      {
        title: 'E-Invoice Copilot',
        description: 'Wandelt PDF-Rechnungen in standardkonforme E-Rechnungen um und erklärt jeden Validierungsfehler. Pipeline: OCR, LLM-Extraktion in ein Pydantic-Schema (EN-16931-Datenmodell), XML-Erzeugung, Validierung mit dem Open-Source-KoSIT-Validator und eine Human-Review-Queue für Ergebnisse mit niedriger Konfidenz. Geplante Evaluation: gelabeltes Rechnungsset mit Schwierigkeitsfällen, Feld-Precision/-Recall und Kosten pro Dokument.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Tesseract / PaddleOCR', 'LLM Structured Output', 'Pydantic', 'lxml', 'KoSIT Validator', 'Docker', 'pytest', 'GitHub Actions'],
        points: [
          'Extraktion von Rechnungsfeldern per LLM mit Structured Outputs in ein Pydantic-Schema, inklusive Schema-Validierung und Reparaturschritten bei fehlerhaften Modellausgaben.',
          'Deterministische Validierung des erzeugten XML mit dem KoSIT-Validator; jeder Validierungsfehler wird verständlich erklärt.',
          'Human-in-the-Loop-Review-Queue für Extraktionen mit niedriger Konfidenz.',
          'Modell-Kaskade von günstig zu stark mit Kostenerfassung pro Dokument.',
          'Evaluation auf einem gelabelten Rechnungsset mit Precision und Recall auf Feldebene.'
        ]
      },
      {
        title: 'Version-Aware Docs Assistant',
        description: 'Ein Dokumentationsassistent, der für die tatsächlich genutzte Softwareversion antwortet und Änderungen zwischen Versionen zusammenfasst. Hybride Suche (Keyword + Vektor) mit Versionsfilter, Reranking, Antworten mit Quellenangaben (Dokument, Abschnitt, Version) und „Ich weiß es nicht“ bei fehlender Evidenz. Evaluation mit handgeschriebenen, versionsabhängigen Fragen: Recall@k, MRR, Zitiergenauigkeit und Versionsfehlerrate.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Full-Text Search', 'Embeddings', 'Reranker', 'RAGAS', 'React', 'TypeScript'],
        points: [
          'Hybride Suche aus Keyword-Volltextsuche und pgvector-Ähnlichkeitssuche, gefiltert nach Softwareversion.',
          'Reranking zur Verbesserung der Relevanz der gefundenen Dokumentationsabschnitte.',
          'Antworten mit Quellenangaben (Dokument, Abschnitt, Version); bei fehlender Evidenz wird „unzureichende Evidenz“ ausgegeben.',
          'Vergleich von Vektor-only, Hybrid und versionsgefilterter Suche auf einem handgeschriebenen, versionsabhängigen Fragenset (Recall@k, MRR, Zitiergenauigkeit, Versionsfehlerrate).'
        ]
      },
      {
        title: 'Verified-RCA',
        description: 'Ein Incident-Investigation-Agent, der keine Aussage treffen darf, die er nicht belegen kann: Jede Behauptung im Bericht ist an eine Evidenz-Abfrage gebunden, die ein separater Verifier erneut ausführt. Fehlerszenarien nach öffentlichen Postmortems, Fault Injection, eingefrorene Telemetrie-Bundles für deterministische Offline-Benchmarks, Abstention („unzureichende Evidenz“) und Tests gegen Prompt Injection in Logs. Fixes werden nur vorgeschlagen und benötigen menschliche Freigabe.',
        stack: ['Python', 'LLM Agents', 'OpenTelemetry', 'Prometheus', 'Loki', 'Tempo', 'Docker Compose', 'Pydantic', 'pytest'],
        points: [
          'Zustandsbehafteter Agent mit schreibgeschützten Tool-Aufrufen für Metriken, Logs, Traces, Deployments und Konfigurationsunterschiede.',
          'Jede Berichtsaussage ist strukturiert (Behauptung, Evidenz-Abfrage, erwartetes Ergebnis) und wird von einem separaten Verifier gegen die Telemetrie erneut ausgeführt.',
          'Abstention-Handling; die Confident-Wrong-Rate wird getrennt von der Genauigkeit gemessen.',
          'Schutz vor Prompt Injection durch Behandlung von Log-Text als nicht vertrauenswürdige Eingabe, getestet mit in Logs platzierten Anweisungen.',
          'Benchmark mit eingefrorenen Telemetrie-Bundles für deterministische Offline-Läufe.'
        ]
      },
      {
        title: 'llm-replay',
        description: 'Ein kleines Open-Source-pytest-Plugin, das LLM- und Tool-Aufrufe aufzeichnet und deterministisch wiedergibt, sodass KI-Anwendungen Regressionstests ohne API-Kosten bei jedem Lauf erhalten. Version 0.1: Record/Replay für einen HTTP-Client, Scrubbing von Secrets und personenbezogenen Daten sowie Assertions auf Tool-Call-Reihenfolge und Kosten-/Latenzbudgets.',
        stack: ['Python', 'pytest Plugin API', 'httpx', 'Pydantic', 'MkDocs', 'GitHub Actions'],
        points: [
          'Zeichnet LLM- und Tool-Aufrufe auf und gibt sie wieder, sodass KI-Regressionstests deterministisch ohne Live-API-Aufrufe laufen.',
          'Entfernt Secrets und personenbezogene Daten aus aufgezeichneten Cassettes.',
          'Assertions auf Tool-Call-Reihenfolge sowie Kosten- und Latenzbudgets.',
          'Als dokumentiertes pytest-Plugin mit CI über GitHub Actions bereitgestellt.'
        ]
      }
    ]
  },

  contact: {
    title: 'Kontakt',
    phone: 'Telefonnummer',
    email: 'E-Mail',
    location: 'Standort',
    locationValue: 'Deutschland',
    button: 'Nachricht senden'
  }
},
  
  en: {
  nav: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact'
  },

  hero: {
    greeting: 'Hello, I am',
    title: 'Dhanush',
    subtitle: 'Master’s student in Artificial Intelligence and Robotics in Germany. I build AI systems that can prove they’re right: LLM and RAG applications, agents and evaluation, with professional experience in RAG, agents and LLM evaluation.',
    cta: 'Contact Me'
  },

  about: {
    title: 'Who am I?',
    content: 'Hi, I’m Dhanush, currently pursuing a Master’s in Artificial Intelligence and Robotics in Germany.\n\nMy focus is applied AI: document AI, retrieval and RAG, LLM agents and their evaluation, built with Python, FastAPI and PostgreSQL, with measured quality rather than just demos.\n\nMy professional experience with RAG systems and LLM agents helps me build AI applications that are reliable, tested and traceable.',
    button: 'More About Me'
  },

  experience: {
    title: 'Professional Experience',
    description: 'Hands-on experience building RAG systems, LLM agents and evaluation pipelines with Python, FastAPI and cloud platforms.',
    download: 'Download Resume',
    jobs: [
      {
        title: 'Associate AI Engineer',
        company: 'Company Name',
        duration: 'MM/YYYY - MM/YYYY',
        points: [
          'Developed a RAG application for answering natural-language questions over uploaded PDF and Word documents, with citation-grounded responses linking each answer to its supporting source.',
          'Implemented document chunking, embedding and semantic-similarity retrieval using ChromaDB and FAISS vector stores.',
          'Combined BM25 keyword retrieval with vector search and applied cross-encoder reranking to improve the relevance of retrieved chunks.',
          'Built configurable prompt templates and structured-output parsing for LLM-generated results using OpenAI APIs.',
          'Developed automated evaluators and an LLM-as-a-judge framework to score faithfulness and relevance of generated answers.'
        ]
      },
      {
        title: 'AI Engineer',
        company: 'Company Name',
        duration: 'MM/YYYY - Present',
        points: [
          'Designed and deployed production RAG platforms for enterprise knowledge retrieval using foundation models, pgvector or Pinecone, and LLM orchestration frameworks.',
          'Built multi-agent workflows with LangGraph, including planner, retriever and validator agents, stateful execution, tool calling and human-in-the-loop controls.',
          'Integrated evaluation into GitHub Actions CI with quality thresholds for answer faithfulness, relevance and citation coverage.',
          'Implemented responsible-AI controls including prompt-injection defences, PII protection, hallucination mitigation and audit logging.',
          'Added LLM application telemetry, model switching and cost controls, and deployed AI services on cloud infrastructure.'
        ]
      }
    ]
  },

  education: {
    title: 'Education',
    items: [
      {
        university: 'Hochschule Hof, University of Applied Sciences',
        year: '2024 - Present',
        degree: 'Master’s in Artificial Intelligence and Robotics'
      },
      {
        university: 'Visvesvaraya Technological University',
        year: '2018 - 2022',
        degree: 'Bachelor of Engineering in Information Science'
      }
    ]
  },

  projects: {
    title: 'Selected AI Projects',
    items: [
      {
        title: 'E-Invoice Copilot',
        description: 'Converts PDF invoices into standards-conformant e-invoices and explains every validation error. Pipeline: OCR, LLM extraction into a Pydantic schema mapped to the EN 16931 data model, XML generation, validation with the open-source KoSIT validator, and a human review queue for low-confidence results. Planned evaluation: a labelled invoice set with hard cases, field-level precision and recall, and cost per document.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'Tesseract / PaddleOCR', 'LLM Structured Output', 'Pydantic', 'lxml', 'KoSIT Validator', 'Docker', 'pytest', 'GitHub Actions'],
        points: [
          'Extracted invoice fields with an LLM using structured outputs parsed into a Pydantic schema, with schema validation and repair steps for malformed model output.',
          'Added deterministic validation of generated XML against the KoSIT validator and turned each validation error into a plain-English explanation.',
          'Built a human-in-the-loop review queue for low-confidence extractions.',
          'Implemented a cheap-to-strong model cascade with cost-per-document tracking.',
          'Evaluating on a labelled invoice set with field-level precision and recall.'
        ]
      },
      {
        title: 'Version-Aware Docs Assistant',
        description: 'A documentation assistant that answers for the software version you actually use and summarises what changed between versions. Hybrid search (keyword plus vector) with version filtering, reranking, citations showing document, section and version, and an explicit "I don\u2019t know" when evidence is missing. Evaluated on hand-written, version-dependent questions: Recall@k, MRR, citation correctness and version-error rate.',
        stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Full-Text Search', 'Embeddings', 'Reranker', 'RAGAS', 'React', 'TypeScript'],
        points: [
          'Built hybrid retrieval combining keyword (full-text) search and pgvector similarity search, filtered by software version.',
          'Applied reranking to improve the relevance of retrieved documentation chunks.',
          'Generated citation-grounded answers showing document, section and version, and returned \u201cinsufficient evidence\u201d when support was missing.',
          'Compared vector-only, hybrid and version-filtered retrieval on a hand-written, version-dependent question set (Recall@k, MRR, citation correctness, version-error rate).'
        ]
      },
      {
        title: 'Verified-RCA',
        description: 'An incident-investigation agent that is not allowed to make a claim it cannot prove: every statement in its report is backed by an evidence query that a separate verifier re-runs. Includes failure scenarios modelled on public postmortems, fault injection, frozen telemetry bundles for deterministic offline benchmarks, abstention ("insufficient evidence"), and prompt-injection tests with instructions planted in logs. Fixes are only proposed and need human approval.',
        stack: ['Python', 'LLM Agents', 'OpenTelemetry', 'Prometheus', 'Loki', 'Tempo', 'Docker Compose', 'Pydantic', 'pytest'],
        points: [
          'Designed a stateful agent with read-only tool calling over metrics, logs, traces, deploys and config diffs.',
          'Structured every report claim as data (claim, evidence query, expected result) so a separate verifier can re-run it against telemetry.',
          'Added abstention handling and measure the confident-wrong rate separately from accuracy.',
          'Defended against prompt injection by treating log text as untrusted input, and test it with instructions planted in logs.',
          'Benchmark replays frozen telemetry bundles offline for deterministic, low-cost runs.'
        ]
      },
      {
        title: 'llm-replay',
        description: 'A small open-source pytest plugin that records LLM and tool calls from a test run and replays them deterministically, so AI applications get regression tests without paying for API calls on every run. Version 0.1: record and replay for one HTTP client, secret and personal-data scrubbing, and assertions on tool-call order and cost or latency budgets.',
        stack: ['Python', 'pytest Plugin API', 'httpx', 'Pydantic', 'MkDocs', 'GitHub Actions'],
        points: [
          'Records and replays LLM and tool calls so AI regression tests run deterministically without live API calls.',
          'Scrubs secrets and personal data from recorded cassettes.',
          'Asserts on tool-call order and on cost and latency budgets.',
          'Packaged as a documented pytest plugin with CI on GitHub Actions.'
        ]
      }
    ]
  },

  contact: {
    title: 'Contact Dhanush',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Location',
    locationValue: 'Germany',
    button: 'Send Message'
  }
}
  
};

export default function Portfolio() {
  const [language, setLanguage] = useState('de');
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const t = translations[language];

  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity, backgroundColor: headerBackground }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-gray-200"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900"
            >
              DPV
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value], index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => scrollToSection(key === 'about' ? 'about' : key)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
                    activeSection === key ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-all duration-300"
            >
              <Globe size={16} />
              {language === 'de' ? 'EN' : 'DE'}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p
                variants={itemVariants}
                className="text-blue-600 font-medium mb-4"
              >
                {t.hero.greeting}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
              >
                {t.hero.title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                {t.hero.subtitle}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex gap-4"
              >
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  {t.hero.cta}
                </a>
                <a
                  href="https://github.com/Dhanush-pv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-900 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  GitHub
                </a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex gap-4 mt-8"
              >
                <a
                  href="https://github.com/Dhanush-pv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                  className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} className="text-gray-700" />
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
             <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
  <div className="w-full h-full p-4 flex items-center justify-center">
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <img 
        src={Profile} 
        alt="Profilbild" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={32} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{t.about.title}</h2>
            <motion.p
              variants={fadeInUpVariants}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              {t.about.content}
            </motion.p>
            <motion.a
              variants={fadeInUpVariants}
              href="#experience"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              {t.about.button}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              {t.experience.title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-12 leading-relaxed"
            >
              {t.experience.description}
            </motion.p>

            <div className="space-y-8">
              {t.experience.jobs.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Briefcase size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                      {job.points && (
                        <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-700 leading-relaxed">
                          {job.points.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex gap-4"
            >
              <a
                href="https://drive.google.com/file/d/1yCURBN3cfzdoSf3cCkwjB_JDH1WU1rkN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                {t.experience.download}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.education.title}
            </motion.h2>

            <div className="space-y-8">
              {t.education.items.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <GraduationCap size={24} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                      <p className="text-purple-600 font-medium mb-2">{edu.university}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
            >
              {t.projects.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {t.projects.items.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Code size={24} className="text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">{project.description}</p>
                  {project.points && (
                    <ul className="mb-5 space-y-2 list-disc pl-5 text-sm text-gray-700 leading-relaxed">
                      {project.points.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              >
                {t.contact.title}
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.email}</p>
                    <a
                      href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      dhanush.palani.vijay.kumari.job@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <MapPin size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.contact.location}</p>
                    <p className="text-lg font-medium text-gray-900">{t.contact.locationValue}</p>
                  </div>
                </div>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                {t.contact.button}
              </motion.a>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-md mx-auto"
              >
               <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
  <div className="w-full h-full p-4 flex items-center justify-center">
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <img 
        src={Profile} 
        alt="Profilbild" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-3xl opacity-30"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold text-gray-900 mb-2">Dhanush</p>
              <p className="text-gray-600">
                {language === 'de' 
                  ? 'KI-Entwickler & Problemlöser' 
                  : 'AI Engineer & Problem Solver'}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/Dhanush-pv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Github size={20} className="text-gray-700" />
              </a>
              <a
                href="mailto:dhanush.palani.vijay.kumari.job@gmail.com"
                className="p-3 bg-white hover:bg-blue-50 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Mail size={20} className="text-gray-700" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm"
          >
            <p>© 2025 Dhanush Palani Vijay Kumari. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}