import { Answer, Risk, Question, AuditCase, Domain, RiskSeverity } from '@/types'
import { QUESTIONS, getCurrentCase } from './mockData'

export const saveAnswer = (caseId: string, questionId: string, answer: Answer): void => {
  const auditCase = getCurrentCase()
  if (!auditCase) return

  auditCase.answers[questionId] = answer
  
  // Check if answer triggers a risk
  const question = QUESTIONS.find(q => q.id === questionId)
  if (question) {
    question.options?.forEach(option => {
      if (answer.selectedOptionIds.includes(option.id) && option.triggersRisk) {
        createRisk(caseId, question.domainId, questionId, option.riskSeverity!, question.text)
      }
    })
  }
  
  // Recalculate scores
  recalculateScores(auditCase)
}

const createRisk = (
  caseId: string,
  domainId: number,
  questionId: string,
  severity: RiskSeverity,
  description: string
): void => {
  const auditCase = getCurrentCase()
  if (!auditCase) return

  // Check if risk already exists for this question
  const existingRisk = auditCase.risks.find(r => r.questionId === questionId)
  if (existingRisk) {
    existingRisk.severity = severity
    existingRisk.updatedAt = new Date()
    return
  }

  const newRisk: Risk = {
    id: `RISK-${Date.now()}-${questionId}`,
    domainId,
    questionId,
    severity,
    status: 'Open',
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  auditCase.risks.push(newRisk)
}

const recalculateScores = (auditCase: AuditCase): void => {
  let totalScore = 0
  
  auditCase.domains.forEach(domain => {
    const domainQuestions = QUESTIONS.filter(q => q.domainId === domain.id)
    let domainScore = 0
    let completedCount = 0
    
    domainQuestions.forEach(question => {
      const answer = auditCase.answers[question.id]
      if (answer) {
        domainScore += answer.score
        completedCount++
      }
    })
    
    domain.score = domainScore
    domain.completedQuestions = completedCount
    domain.totalQuestions = domainQuestions.length
    domain.maxScore = domainQuestions.reduce((sum, q) => sum + q.maxScore, 0)
    
    if (completedCount === 0) {
      domain.status = 'Not Started'
    } else if (completedCount === domainQuestions.length) {
      domain.status = 'Completed'
    } else {
      domain.status = 'In Progress'
    }
    
    totalScore += domainScore
  })
  
  auditCase.overallScore = totalScore
  
  // Update audit status
  const totalQuestions = QUESTIONS.length
  const answeredQuestions = Object.keys(auditCase.answers).length
  
  if (answeredQuestions === 0) {
    auditCase.status = 'Open'
  } else if (answeredQuestions === totalQuestions) {
    auditCase.status = 'Completed'
  } else {
    auditCase.status = 'In Progress'
  }
  
  auditCase.updatedAt = new Date()
}

export const getComplianceDistribution = (caseId: string, domainId?: number) => {
  const auditCase = getCurrentCase()
  if (!auditCase) return { compliant: 0, partial: 0, nonCompliant: 0, notAssessed: 0 }

  const questions = domainId 
    ? QUESTIONS.filter(q => q.domainId === domainId)
    : QUESTIONS

  let compliant = 0
  let partial = 0
  let nonCompliant = 0
  let notAssessed = 0

  questions.forEach(question => {
    const answer = auditCase.answers[question.id]
    if (!answer) {
      notAssessed++
      return
    }

    const percentage = (answer.score / question.maxScore) * 100
    if (percentage >= 80) {
      compliant++
    } else if (percentage >= 40) {
      partial++
    } else {
      nonCompliant++
    }
  })

  return { compliant, partial, nonCompliant, notAssessed }
}

export const getRisksBySeverity = (caseId: string, domainId?: number) => {
  const auditCase = getCurrentCase()
  if (!auditCase) return { low: 0, medium: 0, high: 0, critical: 0 }

  const risks = domainId
    ? auditCase.risks.filter(r => r.domainId === domainId && r.status === 'Open')
    : auditCase.risks.filter(r => r.status === 'Open')

  return {
    low: risks.filter(r => r.severity === 'Low').length,
    medium: risks.filter(r => r.severity === 'Medium').length,
    high: risks.filter(r => r.severity === 'High').length,
    critical: risks.filter(r => r.severity === 'Critical').length,
  }
}

export const updateRiskStatus = (riskId: string, status: 'Open' | 'In Progress' | 'Closed', notes?: string) => {
  const auditCase = getCurrentCase()
  if (!auditCase) return

  const risk = auditCase.risks.find(r => r.id === riskId)
  if (risk) {
    risk.status = status
    risk.updatedAt = new Date()
    if (notes) risk.notes = notes
  }
}
