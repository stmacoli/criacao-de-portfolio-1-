import type { Project } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { adoptionStatusLabels } from './project-labels'

export function ProjectTechnologies({ project }: { project: Project }) {
  const detailedTechnologies = project.caseStudy?.technologies ?? []

  return (
    <ProjectSection
      id={'tecnologias'}
      eyebrow={'TECNOLOGIAS'}
      title={'Ferramentas e escolhas técnicas.'}
    >
      <div className={'tag-list case-tags'}>
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>

      {!!detailedTechnologies.length && (
        <dl className={'technology-list'}>
          {detailedTechnologies.map((technology) => (
            <div key={technology.name}>
              <dt>
                <span>{technology.name}</span>
                {technology.adoptionStatus && (
                  <small>{adoptionStatusLabels[technology.adoptionStatus]}</small>
                )}
              </dt>
              {(technology.category || technology.purpose) && (
                <dd>
                  {technology.category && <strong>{technology.category}</strong>}
                  {technology.purpose && <p>{technology.purpose}</p>}
                </dd>
              )}
            </div>
          ))}
        </dl>
      )}
    </ProjectSection>
  )
}
