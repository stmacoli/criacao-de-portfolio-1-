export type ProjectCategory = 'Sistemas' | 'Automação' | 'Web' | 'Produtos autorais' | 'Laboratório'
export type ProjectStatus = 'Em desenvolvimento' | 'Conceitual' | 'Contínuo'

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  technologies: string[]
  coverImage: string
  gallery: string[]
  problem: string
  solution: string
  architecture: string[]
  responsibilities: string[]
  outcomes: string[]
  links: { label: string; url: string }[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '01', slug: 'dropbox-manager', title: 'Dropbox Manager', category: 'Sistemas', status: 'Em desenvolvimento',
    description: 'Ferramenta de gerenciamento de acervos digitais, com foco em pesquisa de arquivos, organização de informações e automação de operações.',
    technologies: ['Python', 'APIs', 'React', 'TypeScript'], coverImage: '/projects/dropbox-manager.svg', gallery: ['/projects/dropbox-manager.svg'],
    problem: 'Acervos digitais podem se tornar difíceis de pesquisar e organizar quando informações, pastas e operações ficam dispersas.',
    solution: 'Uma experiência conceitual para centralizar busca, filtros, tags, estrutura de pastas e detalhes dos arquivos em um único fluxo.',
    architecture: ['Interface de pesquisa', 'Camada de integração com APIs', 'Processamento e organização', 'Persistência de metadados', 'Automação de operações'],
    responsibilities: ['Análise do fluxo de trabalho', 'Estruturação da experiência', 'Desenvolvimento de protótipos e integrações'],
    outcomes: ['Demonstração conceitual em evolução', 'Arquitetura preparada para novas funcionalidades'], links: [], featured: true,
  },
  {
    id: '02', slug: 'audio-market-plus', title: 'Áudio Market+', category: 'Produtos autorais', status: 'Em desenvolvimento',
    description: 'Projeto de plataforma voltada ao ecossistema audiovisual, explorando organização de informações, relacionamentos e experiências digitais.',
    technologies: ['Produto digital', 'Pesquisa', 'Prototipação'], coverImage: '/projects/audio-market.svg', gallery: ['/projects/audio-market.svg'], problem: 'Explorar como informações e relações do universo audiovisual podem ser organizadas em uma experiência digital.', solution: 'Projeto autoral em desenvolvimento, com foco na descoberta do produto e na estruturação de seus fluxos.', architecture: ['Experiência do produto', 'Modelagem de informações', 'Protótipos navegáveis'], responsibilities: ['Pesquisa e concepção do produto', 'Estruturação inicial de fluxos'], outcomes: ['Projeto em desenvolvimento'], links: [],
  },
  {
    id: '03', slug: 'desenvolvimento-web', title: 'Desenvolvimento Web', category: 'Web', status: 'Contínuo',
    description: 'Desenvolvimento de websites e aplicações responsivas, com atenção à experiência de uso, organização do conteúdo e necessidades de cada negócio.',
    technologies: ['React', 'Next.js', 'TypeScript'], coverImage: '/projects/web-development.svg', gallery: ['/projects/web-development.svg'], problem: 'Negócios precisam apresentar informações e serviços com clareza em diferentes dispositivos.', solution: 'Interfaces responsivas e organizadas, desenvolvidas a partir do contexto e das necessidades de cada projeto.', architecture: ['Componentes reutilizáveis', 'Rotas e conteúdo', 'Layout responsivo'], responsibilities: ['Desenvolvimento frontend', 'Organização de conteúdo e interface'], outcomes: ['Base para experiências digitais consistentes'], links: [],
  },
  {
    id: '04', slug: 'laboratorio', title: 'Laboratório', category: 'Laboratório', status: 'Contínuo',
    description: 'Projetos independentes, protótipos e experimentos voltados à exploração de tecnologias, ferramentas e novas ideias.',
    technologies: ['Experimentação', 'Prototipação'], coverImage: '/projects/laboratory.svg', gallery: ['/projects/laboratory.svg'], problem: 'Novas ideias precisam de espaço para serem testadas antes de se tornarem produtos ou soluções.', solution: 'Um conjunto vivo de explorações técnicas e conceituais para aprender, testar e evoluir.', architecture: ['Hipótese', 'Protótipo', 'Aprendizado'], responsibilities: ['Pesquisa independente', 'Experimentação técnica'], outcomes: ['Conhecimento aplicado em evolução'], links: [],
  },
]
