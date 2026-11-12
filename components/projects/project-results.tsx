import type { ProjectResult } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { resultStatusLabels } from './project-labels'

export function ProjectResults({ results }: { results: ProjectResult[] }) {
  return (
    <ProjectSection
      id={'resultados'}
      eyebrow={'RESULTADOS'}
      title={'Evidências e efeitos do projeto.'}
    >
      <div className={'result-list'}>
        {results.map((result) => (
          <article key={result.id} className={'result-item result-' + result.validationStatus}>
            <div className={'result-heading'}>
              <h3>{result.title}</h3>
              <span className={'status-badge'}>{resultStatusLabels[result.validationStatus]}</span>
            </div>
            {(result.value !== undefined || result.indicator) && (
              <div className={'result-metric'}>
                {result.value !== undefined && (
                  <strong>{result.value}{result.unit && <small>{result.unit}</small>}</strong>
                )}
                {result.indicator && <span>{result.indicator}</span>}
              </div>
            )}
            <p>{result.description}</p>
            {result.evidence && <p className={'result-evidence'}><strong>Evidência:</strong> {result.evidence}</p>}
          </article>
        ))}
      </div>
    </ProjectSection>
  )
}
