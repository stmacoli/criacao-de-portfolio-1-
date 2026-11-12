import {
  classificationFilterLabels,
  legacyStatusLabels,
  lifecycleLabels,
} from './project-labels'
import type {
  CatalogFilters,
  CatalogState,
  ProjectCategory,
  ProjectClassification,
  ProjectLifecycleStatus,
  ProjectStatus,
} from '@/lib/projects'

interface ProjectFiltersProps {
  filters: CatalogFilters
  categories: readonly ProjectCategory[]
  states: readonly CatalogState[]
  technologies: readonly string[]
  onChange: (filters: CatalogFilters) => void
  onClear: () => void
}

const classifications: ProjectClassification[] = [
  'professional',
  'personal',
  'experimental',
]

function getStateLabel(state: CatalogState) {
  if (state.startsWith('lifecycle:')) {
    const value = state.slice('lifecycle:'.length) as ProjectLifecycleStatus
    return lifecycleLabels[value]
  }

  const value = state.slice('legacy:'.length) as ProjectStatus
  return legacyStatusLabels[value]
}

export function ProjectFilters({
  filters,
  categories,
  states,
  technologies,
  onChange,
  onClear,
}: ProjectFiltersProps) {
  const activeCount = Object.values(filters).filter(Boolean).length

  return (
    <section className={'catalog-filters'} aria-labelledby={'catalog-filters-title'}>
      <div className={'catalog-filter-heading'}>
        <div>
          <p className={'eyebrow'} id={'catalog-filters-title'}>FILTRAR PROJETOS</p>
          <p className={'catalog-filter-hint'}>Combine critérios para refinar o catálogo.</p>
        </div>
        {activeCount ? (
          <button className={'catalog-clear'} type={'button'} onClick={onClear}>
            Limpar todos <span aria-hidden={'true'}>({activeCount})</span>
          </button>
        ) : null}
      </div>

      <fieldset className={'classification-filters'}>
        <legend>Classificação</legend>
        <button
          type={'button'}
          className={!filters.classification ? 'filter active' : 'filter'}
          aria-pressed={!filters.classification}
          onClick={() => onChange({ ...filters, classification: undefined })}
        >
          Todos
        </button>
        {classifications.map((classification) => (
          <button
            type={'button'}
            key={classification}
            className={filters.classification === classification ? 'filter active' : 'filter'}
            aria-pressed={filters.classification === classification}
            onClick={() => onChange({ ...filters, classification })}
          >
            {classificationFilterLabels[classification]}
          </button>
        ))}
      </fieldset>

      <details className={'catalog-advanced'}>
        <summary>
          Categoria, estado e tecnologia
          {activeCount > (filters.classification ? 1 : 0) ? (
            <span>{activeCount - (filters.classification ? 1 : 0)} ativos</span>
          ) : null}
        </summary>
        <div className={'catalog-selects'}>
          <label>
            <span>Categoria técnica</span>
            <select
              value={filters.category ?? ''}
              onChange={(event) => onChange({
                ...filters,
                category: (event.target.value || undefined) as ProjectCategory | undefined,
              })}
            >
              <option value={''}>Todas</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>

          <label>
            <span>Estado do projeto</span>
            <select
              value={filters.state ?? ''}
              onChange={(event) => onChange({
                ...filters,
                state: (event.target.value || undefined) as CatalogState | undefined,
              })}
            >
              <option value={''}>Todos</option>
              {states.map((state) => (
                <option key={state} value={state}>{getStateLabel(state)}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Tecnologia</span>
            <select
              value={filters.technology ?? ''}
              onChange={(event) => onChange({
                ...filters,
                technology: event.target.value || undefined,
              })}
            >
              <option value={''}>Todas</option>
              {technologies.map((technology) => (
                <option key={technology}>{technology}</option>
              ))}
            </select>
          </label>
        </div>
      </details>
    </section>
  )
}
