// Core types for the Audit Tool

export type AuditStatus = 'Not Started' | 'Open' | 'In Progress' | 'Completed';
export type QuestionStatus = 'Not Started' | 'In Progress' | 'Completed';
export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskStatus = 'Open' | 'In Progress' | 'Closed';
export type ComplianceStatus = 'Compliant' | 'Partial' | 'Non-Compliant' | 'Not Assessed';

export type AuditType = 
  | 'Security Audit (General)'
  | 'Information Security Management System (ISMS)'
  | 'PCI-DSS'
  | 'Project-Based'
  | 'Small and Mid-size Businesses (SMBs)'
  | 'Hospital / Healthcare';

export interface ClientInfo {
  companyName: string;
  industry: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  contactName: string;
}

export interface AuditorInfo {
  name: string;
  email: string;
}

export interface AuditMetadata {
  auditType: AuditType;
  auditor: AuditorInfo;
  commencementDate: Date;
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  score: number;
  triggersRisk?: boolean;
  riskSeverity?: RiskSeverity;
}

export type QuestionType = 'single-select' | 'multiple-choice' | 'rating' | 'free-text';

export interface Question {
  id: string;
  domainId: number;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  category?: string;
  weight: number;
  maxScore: number;
}

export interface Answer {
  questionId: string;
  selectedOptionIds: string[];
  freeText?: string;
  comment?: string;
  evidence?: string;
  score: number;
  timestamp: Date;
}

export interface Risk {
  id: string;
  domainId: number;
  questionId: string;
  severity: RiskSeverity;
  status: RiskStatus;
  description: string;
  recommendation?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Domain {
  id: number;
  name: string;
  description: string;
  status: QuestionStatus;
  score: number;
  maxScore: number;
  completedQuestions: number;
  totalQuestions: number;
}

export interface AuditCase {
  id: string;
  clientInfo: ClientInfo;
  metadata: AuditMetadata;
  status: AuditStatus;
  domains: Domain[];
  answers: Record<string, Answer>;
  risks: Risk[];
  overallScore: number;
  maxScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScanHost {
  ip: string;
  hostname?: string;
  os?: string;
  openPorts: PortInfo[];
  vulnerabilities: Vulnerability[];
}

export interface PortInfo {
  port: number;
  protocol: 'TCP' | 'UDP';
  service: string;
  version?: string;
}

export interface Vulnerability {
  id: string;
  cve?: string;
  severity: RiskSeverity;
  description: string;
  port?: number;
  service?: string;
  recommendation?: string;
}

export interface NetworkScan {
  id: string;
  auditCaseId: string;
  scope: string;
  status: 'Not Started' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  progress: number;
  currentPhase?: string;
  hosts: ScanHost[];
  startTime?: Date;
  endTime?: Date;
  initiatedBy: string;
}

export interface BenchmarkFramework {
  id: string;
  name: string;
  fullName: string;
  score: number;
  maxScore: number;
  coveragePercentage: number;
  strongAreas: string[];
  weakAreas: string[];
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}
