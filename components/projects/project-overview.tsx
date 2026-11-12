import { Check } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { ProjectSection } from './project-section'

export function ProjectOverview({ project }: { project: Project }) {
  const caseStudy = project.caseStudy
  const hasStructuredProblems = !!caseStudy?.problems?.length
  const hasStructuredSolutions = !!caseStudy?.solutions?.length

  return (
    <ProjectSection id={'visao-geral'} eyebrow={'VISÃO GERAL'} title={'O ponto de partida.'}>
      <div className={'case-prose'}>
        <p>{caseStudy?.context ?? project.description}</p>
        {!hasStructuredProblems && (
          <>
            <h3>Necessidade</h3>
            <p>{project.problem}</p>
          </>
        )}
        {!hasStructuredSolutions && (
          <>
            <h3>Abordagem</h3>
            <p>{project.solution}</p>
          </>
        )}
      </div>

      {!!caseStudy?.objectives?.items.length && (
        <div className={'case-subsection'}>
          <h3>Objetivos</h3>
          {caseStudy.objectives.summary && <p>{caseStudy.objectives.summary}</p>}
          <ul className={'check-list'}>
            {caseStudy.objectives.items.map((objective) => (
              <li key={objective}><Check aria-hidden />{objective}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={'case-subsection'}>
        <h3>Minha participação</h3>
        <ul className={'check-list'}>
          {project.responsibilities.map((responsibility) => (
            <li key={responsibility}><Check aria-hidden />{responsibility}</li>
          ))}
        </ul>
        {!!caseStudy?.contributions?.length && (
          <div className={'contribution-list'}>
            {caseStudy.contributions.map((contribution) => (
              <article key={contribution.area}>
                <h4>{contribution.area}</h4>
                <p>{contribution.description}</p>
                {!!contribution.responsibilities?.length && (
                  <ul>
                    {contribution.responsibilities.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className={'case-callout'}>
        <span className={'mono'}>VISÃO DO PROJETO</span>
        <p>Este estudo diferencia implementação existente, protótipo e planejamento. Não representa métricas ou resultados finais não verificados.</p>
      </div>
    </ProjectSection>
  )
}
