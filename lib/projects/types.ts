export type ProjectCategory =
  | 'Sistemas'
  | 'Automação'
  | 'Web'
  | 'Produtos autorais'
  | 'Laboratório'

/** Valor legado exibido pelos componentes atuais. */
export type ProjectStatus = 'Em desenvolvimento' | 'Conceitual' | 'Contínuo'

export type ProjectClassification = 'professional' | 'personal' | 'experimental'

export type ProjectLifecycleStatus =
  | 'planned'
  | 'in-development'
  | 'in-production'
  | 'in-maintenance'
  | 'completed'
  | 'paused'
  | 'conceptual'

export type PublicationStatus = 'production' | 'demo' | 'restricted' | 'unpublished'

export interface ProjectLink {
  label: string
  url: string
  kind?: 'live' | 'repository' | 'documentation' | 'article' | 'other'
}

export interface ProjectMedia {
  src: string
  alt: string
  caption?: string
  kind?: 'cover' | 'screenshot' | 'diagram' | 'video' | 'document'
}

export interface ClientInformation {
  commercialName: string
  industry?: string
  relationship?: string
  disclosure: {
    authorized: boolean
    scope?: string
    publicNotes?: string
  }
}

export type SolutionStatus =
  | 'proposed'
  | 'in-implementation'
  | 'implemented'
  | 'validated'
  | 'discarded'

export interface ProjectProblem {
  id: string
  title: string
  description: string
  context?: string
  impact?: string
  relatedSolutionIds?: string[]
}

export interface ProjectSolution {
  id: string
  title: string
  description: string
  status: SolutionStatus
  relatedProblemIds?: string[]
  relatedResultIds?: string[]
}

export type TechnologyAdoptionStatus = 'evaluating' | 'planned' | 'adopted' | 'replaced'

export interface ProjectTechnology {
  name: string
  category?: string
  purpose?: string
  adoptionStatus?: TechnologyAdoptionStatus
}

export interface ArchitectureComponent {
  id: string
  name: string
  responsibility: string
  technologyNames?: string[]
  integrationIds?: string[]
}

export interface ArchitectureIntegration {
  id: string
  name: string
  description: string
  sourceComponentId?: string
  targetComponentId?: string
  externalDependency?: string
}

export interface DataFlow {
  id: string
  name: string
  description: string
  steps?: string[]
}

export interface TechnicalArchitecture {
  summary?: string
  components?: ArchitectureComponent[]
  integrations?: ArchitectureIntegration[]
  dataFlows?: DataFlow[]
  externalDependencies?: string[]
  notes?: string[]
}

export interface ProjectContribution {
  area: string
  description: string
  responsibilities?: string[]
}

export type TechnicalDecisionStatus = 'proposed' | 'accepted' | 'superseded' | 'rejected'

export interface TechnicalDecision {
  id: string
  title: string
  context: string
  alternatives?: string[]
  decision: string
  rationale: string
  consequences?: string[]
  status: TechnicalDecisionStatus
}

export type VersionStatus = 'planned' | 'in-development' | 'published' | 'cancelled'

export interface ProjectVersion {
  version: string
  title: string
  description?: string
  status: VersionStatus
  releasedAt?: string
  expectedAt?: string
  features?: string[]
  improvements?: string[]
  fixes?: string[]
  technicalChanges?: string[]
  notes?: string[]
}

export type IncidentStatus =
  | 'identified'
  | 'investigating'
  | 'fixing'
  | 'resolved'
  | 'monitoring'

export interface ProductionIncident {
  id: string
  title: string
  description: string
  context?: string
  impact?: string
  identifiedCause?: string
  appliedSolution?: string
  status: IncidentStatus
  identifiedInVersion?: string
  fixedInVersion?: string
  learnings?: string[]
}

export type RoadmapStatus = 'under-study' | 'planned' | 'in-development' | 'completed' | 'cancelled'
export type RoadmapPriority = 'low' | 'medium' | 'high' | 'critical'
export type RoadmapCommitment = 'committed' | 'exploratory'

export interface RoadmapItem {
  id: string
  title: string
  description: string
  relatedVersion?: string
  status: RoadmapStatus
  priority?: RoadmapPriority
  commitment: RoadmapCommitment
  dependencyIds?: string[]
  expectedAt?: string
}

export type ResultValidationStatus = 'verified' | 'observed' | 'expected'

export interface ProjectResult {
  id: string
  title: string
  description: string
  indicator?: string
  value?: string | number
  unit?: string
  evidence?: string
  validationStatus: ResultValidationStatus
}

export type LearningCategory = 'technical' | 'operational' | 'product'

export interface ProjectLearning {
  id: string
  title: string
  description: string
  category: LearningCategory
  relatedDecisionIds?: string[]
  relatedIncidentIds?: string[]
}

export interface ProjectObjectives {
  summary?: string
  items: string[]
}

export interface ProjectCaseStudy {
  client?: ClientInformation
  context?: string
  objectives?: ProjectObjectives
  problems?: ProjectProblem[]
  solutions?: ProjectSolution[]
  technologies?: ProjectTechnology[]
  architecture?: TechnicalArchitecture
  contributions?: ProjectContribution[]
  decisions?: TechnicalDecision[]
  results?: ProjectResult[]
  versions?: ProjectVersion[]
  incidents?: ProductionIncident[]
  roadmap?: RoadmapItem[]
  learnings?: ProjectLearning[]
  media?: ProjectMedia[]
}

/**
 * Os campos no primeiro bloco mantêm o contrato consumido pela interface atual.
 * A documentação detalhada é opcional para permitir uma migração conservadora.
 */
export interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  technologies: string[]
  coverImage: string
  gallery: string[]
  problem: string
  solution: string
  architecture: string[]
  responsibilities: string[]
  outcomes: string[]
  links: ProjectLink[]
  featured?: boolean

  classification?: ProjectClassification
  lifecycleStatus?: ProjectLifecycleStatus
  publicationStatus?: PublicationStatus
  caseStudy?: ProjectCaseStudy
}
