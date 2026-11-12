import type { ProjectProblem, ProjectSolution } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { solutionStatusLabels } from './project-labels'

interface ProjectSolutionsProps {
  solutions: ProjectSolution[]
  problems: ProjectProblem[]
}

export function ProjectSolutions({ solutions, problems }: ProjectSolutionsProps) {
  return (
    <ProjectSection
      id={'solucoes'}
      eyebrow={'SOLUÇÕES'}
      title={'Abordagens propostas e implementadas.'}
    >
      <div className={'solution-list'}>
        {solutions.map((solution) => {
          const relatedProblems = problems.filter((problem) =>
            solution.relatedProblemIds?.includes(problem.id),
          )

          return (
            <article key={solution.id} id={'solucao-' + solution.id} className={'solution-item'}>
              <div className={'solution-heading'}>
                <h3>{solution.title}</h3>
                <span className={'status-badge status-' + solution.status}>
                  {solutionStatusLabels[solution.status]}
                </span>
              </div>
              <p>{solution.description}</p>
              {!!relatedProblems.length && (
                <p className={'related-copy'}>
                  <strong>Problema relacionado:</strong>{' '}
                  {relatedProblems.map((problem) => problem.title).join(' · ')}
                </p>
              )}
            </article>
          )
        })}
      </div>
    </ProjectSection>
  )
}
