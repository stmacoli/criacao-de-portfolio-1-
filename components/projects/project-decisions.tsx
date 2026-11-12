import type { TechnicalDecision } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { decisionStatusLabels } from './project-labels'

export function ProjectDecisions({ decisions }: { decisions: TechnicalDecision[] }) {
  return (
    <ProjectSection
      id={'decisoes'}
      eyebrow={'DECISÕES TÉCNICAS'}
      title={'Escolhas, alternativas e consequências.'}
    >
      <div className={'decision-list'}>
        {decisions.map((decision) => (
          <details key={decision.id}>
            <summary>
              <span>{decision.title}</span>
              <small>{decisionStatusLabels[decision.status]}</small>
            </summary>
            <div className={'decision-content'}>
              <div><strong>Contexto</strong><p>{decision.context}</p></div>
              {!!decision.alternatives?.length && (
                <div>
                  <strong>Alternativas consideradas</strong>
                  <ul>{decision.alternatives.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              <div><strong>Escolha</strong><p>{decision.decision}</p></div>
              <div><strong>Justificativa</strong><p>{decision.rationale}</p></div>
              {!!decision.consequences?.length && (
                <div>
                  <strong>Consequências</strong>
                  <ul>{decision.consequences.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </ProjectSection>
  )
}
