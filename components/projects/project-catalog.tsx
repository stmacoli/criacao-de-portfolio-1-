'use client'

import { useMemo, useState } from 'react'
import { ProjectCard } from './project-card'
import { ProjectFilters } from './project-filters'
import {
  filterProjects,
  getCatalogCategories,
  getCatalogStates,
  getCatalogTechnologies,
  type CatalogFilters,
  type Project,
} from '@/lib/projects'

interface ProjectCatalogProps {
  projects: readonly Project[]
}

export function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const [filters, setFilters] = useState<CatalogFilters>({})
  const categories = useMemo(() => getCatalogCategories(projects), [projects])
  const states = useMemo(() => getCatalogStates(projects), [projects])
  const technologies = useMemo(() => getCatalogTechnologies(projects), [projects])
  const visibleProjects = useMemo(
    () => filterProjects(projects, filters),
    [filters, projects],
  )

  return (
    <div className={'project-catalog'}>
      <ProjectFilters
        filters={filters}
        categories={categories}
        states={states}
        technologies={technologies}
        onChange={setFilters}
        onClear={() => setFilters({})}
      />

      <div className={'catalog-results'} aria-live={'polite'} aria-atomic={'true'}>
        <p>
          <strong>{visibleProjects.length}</strong>
          {' '}
          {visibleProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
        </p>
      </div>

      {visibleProjects.length ? (
        <div className={'catalog-grid'}>
          {visibleProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      ) : (
        <div className={'empty-state'} role={'status'}>
          <h2>Nenhum projeto corresponde aos filtros.</h2>
          <p>Altere um dos critérios ou volte a visualizar o catálogo completo.</p>
          <button className={'button secondary'} type={'button'} onClick={() => setFilters({})}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
