import type { Project } from '../types'

export const dropboxManager: Project = {
  id: '01',
  slug: 'dropbox-manager',
  title: 'Dropbox Manager',
  category: 'Sistemas',
  status: 'Em desenvolvimento',
  description: 'Ferramenta de gerenciamento de acervos digitais, com foco em pesquisa de arquivos, organização de informações e automação de operações.',
  technologies: ['Python', 'APIs', 'React', 'TypeScript'],
  coverImage: '/projects/dropbox-manager.svg',
  gallery: ['/projects/dropbox-manager.svg'],
  problem: 'Acervos digitais podem se tornar difíceis de pesquisar e organizar quando informações, pastas e operações ficam dispersas.',
  solution: 'Uma experiência conceitual para centralizar busca, filtros, tags, estrutura de pastas e detalhes dos arquivos em um único fluxo.',
  architecture: ['Interface de pesquisa', 'Camada de integração com APIs', 'Processamento e organização', 'Persistência de metadados', 'Automação de operações'],
  responsibilities: ['Análise do fluxo de trabalho', 'Estruturação da experiência', 'Desenvolvimento de protótipos e integrações'],
  outcomes: ['Demonstração conceitual em evolução', 'Arquitetura preparada para novas funcionalidades'],
  links: [],
  featured: true,
  caseStudy: {
    context: 'Aplicação para gerenciamento de acervos digitais, reunindo pesquisa, organização de arquivos, metadados e automações em uma interface de trabalho.',
    problems: [
      {
        id: 'organizar-acervos',
        title: 'Organizar acervos exige mais do que pastas.',
        description: 'Acervos digitais extensos exigem mais do que uma estrutura de pastas. É necessário localizar informações rapidamente, manter padrões de organização e acompanhar alterações sem depender exclusivamente de tarefas manuais.',
        relatedSolutionIds: ['integracao-interface-servicos-dados'],
      },
    ],
    solutions: [
      {
        id: 'integracao-interface-servicos-dados',
        title: 'Integração entre interface, serviços e dados.',
        description: 'O projeto explora a integração entre uma interface de gerenciamento, serviços de processamento e APIs de armazenamento, com foco na consulta de arquivos, organização de metadados e automação de rotinas.',
        status: 'proposed',
        relatedProblemIds: ['organizar-acervos'],
      },
    ],
    architecture: {
      dataFlows: [
        {
          id: 'fluxo-conceitual',
          name: 'Visão conceitual do fluxo',
          description: 'Fluxo apresentado na versão anterior do estudo de caso.',
          steps: ['Pesquisa', 'Organização', 'Processamento', 'Automação'],
        },
      ],
    },
    contributions: [
      { area: 'Interface', description: 'Pesquisa, filtros, visualização de arquivos e navegação pela estrutura do acervo.' },
      { area: 'Integrações', description: 'Comunicação com serviços e APIs para consulta e gerenciamento de informações.' },
      { area: 'Processamento', description: 'Scripts e rotinas voltados à organização de arquivos e tratamento de metadados.' },
      { area: 'Automação', description: 'Execução de tarefas repetitivas e apoio a fluxos de trabalho.' },
      { area: 'Evolução', description: 'Estrutura preparada para novas funcionalidades e integrações.' },
    ],
  },
}
