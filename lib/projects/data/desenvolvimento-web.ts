import type { Project } from '../types'

export const desenvolvimentoWeb: Project = {
  id: '03',
  slug: 'desenvolvimento-web',
  title: 'Desenvolvimento Web',
  category: 'Web',
  status: 'Contínuo',
  description: 'Desenvolvimento de websites e aplicações responsivas, com atenção à experiência de uso, organização do conteúdo e necessidades de cada negócio.',
  technologies: ['React', 'Next.js', 'TypeScript'],
  coverImage: '/projects/web-development.svg',
  gallery: ['/projects/web-development.svg'],
  problem: 'Negócios precisam apresentar informações e serviços com clareza em diferentes dispositivos.',
  solution: 'Interfaces responsivas e organizadas, desenvolvidas a partir do contexto e das necessidades de cada projeto.',
  architecture: ['Componentes reutilizáveis', 'Rotas e conteúdo', 'Layout responsivo'],
  responsibilities: ['Desenvolvimento frontend', 'Organização de conteúdo e interface'],
  outcomes: ['Base para experiências digitais consistentes'],
  links: [],
}
