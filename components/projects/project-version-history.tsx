import type { ProductionIncident, ProjectVersion } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { versionStatusLabels } from './project-labels'
import {
  findIncidentByReference,
  formatCivilDate,
  getIncidentsForVersion,
  toAnchorFragment,
} from './project-lifecycle-utils'

interface ProjectVersionHistoryProps {
  versions: ProjectVersion[]
  incidents: ProductionIncident[]
}

export function ProjectVersionHistory({
  versions,
  incidents,
}: ProjectVersionHistoryProps) {
  return (
    <ProjectSection
      id={'historico-versoes'}
      eyebrow={'HISTÓRICO DE VERSÕES'}
      title={'Evolução e entregas do projeto.'}
    >
      <ol className={'lifecycle-timeline version-timeline'}>
        {versions.map((version) => {
          const releasedAt = formatCivilDate(version.releasedAt)
          const expectedAt = formatCivilDate(version.expectedAt)
          const relatedIncidents = getIncidentsForVersion(version, incidents)
          const groups = [
            { title: 'Funcionalidades', items: version.features },
            { title: 'Melhorias', items: version.improvements },
            { title: 'Correções', items: version.fixes },
            { title: 'Alterações técnicas', items: version.technicalChanges },
            { title: 'Observações', items: version.notes },
          ].filter((group) => group.items?.length)
          const hasDetails = !!(
            version.description
            || releasedAt
            || expectedAt
            || groups.length
            || relatedIncidents.length
          )

          const summary = (
            <span className={'lifecycle-summary'}>
              <span>
                <span className={'mono lifecycle-code'}>{version.version}</span>
                <strong className={'lifecycle-title'}>{version.title}</strong>
              </span>
              <span className={'lifecycle-summary-meta'}>
                <span className={'status-badge version-' + version.status}>
                  {versionStatusLabels[version.status]}
                </span>
                {releasedAt && <time dateTime={version.releasedAt}>{releasedAt}</time>}
                {!releasedAt && expectedAt && (
                  <time dateTime={version.expectedAt}>Previsão: {expectedAt}</time>
                )}
              </span>
            </span>
          )

          return (
            <li
              key={version.version}
              id={'versao-' + toAnchorFragment(version.version)}
              className={'lifecycle-entry'}
            >
              <span className={'timeline-marker'} aria-hidden />
              {hasDetails ? (
                <details>
                  <summary>{summary}</summary>
                  <VersionDetails
                    version={version}
                    groups={groups}
                    relatedIncidents={relatedIncidents}
                    incidents={incidents}
                    releasedAt={releasedAt}
                    expectedAt={expectedAt}
                  />
                </details>
              ) : (
                <div className={'lifecycle-static-summary'}>{summary}</div>
              )}
            </li>
          )
        })}
      </ol>
    </ProjectSection>
  )
}

interface VersionDetailsProps {
  version: ProjectVersion
  groups: { title: string; items: string[] | undefined }[]
  relatedIncidents: ProductionIncident[]
  incidents: ProductionIncident[]
  releasedAt?: string
  expectedAt?: string
}

function VersionDetails({
  version,
  groups,
  relatedIncidents,
  incidents,
  releasedAt,
  expectedAt,
}: VersionDetailsProps) {
  return (
    <div className={'lifecycle-details'}>
      {version.description && <p>{version.description}</p>}
      {(releasedAt || expectedAt) && (
        <dl className={'lifecycle-dates'}>
          {releasedAt && <div><dt>Publicação</dt><dd>{releasedAt}</dd></div>}
          {expectedAt && <div><dt>Previsão</dt><dd>{expectedAt}</dd></div>}
        </dl>
      )}
      {groups.map((group) => (
        <div className={'lifecycle-detail-group'} key={group.title}>
          <strong>{group.title}</strong>
          <ul>
            {group.items?.map((item) => {
              const incident = group.title === 'Correções'
                ? findIncidentByReference(item, incidents)
                : undefined
              return (
                <li key={item}>
                  {incident
                    ? <a href={'#incidente-' + toAnchorFragment(incident.id)}>{incident.title}</a>
                    : item}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      {!!relatedIncidents.length && (
        <div className={'lifecycle-relations'}>
          <strong>Ocorrências relacionadas</strong>
          {relatedIncidents.map((incident) => (
            <a key={incident.id} href={'#incidente-' + toAnchorFragment(incident.id)}>
              {incident.id} — {incident.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
