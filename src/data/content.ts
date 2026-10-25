import { sentinelShot, workflowShot, terminalShot, executionsShot, trelloShot, ntfyShot } from "./images";

export const profile = {
  name: "Pascal Chimdindu Anorue",
  short: "Pascal Anorue",
  handle: "dipapus-gif",
  bio: "AI-Driven Cybersecurity enthusiast, IT/OT, SOC analyst, pentester, ethical hacker, and automation builder",
  github: "https://github.com/dipapus-gif",
  linkedin: "https://www.linkedin.com/in/pascal-anorue",
  avatar: "https://avatars.githubusercontent.com/u/308676852?v=4",
  sentinel: "https://socsentinelpca.netlify.app",
  sentinelHost: "socsentinelpca.netlify.app",
};

export const repo = (name: string) => `${profile.github}/${name}`;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Category = "Platform" | "SIEM" | "Automation" | "Offensive";

export interface Project {
  id: string;
  title: string;
  category: Category;
  summary: string;
  highlights: string[];
  tags: string[];
  href: string;
  linkLabel: string;
  span?: "featured" | "wide";
  badge?: string;
  metrics?: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: "sentinel",
    title: "SOC Sentinel — AI-Powered Security Operations Platform",
    category: "Platform",
    span: "featured",
    badge: "Live",
    summary:
      "A full web platform I designed, built and deployed: vulnerability scanning, IOC tracking, MITRE ATT&CK mapping, incident response, Splunk and Wazuh integrations and an embedded AI co-pilot, all in one command center for SOC analysts, pentesters and bug bounty hunters.",
    highlights: [
      "Nmap-style TCP scanning plus HTTP header, TLS/SSL and DNS (SPF/DMARC) posture checks",
      "One-click escalation from a SIEM alert into a tracked incident with print-ready reports",
      "AI co-pilot that explains alerts, maps behaviour to ATT&CK and drafts SIEM queries",
    ],
    tags: ["Next.js", "Tailwind CSS", "MITRE ATT&CK", "Splunk", "Wazuh", "AI co-pilot", "Netlify"],
    href: profile.sentinel,
    linkLabel: "Open the live site",
    metrics: [
      { value: "14", label: "ATT&CK tactics" },
      { value: "60+", label: "techniques mapped" },
      { value: "20+", label: "ports per scan" },
    ],
  },
  {
    id: "splunk",
    title: "Splunk SIEM Deployment & Attack Simulation",
    category: "SIEM",
    span: "featured",
    summary:
      "End-to-end Splunk Enterprise 10.4.3 deployment that closes zero-visibility gaps across Windows and Linux endpoints. Universal Forwarders ship telemetry over TCP 9997, attacks are simulated, detections are written in SPL and the whole thing ends in a formal incident report.",
    highlights: [
      "Windows 11 manager receiving Security, System and Application logs plus Kali auth.log and syslog",
      "Four attack scenarios mapped to MITRE ATT&CK, each with a production-style SPL detection",
      "Incident report IR-2026-1003-01: forwarded logs preserved evidence after local log wiping",
    ],
    tags: ["Splunk", "SPL", "Universal Forwarder", "Windows Events", "MITRE ATT&CK"],
    href: repo("SIEM-Deployment-Capstone"),
    linkLabel: "View on GitHub",
    metrics: [
      { value: "4", label: "attack scenarios" },
      { value: "4", label: "SPL detection rules" },
      { value: "2", label: "OS platforms" },
    ],
  },
  {
    id: "triage",
    title: "AI Malware Triage Pipeline (n8n)",
    category: "Automation",
    summary:
      "An automated SOC incident-response workflow I built in n8n. A Wazuh alert hits a webhook, the file hash is checked on VirusTotal, a Llama 3.3 70B model on Groq writes the threat report, and the result becomes a Trello ticket, an HTML report and a push notification.",
    highlights: [
      "Tested end to end with simulated Wazuh alerts fired from Kali",
      "Grew from a 5-node alerting flow into a full triage and ticketing pipeline",
    ],
    tags: ["n8n", "Groq · Llama 3.3", "VirusTotal API", "Trello", "ntfy.sh", "Docker"],
    href: repo("ai-malware-triage-pipeline"),
    linkLabel: "View on GitHub",
    metrics: [
      { value: "7", label: "pipeline stages" },
      { value: "5", label: "tools wired together" },
    ],
  },
  {
    id: "wazuh",
    title: "Wazuh SIEM Home Lab",
    category: "SIEM",
    summary:
      "A full Wazuh stack (manager, indexer, dashboard) on Ubuntu with a Kali agent. A Hydra SSH brute-force run turned noisy auth failures into a correctly classified, MITRE-mapped alert.",
    highlights: [
      "Debugged service ordering, package conflicts and bridged networking",
      "Watched low-severity failures escalate into a rule level 10 detection",
    ],
    tags: ["Wazuh", "Kali Linux", "Hydra", "VirtualBox"],
    href: repo("wazuh-siem-homelab"),
    linkLabel: "View on GitHub",
    metrics: [
      { value: "638+", label: "alerts / 24h" },
      { value: "9", label: "level-10 alerts" },
      { value: "5", label: "ATT&CK techniques" },
    ],
  },
  {
    id: "soc-automation",
    title: "SOC Automation Projects",
    category: "Automation",
    summary:
      "n8n running on Kali Linux that ingests SIEM or webhook alerts, queries threat intelligence, classifies risk, hands ambiguous cases to an AI model and logs an incident ticket.",
    highlights: ["Webhook → hash check → risk classification → AI analysis → ticket"],
    tags: ["n8n", "Kali Linux", "Webhooks", "Threat Intel"],
    href: repo("soc-automation-projects"),
    linkLabel: "View on GitHub",
  },
  {
    id: "vajra",
    title: "Cloud Pentest & Enumeration Lab",
    category: "Offensive",
    span: "wide",
    summary:
      "A hands-on lab using the Vajra offensive framework to map cloud assets, audit configuration and evaluate attack surface in an isolated VM, with engagement scoping and rules of engagement documented up front.",
    highlights: [
      "Flask-based Vajra UI deployed locally in a Python virtualenv",
      "External, internal, web-app and cloud asset categorisation",
    ],
    tags: ["Vajra", "Python", "Flask", "Cloud Recon", "IAM Enumeration"],
    href: repo("cloud-pentest-vajra-lab"),
    linkLabel: "View on GitHub",
  },
];

/* ------------------------------------------------------------------ */
/* SOC Sentinel                                                        */
/* ------------------------------------------------------------------ */

export type SentinelIcon = "search" | "bug" | "grid" | "file" | "plug" | "terminal" | "radar" | "sparkles";

export interface SentinelFeature {
  id: string;
  title: string;
  icon: SentinelIcon;
  text: string;
  chips: string[];
}

export const sentinel = {
  name: "SOC Sentinel",
  tagline: "AI-Powered Security Operations Platform",
  shot: sentinelShot,
  pitch:
    "SOC Sentinel combines nmap-style scanning, MITRE ATT&CK mapping, SIEM integrations for Splunk and Wazuh, and an AI co-pilot into a single command center, so analysts can detect, investigate and respond faster.",
  audience: "Built for SOC analysts, pentesters & bug bounty hunters",
  stats: [
    { value: "14", label: "ATT&CK tactics" },
    { value: "60+", label: "techniques mapped" },
    { value: "20+", label: "ports checked per scan" },
    { value: "24/7", label: "AI co-pilot" },
  ],
  stack: ["Next.js", "React", "Tailwind CSS", "MITRE ATT&CK", "Splunk · Wazuh", "Netlify"],
  features: [
    {
      id: "scan",
      title: "Vulnerability & Port Scanning",
      icon: "search",
      text: "Nmap-style TCP connect scanning across 20+ common ports, plus HTTP header, TLS/SSL and DNS (SPF/DMARC) posture checks for any authorized domain or IP.",
      chips: ["TCP connect scan", "20+ common ports", "HTTP headers", "TLS / SSL", "DNS · SPF / DMARC"],
    },
    {
      id: "threat",
      title: "Threat & Malware Detection",
      icon: "bug",
      text: "An indicator tracker for IOCs (IPs, domains, hashes) with severity scoring, confidence ratings and MITRE ATT&CK technique correlation. It ships with a sample-data generator, so you can try it before connecting your own feeds.",
      chips: ["IOC tracker", "IPs · domains · hashes", "Severity scoring", "Confidence ratings", "Sample-data generator"],
    },
    {
      id: "mitre",
      title: "MITRE ATT&CK Mapping",
      icon: "grid",
      text: "The full enterprise tactic and technique matrix. Tag incidents and alerts with ATT&CK IDs and get built-in detection and mitigation guidance for each technique.",
      chips: ["14 tactics", "60+ techniques", "Detection guidance", "Mitigation guidance"],
    },
    {
      id: "ir",
      title: "Incident Response & Reporting",
      icon: "file",
      text: "Create, triage and track incident reports end to end, with severity, timeline notes, MITRE tagging and print-ready report export.",
      chips: ["Severity", "Timeline notes", "MITRE tagging", "Print-ready export"],
    },
    {
      id: "siem",
      title: "SIEM Integrations",
      icon: "plug",
      text: "Connect Splunk, Wazuh, Elastic or Sentinel. Test connectivity, sync alerts and escalate SIEM detections straight into an incident with one click.",
      chips: ["Splunk", "Wazuh", "Elastic", "Sentinel", "Alert sync", "One-click escalation"],
    },
    {
      id: "pentest",
      title: "Pentest & Bug Bounty Workspace",
      icon: "terminal",
      text: "OWASP-aligned testing playbooks for SQL injection, XSS, SSRF, IDOR and broken auth, plus a report template built for responsible disclosure.",
      chips: ["SQL injection", "XSS", "SSRF", "IDOR", "Broken auth", "Disclosure template"],
    },
    {
      id: "radar",
      title: "Global Scan Radar",
      icon: "radar",
      text: "A live, satellite-style radar view that visualizes scan activity and inbound threat origins across your monitored attack surface.",
      chips: ["Satellite-style radar", "Scan activity", "Threat origins"],
    },
    {
      id: "ai",
      title: "AI SOC Co-Pilot",
      icon: "sparkles",
      text: "An embedded AI analyst that explains alerts, maps behaviour to ATT&CK, drafts incident reports and writes SIEM detection queries on demand.",
      chips: ["Explains alerts", "Maps to ATT&CK", "Drafts incident reports", "Writes SIEM queries"],
    },
  ] as SentinelFeature[],
  workflow: [
    {
      n: "01",
      title: "Connect your attack surface",
      text: "Add domains, IPs and SIEM sources (Splunk or Wazuh) that you own or are authorized to monitor.",
    },
    {
      n: "02",
      title: "Scan & detect",
      text: "Run safe, non-destructive vulnerability scans and ingest live alerts from your SIEM stack.",
    },
    {
      n: "03",
      title: "Triage with AI + MITRE ATT&CK",
      text: "The AI maps findings to ATT&CK techniques and recommends remediation and detection logic.",
    },
    {
      n: "04",
      title: "Respond & report",
      text: "Open an incident, collaborate on the timeline and export a clean report for stakeholders.",
    },
  ],
  responsibleUse:
    "Scanning and pentest tooling performs safe, non-destructive checks (port reachability, HTTP security headers, TLS, DNS hygiene) and provides OWASP-aligned methodology for assets you own or engagements where you hold explicit written authorization. It never auto-launches exploits or attacks against third parties.",
};

export const attackTactics = [
  { id: "TA0043", name: "Reconnaissance" },
  { id: "TA0042", name: "Resource Development" },
  { id: "TA0001", name: "Initial Access" },
  { id: "TA0002", name: "Execution" },
  { id: "TA0003", name: "Persistence" },
  { id: "TA0004", name: "Privilege Escalation" },
  { id: "TA0005", name: "Defense Evasion" },
  { id: "TA0006", name: "Credential Access" },
  { id: "TA0007", name: "Discovery" },
  { id: "TA0008", name: "Lateral Movement" },
  { id: "TA0009", name: "Collection" },
  { id: "TA0011", name: "Command & Control" },
  { id: "TA0010", name: "Exfiltration" },
  { id: "TA0040", name: "Impact" },
];

/* ------------------------------------------------------------------ */
/* Detection engineering                                               */
/* ------------------------------------------------------------------ */

export interface Detection {
  id: string;
  label: string;
  platform: string;
  mitre: string;
  technique: string;
  severity: "Medium" | "High";
  telemetry: string;
  simulate: string;
  why: string;
  spl: string;
}

export const detections: Detection[] = [
  {
    id: "ssh",
    label: "SSH brute force",
    platform: "Kali Linux",
    mitre: "T1110.001",
    technique: "Brute Force: Password Guessing",
    severity: "Medium",
    telemetry: "auth.log · “Failed password for root”",
    simulate: "hydra -l root -P pass.txt ssh://127.0.0.1 -t 4",
    why: "Three or more failures from one source inside five minutes is a pattern, not a typo.",
    spl: `index=main sourcetype=linux_auth "Failed password"
| rex "from (?<src_ip>\\d+\\.\\d+\\.\\d+\\.\\d+)"
| bin _time span=5m
| stats count by _time, host, src_ip
| where count >= 3`,
  },
  {
    id: "admin",
    label: "Hidden local admin",
    platform: "Windows 11",
    mitre: "T1136.001",
    technique: "Create Account: Local Account",
    severity: "High",
    telemetry: "Security · EventCode 4720 / 4728 / 4732",
    simulate: `net user "SupportAdmin$" /add\nnet localgroup Administrators "SupportAdmin$" /add`,
    why: "A trailing $ mimics a machine account and slips past a casual glance at the user list.",
    spl: `index=main sourcetype=WinEventLog:Security EventCode=4720
| where like(Account_Name, "%$")

/* any new local admin */
index=main sourcetype=WinEventLog:Security
  (EventCode=4720 OR EventCode=4728 OR EventCode=4732)`,
  },
  {
    id: "clear",
    label: "Audit log cleared",
    platform: "Windows 11",
    mitre: "T1070.001",
    technique: "Indicator Removal: Clear Windows Event Logs",
    severity: "High",
    telemetry: "Security · Event ID 1102",
    simulate: "wevtutil cl Security",
    why: "Attackers wipe local logs to hide their tracks, but anything already forwarded off-host survives.",
    spl: `index=main sourcetype=WinEventLog:Security EventCode=1102`,
  },
  {
    id: "triage",
    label: "Cross-platform triage",
    platform: "Windows + Linux",
    mitre: "T1110 · T1136",
    technique: "One search, two operating systems",
    severity: "Medium",
    telemetry: "Windows Security + Linux auth.log",
    simulate: "Run after any of the scenarios above",
    why: "A single search-bar query that surfaces account creation and brute-force attempts together.",
    spl: `index=* (EventCode=4720 OR EventCode=4728 OR "Failed password")`,
  },
];

/* ------------------------------------------------------------------ */
/* AI n8n malware triage pipeline                                      */
/* ------------------------------------------------------------------ */

export interface PipelineStep {
  id: string;
  name: string;
  tool: string;
  detail: string;
}

export const pipeline: PipelineStep[] = [
  {
    id: "wazuh",
    name: "Detect",
    tool: "Wazuh webhook",
    detail:
      "An endpoint agent flags a suspicious file and POSTs the alert (agent, file path, file hash) to an n8n webhook running in Docker. The pipeline starts the moment the alert lands.",
  },
  {
    id: "vt",
    name: "Enrich",
    tool: "VirusTotal v3",
    detail:
      "The hash is looked up on VirusTotal, so the verdict starts from real threat intelligence instead of a guess. A second entry point, the AI Malware Hash Investigator, feeds the same chain for on-demand checks.",
  },
  {
    id: "score",
    name: "Score",
    tool: "Reputation Analyzer",
    detail:
      "A code step reads the VirusTotal response and works out the reputation and detection count, giving the rest of the workflow a clean, structured verdict to act on.",
  },
  {
    id: "route",
    name: "Classify",
    tool: "Risk switch",
    detail:
      "A Switch node classifies the risk level and routes the alert down the matching branch, so low-signal alerts and high-risk ones are not handled the same way.",
  },
  {
    id: "ai",
    name: "Analyse",
    tool: "Groq · Llama 3.3 70B",
    detail:
      "A language model reads the alert and the VirusTotal result and writes an AI malware threat report in plain language, ready for an analyst to review.",
  },
  {
    id: "ticket",
    name: "Document",
    tool: "Trello + HTML report",
    detail:
      "An incident report builder assembles the findings, a Trello card is created on the SOC Incident Tickets board, and an HTML malware report is generated. Every alert gets an owner and a paper trail.",
  },
  {
    id: "ntfy",
    name: "Notify",
    tool: "ntfy.sh",
    detail:
      "A HIGH RISK MALWARE ALERT push notification is sent through ntfy.sh, so the analyst finds out on their phone without watching a dashboard.",
  },
];

export interface Evidence {
  id: string;
  tab: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
}

export const evidence: Evidence[] = [
  {
    id: "workflow",
    tab: "Workflow",
    src: workflowShot,
    title: "The expanded workflow in n8n",
    caption:
      "Webhook → VirusTotal → reputation analyzer → risk switch → Groq-powered AI threat report → incident report builder → Trello ticket, HTML report and ntfy alert, all on one canvas.",
    alt: "n8n canvas showing the AI Malware Triage Pipeline Expanded workflow with webhook, VirusTotal, risk classification, AI threat report, Trello ticket and ntfy alert nodes",
  },
  {
    id: "terminal",
    tab: "Test alert",
    src: terminalShot,
    title: "Firing a simulated Wazuh alert",
    caption:
      "n8n runs in Docker on my Kali VM. A curl POST of a WannaCry-named test payload goes to the webhook, and n8n replies “Workflow was started”.",
    alt: "Kali terminal showing docker commands and a curl POST of a simulated Wazuh malware alert to the n8n webhook",
  },
  {
    id: "executions",
    tab: "Execution history",
    src: executionsShot,
    title: "Debugging in the open",
    caption:
      "The executions list tells the real story: failed runs while wiring up the AI and ticketing nodes, then a green run of the full pipeline in about 11 seconds.",
    alt: "n8n executions list showing several failed runs followed by a successful execution of the expanded workflow",
  },
  {
    id: "trello",
    tab: "Trello ticket",
    src: trelloShot,
    title: "Incident ticket, created automatically",
    caption: "The SOC Incident Tickets board with a “Malware Incident” card generated by the workflow.",
    alt: "Trello board named SOC Incident Tickets with a malware incident card created by the n8n workflow",
  },
  {
    id: "ntfy",
    tab: "Push alert",
    src: ntfyShot,
    title: "Alert on my phone",
    caption:
      "HIGH RISK MALWARE ALERT notifications delivered through ntfy.sh. These are test payloads, so the hash reads “Unknown”. Topic name blurred.",
    alt: "ntfy.sh inbox showing HIGH RISK MALWARE ALERT push notifications from the pipeline",
  },
];

/* ------------------------------------------------------------------ */
/* Skills & focus                                                      */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    title: "SIEM & Detection",
    icon: "layers",
    items: ["Splunk Enterprise", "SPL", "Wazuh", "MITRE ATT&CK", "Detection rules", "Incident reporting"],
  },
  {
    title: "Offensive Security",
    icon: "terminal",
    items: ["Kali Linux", "Hydra", "Vajra", "Cloud enumeration", "Recon & scoping", "Rules of engagement"],
  },
  {
    title: "Automation & AI",
    icon: "bolt",
    items: ["n8n", "Groq / LLMs", "AI co-pilot design", "VirusTotal API", "Trello API", "Webhooks", "Docker"],
  },
  {
    title: "Systems, Telemetry & Web",
    icon: "shield",
    items: [
      "Windows Event Logs",
      "Linux auth.log / syslog",
      "VirtualBox / VMware",
      "Python · Flask",
      "Next.js · Tailwind · Netlify",
      "Bash",
    ],
  },
] as const;

export const focusAreas = [
  {
    icon: "shield",
    title: "SOC & Detection",
    text: "Deploying SIEMs, tuning noise into signal and writing detections that map back to ATT&CK.",
  },
  {
    icon: "terminal",
    title: "Offensive Security",
    text: "Pentesting and ethical hacking in isolated labs to learn exactly what attacks look like in the logs.",
  },
  {
    icon: "bolt",
    title: "Automation & AI",
    text: "Using n8n and LLMs to take the repetitive work out of alert triage and incident response.",
  },
  {
    icon: "factory",
    title: "IT / OT",
    text: "Interested in securing both the corporate network and the operational technology that runs on it.",
  },
] as const;
