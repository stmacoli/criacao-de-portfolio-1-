export interface ProjectNavigationItem {
  id: string
  label: string
}

export function ProjectNavigation({ items }: { items: ProjectNavigationItem[] }) {
  return (
    <nav className={'case-index'} aria-label={'Seções deste projeto'}>
      <span className={'mono'}>NESTE PROJETO</span>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={'#' + item.id}>
              <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
