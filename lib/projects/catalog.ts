import type {
  Project,
  ProjectCategory,
  ProjectClassification,
  ProjectLifecycleStatus,
  ProjectStatus,
} from './types'

export type CatalogState = `lifecycle:${ProjectLifecycleStatus}` | `legacy:${ProjectStatus}`

export interface CatalogFilters {
  classification?: ProjectClassification
  category?: ProjectCategory
  state?: CatalogState
  technology?: string
}

function normalizeTechnology(value: string) {
  return value.trim().toLocaleLowerCase('pt-BR')
}

export function getProjectTechnologies(project: Project) {
  const technologies = [
    ...project.technologies,
    ...(project.caseStudy?.technologies?.map((technology) => technology.name) ?? []),
  ]
  const unique = new Map<string, string>()

  technologies.forEach((technology) => {
    const trimmed = technology.trim()
    const normalized = normalizeTechnology(trimmed)
    if (normalized && !unique.has(normalized)) unique.set(normalized, trimmed)
  })

  return [...unique.values()]
}

export function getCatalogState(project: Project): CatalogState {
  return project.lifecycleStatus
    ? `lifecycle:${project.lifecycleStatus}`
    : `legacy:${project.status}`
}

export function filterProjects(
  projects: readonly Project[],
  filters: CatalogFilters,
) {
  const normalizedTechnology = filters.technology
    ? normalizeTechnology(filters.technology)
    : undefined

  return projects.filter((project) => {
    if (filters.classification && project.classification !== filters.classification) return false
    if (filters.category && project.category !== filters.category) return false
    if (filters.state && getCatalogState(project) !== filters.state) return false
    if (
      normalizedTechnology
      && !getProjectTechnologies(project).some(
        (technology) => normalizeTechnology(technology) === normalizedTechnology,
      )
    ) return false

    return true
  })
}

export function getCatalogCategories(projects: readonly Project[]) {
  return [...new Set(projects.map((project) => project.category))]
}

export function getCatalogStates(projects: readonly Project[]) {
  return [...new Set(projects.map(getCatalogState))]
}

export function getCatalogTechnologies(projects: readonly Project[]) {
  const unique = new Map<string, string>()

  projects.flatMap(getProjectTechnologies).forEach((technology) => {
    const normalized = normalizeTechnology(technology)
    if (!unique.has(normalized)) unique.set(normalized, technology)
  })

  return [...unique.values()].sort((left, right) => left.localeCompare(right, 'pt-BR'))
}
