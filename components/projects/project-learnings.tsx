import type { ProjectLearning } from '@/lib/projects'
import { ProjectSection } from './project-section'
import { learningCategoryLabels } from './project-labels'

export function ProjectLearnings({ learnings }: { learnings: ProjectLearning[] }) {
  return (
    <ProjectSection
      id={'aprendizados'}
      eyebrow={'APRENDIZADOS'}
      title={'Conhecimento construído durante o projeto.'}
    >
      <div className={'learning-list'}>
        {learnings.map((learning) => (
          <article key={learning.id}>
            <span className={'mono'}>{learningCategoryLabels[learning.category]}</span>
            <h3>{learning.title}</h3>
            <p>{learning.description}</p>
          </article>
        ))}
      </div>
    </ProjectSection>
  )
}
