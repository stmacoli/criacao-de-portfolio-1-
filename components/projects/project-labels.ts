import type {
  LearningCategory,
  ProjectClassification,
  ProjectLifecycleStatus,
  PublicationStatus,
  ResultValidationStatus,
  SolutionStatus,
  TechnicalDecisionStatus,
  TechnologyAdoptionStatus,
} from '@/lib/projects'

export const classificationLabels: Record<ProjectClassification, string> = {
  professional: 'Profissional',
  personal: 'Pessoal',
  experimental: 'Experimental',
}

export const lifecycleLabels: Record<ProjectLifecycleStatus, string> = {
  planned: 'Planejado',
  'in-development': 'Em desenvolvimento',
  'in-production': 'Em produção',
  'in-maintenance': 'Em manutenção',
  completed: 'Concluído',
  paused: 'Pausado',
  conceptual: 'Conceitual',
}

export const publicationLabels: Record<PublicationStatus, string> = {
  production: 'Em produção',
  demo: 'Demonstração disponível',
  restricted: 'Acesso restrito',
  unpublished: 'Não publicado',
}

export const solutionStatusLabels: Record<SolutionStatus, string> = {
  proposed: 'Proposta',
  'in-implementation': 'Em implementação',
  implemented: 'Implementada',
  validated: 'Validada',
  discarded: 'Descartada',
}

export const adoptionStatusLabels: Record<TechnologyAdoptionStatus, string> = {
  evaluating: 'Em avaliação',
  planned: 'Planejada',
  adopted: 'Adotada',
  replaced: 'Substituída',
}

export const decisionStatusLabels: Record<TechnicalDecisionStatus, string> = {
  proposed: 'Proposta',
  accepted: 'Aceita',
  superseded: 'Substituída',
  rejected: 'Rejeitada',
}

export const resultStatusLabels: Record<ResultValidationStatus, string> = {
  verified: 'Comprovado',
  observed: 'Observado',
  expected: 'Esperado',
}

export const learningCategoryLabels: Record<LearningCategory, string> = {
  technical: 'Técnico',
  operational: 'Operacional',
  product: 'Produto',
}
