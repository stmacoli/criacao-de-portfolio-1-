import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error -- Node's strip-types runner requires the explicit TypeScript extension.
import { filterProjects, getCatalogTechnologies, getProjectTechnologies } from './catalog.ts'
import type { Project } from './types.ts'

function project(id: string, overrides: Partial<Project> = {}): Project {
  return {
    id,
    slug: `projeto-${id}`,
    title: `Projeto ${id}`,
    description: 'Fixture isolada.',
    category: 'Web',
    status: 'Em desenvolvimento',
    technologies: ['React'],
    coverImage: '',
    gallery: [],
    problem: '',
    solution: '',
    architecture: [],
    responsibilities: [],
    outcomes: [],
    links: [],
    ...overrides,
  }
}

const fixtures = [
  project('1', {
    classification: 'professional',
    lifecycleStatus: 'in-production',
    technologies: ['React', ' TypeScript '],
    caseStudy: { technologies: [{ name: 'react' }, { name: 'Next.js' }] },
  }),
  project('2', {
    classification: 'personal',
    category: 'Produtos autorais',
    status: 'Contínuo',
    technologies: [],
  }),
  project('3', {
    classification: 'experimental',
    category: 'Laboratório',
    lifecycleStatus: 'conceptual',
    technologies: ['Python'],
  }),
  project('4', { technologies: [] }),
] satisfies Project[]

test('retorna todos os projetos sem filtros', () => {
  assert.deepEqual(filterProjects(fixtures, {}).map(({ id }) => id), ['1', '2', '3', '4'])
})

test('filtra por classificação', () => {
  assert.deepEqual(filterProjects(fixtures, { classification: 'professional' }).map(({ id }) => id), ['1'])
})

test('filtra por categoria', () => {
  assert.deepEqual(filterProjects(fixtures, { category: 'Laboratório' }).map(({ id }) => id), ['3'])
})

test('filtra por estado novo e legado', () => {
  assert.deepEqual(filterProjects(fixtures, { state: 'lifecycle:in-production' }).map(({ id }) => id), ['1'])
  assert.deepEqual(filterProjects(fixtures, { state: 'legacy:Contínuo' }).map(({ id }) => id), ['2'])
})

test('filtra por tecnologia sem diferenciar caixa', () => {
  assert.deepEqual(filterProjects(fixtures, { technology: 'REACT' }).map(({ id }) => id), ['1'])
})

test('combina filtros com relação E', () => {
  assert.deepEqual(filterProjects(fixtures, {
    classification: 'professional',
    category: 'Web',
    state: 'lifecycle:in-production',
    technology: 'Next.js',
  }).map(({ id }) => id), ['1'])
})

test('retorna coleção vazia quando não há correspondência', () => {
  assert.deepEqual(filterProjects(fixtures, { classification: 'personal', technology: 'Python' }), [])
})

test('mantém projeto sem classificação na consulta sem esse filtro', () => {
  assert.deepEqual(filterProjects(fixtures, {}).map(({ id }) => id), ['1', '2', '3', '4'])
  assert.equal(filterProjects(fixtures, { classification: 'professional' }).some(({ id }) => id === '4'), false)
})

test('aceita projeto sem tecnologias', () => {
  assert.deepEqual(getProjectTechnologies(fixtures[3]), [])
  assert.equal(filterProjects(fixtures, { technology: 'React' }).some(({ id }) => id === '4'), false)
})

test('normaliza tecnologias legadas e detalhadas duplicadas', () => {
  assert.deepEqual(getProjectTechnologies(fixtures[0]), ['React', 'TypeScript', 'Next.js'])
  assert.deepEqual(getCatalogTechnologies(fixtures), ['Next.js', 'Python', 'React', 'TypeScript'])
})
