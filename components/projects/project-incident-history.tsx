import type { ProductionIncident, ProjectVersion } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { incidentStatusLabels } from './project-labels'
import { toAnchorFragment } from './project-lifecycle-utils'

interface ProjectIncidentHistoryProps {
  incidents: ProductionIncident[]
  versions: ProjectVersion[]
}

export function ProjectIncidentHistory({
  incidents,
  versions,
}: ProjectIncidentHistoryProps) {
  const versionExists = (reference: string) =>
    versions.some((version) => version.version === reference)

  return (
    <ProjectSection
      id={'ocorrencias'}
      eyebrow={'OCORRÊNCIAS'}
      title={'Diagnóstico, correção e melhoria contínua.'}
    >
      <div className={'incident-list'}>
        {incidents.map((incident) => (
          <article
            key={incident.id}
            id={'incidente-' + toAnchorFragment(incident.id)}
            className={'incident-entry'}
          >
            <details>
              <summary>
                <span>
                  <span className={'mono lifecycle-code'}>{incident.id}</span>
                  <strong className={'lifecycle-title'}>{incident.title}</strong>
                </span>
                <span className={'status-badge incident-' + incident.status}>
                  {incidentStatusLabels[incident.status]}
                </span>
              </summary>
              <div className={'incident-details'}>
                <IncidentDetail label={'Problema identificado'}>
                  <p>{incident.description}</p>
                </IncidentDetail>
                {incident.context && (
                  <IncidentDetail label={'Contexto'}>
                    <p>{incident.context}</p>
                  </IncidentDetail>
                )}
                {incident.impact && (
                  <IncidentDetail label={'Impacto'}>
                    <p>{incident.impact}</p>
                  </IncidentDetail>
                )}
                {incident.identifiedCause && (
                  <IncidentDetail label={'Diagnóstico'}>
                    <p>{incident.identifiedCause}</p>
                  </IncidentDetail>
                )}
                {incident.appliedSolution && (
                  <IncidentDetail label={'Solução'}>
                    <p>{incident.appliedSolution}</p>
                  </IncidentDetail>
                )}
                {(incident.identifiedInVersion || incident.fixedInVersion) && (
                  <IncidentDetail label={'Versões relacionadas'}>
                    <div className={'incident-version-links'}>
                      {incident.identifiedInVersion && (
                        <VersionReference
                          label={'Detectado em'}
                          reference={incident.identifiedInVersion}
                          linked={versionExists(incident.identifiedInVersion)}
                        />
                      )}
                      {incident.fixedInVersion && (
                        <VersionReference
                          label={'Corrigido em'}
                          reference={incident.fixedInVersion}
                          linked={versionExists(incident.fixedInVersion)}
                        />
                      )}
                    </div>
                  </IncidentDetail>
                )}
                {!!incident.learnings?.length && (
                  <IncidentDetail label={'Resultado / aprendizado'}>
                    <ul>
                      {incident.learnings.map((learning) => <li key={learning}>{learning}</li>)}
                    </ul>
                  </IncidentDetail>
                )}
              </div>
            </details>
          </article>
        ))}
      </div>
    </ProjectSection>
  )
}

function IncidentDetail({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className={'incident-detail'}>
      <strong>{label}</strong>
      {children}
    </div>
  )
}

function VersionReference({
  label,
  reference,
  linked,
}: {
  label: string
  reference: string
  linked: boolean
}) {
  const content = <>{label} <span>{reference}</span></>
  return linked
    ? <a href={'#versao-' + toAnchorFragment(reference)}>{content}</a>
    : <p>{content}</p>
}
