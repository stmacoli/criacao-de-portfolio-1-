import type {
  LearningCategory,
  IncidentStatus,
  ProjectClassification,
  ProjectLifecycleStatus,
  ProjectStatus,
  PublicationStatus,
  RoadmapCommitment,
  RoadmapPriority,
  RoadmapStatus,
  ResultValidationStatus,
  SolutionStatus,
  TechnicalDecisionStatus,
  TechnologyAdoptionStatus,
  VersionStatus,
} from '@/lib/projects'

export const classificationLabels: Record<ProjectClassification, string> = {
  professional: 'Profissional',
  personal: 'Pessoal',
  experimental: 'Experimental',
}

export const classificationFilterLabels: Record<ProjectClassification, string> = {
  professional: 'Profissionais',
  personal: 'Pessoais',
  experimental: 'Experimentais',
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

export const legacyStatusLabels: Record<ProjectStatus, string> = {
  'Em desenvolvimento': 'Em desenvolvimento',
  Conceitual: 'Conceitual',
  Contínuo: 'Contínuo',
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

export const versionStatusLabels: Record<VersionStatus, string> = {
  published: 'Publicada',
  'in-development': 'Em desenvolvimento',
  planned: 'Planejada',
  cancelled: 'Cancelada',
}

export const incidentStatusLabels: Record<IncidentStatus, string> = {
  identified: 'Identificado',
  investigating: 'Em investigação',
  fixing: 'Em correção',
  resolved: 'Resolvido',
  monitoring: 'Monitorando',
}

export const roadmapStatusLabels: Record<RoadmapStatus, string> = {
  'under-study': 'Em estudo',
  planned: 'Planejado',
  'in-development': 'Em desenvolvimento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
}

export const roadmapPriorityLabels: Record<RoadmapPriority, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
}

export const roadmapCommitmentLabels: Record<RoadmapCommitment, string> = {
  committed: 'Comprometido',
  exploratory: 'Exploratório',
}
