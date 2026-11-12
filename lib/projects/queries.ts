import type { Project, ProjectCategory, ProjectClassification } from './types'

export function getProjectBySlug(projects: readonly Project[], slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getProjectsByCategory(projects: readonly Project[], category: ProjectCategory) {
  return projects.filter((project) => project.category === category)
}

export function getProjectsByClassification(
  projects: readonly Project[],
  classification: ProjectClassification,
) {
  return projects.filter((project) => project.classification === classification)
}

export function getFeaturedProject(projects: readonly Project[]) {
  return projects.find((project) => project.featured)
}
