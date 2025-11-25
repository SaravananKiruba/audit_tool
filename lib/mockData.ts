import { Question, Domain, AuditCase, AuditType } from '@/types';

// 11 Domains
export const DOMAINS: Domain[] = [
  { id: 1, name: 'Policy and Standards', description: 'Security policies, standards, and governance framework', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 8 },
  { id: 2, name: 'Awareness Training', description: 'Security awareness and training programs', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 6 },
  { id: 3, name: 'Network Security', description: 'Network infrastructure and security controls', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 10 },
  { id: 4, name: 'Business Continuity', description: 'Business continuity and disaster recovery planning', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 7 },
  { id: 5, name: 'Asset Management', description: 'Asset inventory and lifecycle management', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 6 },
  { id: 6, name: 'Incident Management', description: 'Incident detection, response, and management', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 8 },
  { id: 7, name: 'Access Control', description: 'Identity and access management controls', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 9 },
  { id: 8, name: 'Vendor Management', description: 'Third-party and vendor risk management', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 5 },
  { id: 9, name: 'Physical Security', description: 'Physical access and environmental controls', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 6 },
  { id: 10, name: 'Security Configuration', description: 'System hardening and configuration management', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 7 },
  { id: 11, name: 'Email Security', description: 'Email security controls and anti-phishing measures', status: 'Not Started', score: 0, maxScore: 100, completedQuestions: 0, totalQuestions: 5 },
];

// Sample questions for each domain
export const QUESTIONS: Question[] = [
  // Domain 1: Policy and Standards
  { id: 'q1-1', domainId: 1, text: 'Does the organization have a documented Information Security Policy?', type: 'single-select', category: 'Policy Creation', weight: 1, maxScore: 10, options: [
    { id: 'q1-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-1-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q1-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q1-2', domainId: 1, text: 'Is the Information Security Policy reviewed and approved by senior management?', type: 'single-select', category: 'Policy Approval', weight: 1, maxScore: 10, options: [
    { id: 'q1-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q1-3', domainId: 1, text: 'How frequently are security policies reviewed and updated?', type: 'single-select', category: 'Policy Review', weight: 1, maxScore: 10, options: [
    { id: 'q1-3-annual', label: 'Annually', value: 'annual', score: 10 },
    { id: 'q1-3-biannual', label: 'Every 2 years', value: 'biannual', score: 7 },
    { id: 'q1-3-rare', label: 'Rarely or never', value: 'rare', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q1-4', domainId: 1, text: 'Are security policies easily accessible to all employees?', type: 'single-select', category: 'Policy Distribution', weight: 1, maxScore: 10, options: [
    { id: 'q1-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-4-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q1-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},
  { id: 'q1-5', domainId: 1, text: 'Does the organization have an Acceptable Use Policy (AUP)?', type: 'single-select', category: 'Specific Policies', weight: 1, maxScore: 10, options: [
    { id: 'q1-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q1-6', domainId: 1, text: 'Is there a Data Classification Policy in place?', type: 'single-select', category: 'Specific Policies', weight: 1, maxScore: 10, options: [
    { id: 'q1-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-6-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q1-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q1-7', domainId: 1, text: 'Are roles and responsibilities for information security clearly defined?', type: 'single-select', category: 'Governance', weight: 1, maxScore: 10, options: [
    { id: 'q1-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-7-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q1-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q1-8', domainId: 1, text: 'Is there a process for exception handling and policy waivers?', type: 'single-select', category: 'Policy Enforcement', weight: 1, maxScore: 10, options: [
    { id: 'q1-8-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q1-8-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},

  // Domain 2: Awareness Training
  { id: 'q2-1', domainId: 2, text: 'Does the organization conduct regular security awareness training?', type: 'single-select', category: 'Training Program', weight: 1, maxScore: 10, options: [
    { id: 'q2-1-yes', label: 'Yes, regularly', value: 'yes', score: 10 },
    { id: 'q2-1-occasional', label: 'Occasionally', value: 'occasional', score: 5 },
    { id: 'q2-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q2-2', domainId: 2, text: 'Is security awareness training mandatory for all employees?', type: 'single-select', category: 'Training Coverage', weight: 1, maxScore: 10, options: [
    { id: 'q2-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q2-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q2-3', domainId: 2, text: 'Are new employees required to complete security training during onboarding?', type: 'single-select', category: 'Onboarding', weight: 1, maxScore: 10, options: [
    { id: 'q2-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q2-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q2-4', domainId: 2, text: 'Does the training include phishing awareness and simulation exercises?', type: 'single-select', category: 'Training Content', weight: 1, maxScore: 10, options: [
    { id: 'q2-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q2-4-partial', label: 'Awareness only', value: 'partial', score: 5 },
    { id: 'q2-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q2-5', domainId: 2, text: 'Is training completion tracked and documented?', type: 'single-select', category: 'Training Administration', weight: 1, maxScore: 10, options: [
    { id: 'q2-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q2-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},
  { id: 'q2-6', domainId: 2, text: 'Is specialized security training provided for IT staff and privileged users?', type: 'single-select', category: 'Specialized Training', weight: 1, maxScore: 10, options: [
    { id: 'q2-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q2-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},

  // Domain 3: Network Security
  { id: 'q3-1', domainId: 3, text: 'Is a firewall deployed at the network perimeter?', type: 'single-select', category: 'Perimeter Security', weight: 1, maxScore: 10, options: [
    { id: 'q3-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q3-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q3-2', domainId: 3, text: 'Are firewall rules reviewed and updated regularly?', type: 'single-select', category: 'Firewall Management', weight: 1, maxScore: 10, options: [
    { id: 'q3-2-yes', label: 'Yes, regularly', value: 'yes', score: 10 },
    { id: 'q3-2-occasional', label: 'Occasionally', value: 'occasional', score: 5 },
    { id: 'q3-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q3-3', domainId: 3, text: 'Is network segmentation implemented to separate critical systems?', type: 'single-select', category: 'Network Architecture', weight: 1, maxScore: 10, options: [
    { id: 'q3-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q3-3-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q3-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q3-4', domainId: 3, text: 'Is an Intrusion Detection/Prevention System (IDS/IPS) deployed?', type: 'single-select', category: 'Threat Detection', weight: 1, maxScore: 10, options: [
    { id: 'q3-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q3-4-partial', label: 'IDS only', value: 'partial', score: 7 },
    { id: 'q3-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q3-5', domainId: 3, text: 'Are wireless networks secured with strong encryption (WPA3/WPA2)?', type: 'single-select', category: 'Wireless Security', weight: 1, maxScore: 10, options: [
    { id: 'q3-5-wpa3', label: 'WPA3', value: 'wpa3', score: 10 },
    { id: 'q3-5-wpa2', label: 'WPA2', value: 'wpa2', score: 8 },
    { id: 'q3-5-weak', label: 'WEP or no encryption', value: 'weak', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q3-6', domainId: 3, text: 'Is remote access secured with VPN and multi-factor authentication?', type: 'single-select', category: 'Remote Access', weight: 1, maxScore: 10, options: [
    { id: 'q3-6-yes', label: 'Yes, both VPN and MFA', value: 'yes', score: 10 },
    { id: 'q3-6-partial', label: 'VPN only', value: 'partial', score: 5 },
    { id: 'q3-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q3-7', domainId: 3, text: 'Are network devices (routers, switches) hardened and regularly patched?', type: 'single-select', category: 'Device Management', weight: 1, maxScore: 10, options: [
    { id: 'q3-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q3-7-partial', label: 'Partially', value: 'partial', score: 5 },
    { id: 'q3-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q3-8', domainId: 3, text: 'Is network traffic monitored and logged?', type: 'single-select', category: 'Monitoring', weight: 1, maxScore: 10, options: [
    { id: 'q3-8-yes', label: 'Yes, continuously', value: 'yes', score: 10 },
    { id: 'q3-8-partial', label: 'Partially', value: 'partial', score: 5 },
    { id: 'q3-8-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q3-9', domainId: 3, text: 'Are security logs reviewed regularly for anomalies?', type: 'single-select', category: 'Log Management', weight: 1, maxScore: 10, options: [
    { id: 'q3-9-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q3-9-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q3-10', domainId: 3, text: 'Is there a process for vulnerability scanning and penetration testing?', type: 'single-select', category: 'Vulnerability Management', weight: 1, maxScore: 10, options: [
    { id: 'q3-10-yes', label: 'Yes, regularly', value: 'yes', score: 10 },
    { id: 'q3-10-occasional', label: 'Occasionally', value: 'occasional', score: 5 },
    { id: 'q3-10-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},

  // Domain 4: Business Continuity
  { id: 'q4-1', domainId: 4, text: 'Does the organization have a documented Business Continuity Plan (BCP)?', type: 'single-select', category: 'BCP Documentation', weight: 1, maxScore: 10, options: [
    { id: 'q4-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q4-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q4-2', domainId: 4, text: 'Is there a Disaster Recovery Plan (DRP) for IT systems?', type: 'single-select', category: 'DRP Documentation', weight: 1, maxScore: 10, options: [
    { id: 'q4-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q4-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q4-3', domainId: 4, text: 'Are BCP/DRP plans tested regularly?', type: 'single-select', category: 'Testing', weight: 1, maxScore: 10, options: [
    { id: 'q4-3-annual', label: 'Annually or more', value: 'annual', score: 10 },
    { id: 'q4-3-occasional', label: 'Occasionally', value: 'occasional', score: 5 },
    { id: 'q4-3-no', label: 'Never tested', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q4-4', domainId: 4, text: 'Are critical business functions identified with Recovery Time Objectives (RTO)?', type: 'single-select', category: 'Impact Analysis', weight: 1, maxScore: 10, options: [
    { id: 'q4-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q4-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q4-5', domainId: 4, text: 'Are regular backups performed for critical systems and data?', type: 'single-select', category: 'Backup Strategy', weight: 1, maxScore: 10, options: [
    { id: 'q4-5-yes', label: 'Yes, daily or more', value: 'yes', score: 10 },
    { id: 'q4-5-weekly', label: 'Weekly', value: 'weekly', score: 7 },
    { id: 'q4-5-no', label: 'Rarely or never', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q4-6', domainId: 4, text: 'Are backup restoration procedures tested?', type: 'single-select', category: 'Backup Testing', weight: 1, maxScore: 10, options: [
    { id: 'q4-6-yes', label: 'Yes, regularly', value: 'yes', score: 10 },
    { id: 'q4-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q4-7', domainId: 4, text: 'Are backups stored offsite or in the cloud?', type: 'single-select', category: 'Backup Storage', weight: 1, maxScore: 10, options: [
    { id: 'q4-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q4-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},

  // Domain 5: Asset Management
  { id: 'q5-1', domainId: 5, text: 'Does the organization maintain an inventory of all IT assets?', type: 'single-select', category: 'Asset Inventory', weight: 1, maxScore: 10, options: [
    { id: 'q5-1-yes', label: 'Yes, complete', value: 'yes', score: 10 },
    { id: 'q5-1-partial', label: 'Partial', value: 'partial', score: 5 },
    { id: 'q5-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q5-2', domainId: 5, text: 'Is the asset inventory updated regularly?', type: 'single-select', category: 'Inventory Maintenance', weight: 1, maxScore: 10, options: [
    { id: 'q5-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q5-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q5-3', domainId: 5, text: 'Are assets classified based on criticality and data sensitivity?', type: 'single-select', category: 'Asset Classification', weight: 1, maxScore: 10, options: [
    { id: 'q5-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q5-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q5-4', domainId: 5, text: 'Is there a process for asset disposal and decommissioning?', type: 'single-select', category: 'Asset Lifecycle', weight: 1, maxScore: 10, options: [
    { id: 'q5-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q5-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q5-5', domainId: 5, text: 'Are software licenses tracked and managed?', type: 'single-select', category: 'Software Management', weight: 1, maxScore: 10, options: [
    { id: 'q5-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q5-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},
  { id: 'q5-6', domainId: 5, text: 'Is there a mobile device management (MDM) solution in place?', type: 'single-select', category: 'Mobile Devices', weight: 1, maxScore: 10, options: [
    { id: 'q5-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q5-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},

  // Domain 6: Incident Management
  { id: 'q6-1', domainId: 6, text: 'Does the organization have an Incident Response Plan (IRP)?', type: 'single-select', category: 'IRP Documentation', weight: 1, maxScore: 10, options: [
    { id: 'q6-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q6-2', domainId: 6, text: 'Is there a designated incident response team?', type: 'single-select', category: 'IR Team', weight: 1, maxScore: 10, options: [
    { id: 'q6-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q6-3', domainId: 6, text: 'Are security incidents logged and tracked?', type: 'single-select', category: 'Incident Tracking', weight: 1, maxScore: 10, options: [
    { id: 'q6-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q6-4', domainId: 6, text: 'Is there a process for reporting security incidents?', type: 'single-select', category: 'Incident Reporting', weight: 1, maxScore: 10, options: [
    { id: 'q6-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q6-5', domainId: 6, text: 'Are incident response procedures tested regularly?', type: 'single-select', category: 'IR Testing', weight: 1, maxScore: 10, options: [
    { id: 'q6-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q6-6', domainId: 6, text: 'Is forensic data collection capability available?', type: 'single-select', category: 'Forensics', weight: 1, maxScore: 10, options: [
    { id: 'q6-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q6-7', domainId: 6, text: 'Are post-incident reviews conducted?', type: 'single-select', category: 'Lessons Learned', weight: 1, maxScore: 10, options: [
    { id: 'q6-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},
  { id: 'q6-8', domainId: 6, text: 'Is there integration with law enforcement and external incident response resources?', type: 'single-select', category: 'External Relations', weight: 1, maxScore: 10, options: [
    { id: 'q6-8-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q6-8-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},

  // Domain 7: Access Control
  { id: 'q7-1', domainId: 7, text: 'Is multi-factor authentication (MFA) implemented for all users?', type: 'single-select', category: 'Authentication', weight: 1, maxScore: 10, options: [
    { id: 'q7-1-all', label: 'Yes, for all users', value: 'all', score: 10 },
    { id: 'q7-1-privileged', label: 'Only for privileged accounts', value: 'privileged', score: 7 },
    { id: 'q7-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q7-2', domainId: 7, text: 'Are strong password policies enforced?', type: 'single-select', category: 'Password Policy', weight: 1, maxScore: 10, options: [
    { id: 'q7-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q7-3', domainId: 7, text: 'Is role-based access control (RBAC) implemented?', type: 'single-select', category: 'Access Model', weight: 1, maxScore: 10, options: [
    { id: 'q7-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q7-4', domainId: 7, text: 'Are user access rights reviewed regularly?', type: 'single-select', category: 'Access Review', weight: 1, maxScore: 10, options: [
    { id: 'q7-4-quarterly', label: 'Quarterly or more', value: 'quarterly', score: 10 },
    { id: 'q7-4-annual', label: 'Annually', value: 'annual', score: 7 },
    { id: 'q7-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q7-5', domainId: 7, text: 'Is the principle of least privilege enforced?', type: 'single-select', category: 'Least Privilege', weight: 1, maxScore: 10, options: [
    { id: 'q7-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q7-6', domainId: 7, text: 'Are privileged accounts monitored and logged?', type: 'single-select', category: 'Privileged Access', weight: 1, maxScore: 10, options: [
    { id: 'q7-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q7-7', domainId: 7, text: 'Is there a formal user access provisioning and deprovisioning process?', type: 'single-select', category: 'User Lifecycle', weight: 1, maxScore: 10, options: [
    { id: 'q7-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q7-8', domainId: 7, text: 'Are accounts for terminated employees disabled immediately?', type: 'single-select', category: 'Termination', weight: 1, maxScore: 10, options: [
    { id: 'q7-8-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-8-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q7-9', domainId: 7, text: 'Is Single Sign-On (SSO) implemented where applicable?', type: 'single-select', category: 'Authentication Technology', weight: 1, maxScore: 10, options: [
    { id: 'q7-9-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q7-9-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},

  // Domain 8: Vendor Management
  { id: 'q8-1', domainId: 8, text: 'Is there a vendor risk assessment process?', type: 'single-select', category: 'Risk Assessment', weight: 1, maxScore: 10, options: [
    { id: 'q8-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q8-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q8-2', domainId: 8, text: 'Are security requirements included in vendor contracts?', type: 'single-select', category: 'Contractual Security', weight: 1, maxScore: 10, options: [
    { id: 'q8-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q8-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q8-3', domainId: 8, text: 'Are vendors required to demonstrate compliance with security standards?', type: 'single-select', category: 'Compliance Requirements', weight: 1, maxScore: 10, options: [
    { id: 'q8-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q8-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q8-4', domainId: 8, text: 'Is vendor access to systems monitored and logged?', type: 'single-select', category: 'Access Monitoring', weight: 1, maxScore: 10, options: [
    { id: 'q8-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q8-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q8-5', domainId: 8, text: 'Are vendors reviewed periodically for ongoing compliance?', type: 'single-select', category: 'Ongoing Monitoring', weight: 1, maxScore: 10, options: [
    { id: 'q8-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q8-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},

  // Domain 9: Physical Security
  { id: 'q9-1', domainId: 9, text: 'Are data centers and server rooms access-controlled?', type: 'single-select', category: 'Physical Access', weight: 1, maxScore: 10, options: [
    { id: 'q9-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q9-2', domainId: 9, text: 'Are physical access logs maintained and reviewed?', type: 'single-select', category: 'Access Logging', weight: 1, maxScore: 10, options: [
    { id: 'q9-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q9-3', domainId: 9, text: 'Are surveillance cameras deployed in critical areas?', type: 'single-select', category: 'Surveillance', weight: 1, maxScore: 10, options: [
    { id: 'q9-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q9-4', domainId: 9, text: 'Are environmental controls (fire suppression, cooling) in place?', type: 'single-select', category: 'Environmental', weight: 1, maxScore: 10, options: [
    { id: 'q9-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q9-5', domainId: 9, text: 'Is there a visitor management system?', type: 'single-select', category: 'Visitor Management', weight: 1, maxScore: 10, options: [
    { id: 'q9-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},
  { id: 'q9-6', domainId: 9, text: 'Are workstations secured with cable locks or other physical controls?', type: 'single-select', category: 'Workstation Security', weight: 1, maxScore: 10, options: [
    { id: 'q9-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q9-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Low' }
  ]},

  // Domain 10: Security Configuration
  { id: 'q10-1', domainId: 10, text: 'Are security baselines defined for systems and applications?', type: 'single-select', category: 'Baseline Management', weight: 1, maxScore: 10, options: [
    { id: 'q10-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q10-2', domainId: 10, text: 'Is patch management implemented and tracked?', type: 'single-select', category: 'Patch Management', weight: 1, maxScore: 10, options: [
    { id: 'q10-2-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-2-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q10-3', domainId: 10, text: 'Are systems hardened according to industry standards (e.g., CIS Benchmarks)?', type: 'single-select', category: 'System Hardening', weight: 1, maxScore: 10, options: [
    { id: 'q10-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q10-4', domainId: 10, text: 'Are unnecessary services and ports disabled?', type: 'single-select', category: 'Service Minimization', weight: 1, maxScore: 10, options: [
    { id: 'q10-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q10-5', domainId: 10, text: 'Is antivirus/anti-malware software deployed and updated?', type: 'single-select', category: 'Malware Protection', weight: 1, maxScore: 10, options: [
    { id: 'q10-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Critical' }
  ]},
  { id: 'q10-6', domainId: 10, text: 'Are configuration changes tracked and audited?', type: 'single-select', category: 'Change Management', weight: 1, maxScore: 10, options: [
    { id: 'q10-6-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-6-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q10-7', domainId: 10, text: 'Is endpoint detection and response (EDR) deployed?', type: 'single-select', category: 'Endpoint Security', weight: 1, maxScore: 10, options: [
    { id: 'q10-7-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q10-7-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},

  // Domain 11: Email Security
  { id: 'q11-1', domainId: 11, text: 'Is email filtering for spam and malware in place?', type: 'single-select', category: 'Email Filtering', weight: 1, maxScore: 10, options: [
    { id: 'q11-1-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q11-1-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q11-2', domainId: 11, text: 'Are SPF, DKIM, and DMARC configured for email authentication?', type: 'single-select', category: 'Email Authentication', weight: 1, maxScore: 10, options: [
    { id: 'q11-2-all', label: 'All three configured', value: 'all', score: 10 },
    { id: 'q11-2-partial', label: 'Some configured', value: 'partial', score: 5 },
    { id: 'q11-2-no', label: 'None configured', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q11-3', domainId: 11, text: 'Is email encryption available for sensitive communications?', type: 'single-select', category: 'Email Encryption', weight: 1, maxScore: 10, options: [
    { id: 'q11-3-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q11-3-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
  { id: 'q11-4', domainId: 11, text: 'Are users trained to identify phishing emails?', type: 'single-select', category: 'Phishing Awareness', weight: 1, maxScore: 10, options: [
    { id: 'q11-4-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q11-4-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'High' }
  ]},
  { id: 'q11-5', domainId: 11, text: 'Is there a process for reporting suspicious emails?', type: 'single-select', category: 'Incident Reporting', weight: 1, maxScore: 10, options: [
    { id: 'q11-5-yes', label: 'Yes', value: 'yes', score: 10 },
    { id: 'q11-5-no', label: 'No', value: 'no', score: 0, triggersRisk: true, riskSeverity: 'Medium' }
  ]},
];

export const AUDIT_TYPES: AuditType[] = [
  'Security Audit (General)',
  'Information Security Management System (ISMS)',
  'PCI-DSS',
  'Project-Based',
  'Small and Mid-size Businesses (SMBs)',
  'Hospital / Healthcare'
];

// Mock data store
let auditCases: AuditCase[] = [];
let currentCaseId: string | null = null;

export const createAuditCase = (clientInfo: any, metadata: any): AuditCase => {
  const newCase: AuditCase = {
    id: `AUDIT-${Date.now()}`,
    clientInfo,
    metadata: {
      ...metadata,
      commencementDate: new Date()
    },
    status: 'Open',
    domains: DOMAINS.map(d => ({ ...d })),
    answers: {},
    risks: [],
    overallScore: 0,
    maxScore: 1100, // 11 domains * 100 points each
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  auditCases.push(newCase);
  currentCaseId = newCase.id;
  return newCase;
};

export const getCurrentCase = (): AuditCase | null => {
  if (!currentCaseId) return null;
  return auditCases.find(c => c.id === currentCaseId) || null;
};

export const getAllCases = (): AuditCase[] => {
  return auditCases;
};

export const setCurrentCase = (caseId: string) => {
  currentCaseId = caseId;
};

export const getQuestionsByDomain = (domainId: number): Question[] => {
  return QUESTIONS.filter(q => q.domainId === domainId);
};
