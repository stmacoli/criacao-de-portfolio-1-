import type { ProjectProblem, ProjectSolution } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { solutionStatusLabels } from './project-labels'

interface ProjectProblemsProps {
  problems: ProjectProblem[]
  solutions: ProjectSolution[]
}

export function ProjectProblems({ problems, solutions }: ProjectProblemsProps) {
  return (
    <ProjectSection
      id={'problemas'}
      eyebrow={'PROBLEMAS IDENTIFICADOS'}
      title={'Necessidades que orientaram o projeto.'}
    >
      <div className={'problem-list'}>
        {problems.map((problem, index) => {
          const relatedSolutions = solutions.filter((solution) =>
            problem.relatedSolutionIds?.includes(solution.id),
          )

          return (
            <article key={problem.id} className={'problem-item'}>
              <span className={'item-index mono'}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{problem.title}</h3>
                <p>{problem.description}</p>
                {problem.context && (
                  <div className={'item-detail'}>
                    <strong>Contexto</strong>
                    <p>{problem.context}</p>
                  </div>
                )}
                {problem.impact && (
                  <div className={'item-detail'}>
                    <strong>Impacto</strong>
                    <p>{problem.impact}</p>
                  </div>
                )}
                {!!relatedSolutions.length && (
                  <div className={'related-items'}>
                    <strong>Soluções relacionadas</strong>
                    <ul>
                      {relatedSolutions.map((solution) => (
                        <li key={solution.id}>
                          <a href={'#solucao-' + solution.id}>{solution.title}</a>
                          <span className={'status-badge status-' + solution.status}>
                            {solutionStatusLabels[solution.status]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </ProjectSection>
  )
}
