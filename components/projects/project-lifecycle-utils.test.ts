import assert from 'node:assert/strict'
import test from 'node:test'
// @ts-expect-error -- Node's strip-types runner requires the explicit TypeScript extension.
import { findIncidentByReference, formatCivilDate, getIncidentsForVersion, resolveRoadmapDependencies, toAnchorFragment } from './project-lifecycle-utils.ts'
import type { ProductionIncident, ProjectCaseStudy, ProjectVersion, RoadmapItem } from '../../lib/projects/types.ts'

const versions: ProjectVersion[] = [
  {
    version: 'v1.0',
    title: 'Versão publicada',
    status: 'published',
    releasedAt: '2026-11-11',
    fixes: ['incidente-resolvido'],
  },
  { version: 'v1.10', title: 'Versão em desenvolvimento', status: 'in-development' },
  { version: 'v1.2', title: 'Versão planejada sem data', status: 'planned' },
  { version: 'v2.0', title: 'Versão cancelada', status: 'cancelled' },
]

const incidents: ProductionIncident[] = [
  {
    id: 'incidente-resolvido',
    title: 'Ocorrência resolvida',
    description: 'Fixture isolada.',
    status: 'resolved',
    identifiedInVersion: 'v1.0',
    fixedInVersion: 'v1.0',
  },
  {
    id: 'incidente-investigacao',
    title: 'Ocorrência em investigação',
    description: 'Fixture sem causa ou solução.',
    status: 'investigating',
  },
]

const roadmap: RoadmapItem[] = [
  {
    id: 'base',
    title: 'Base sem data',
    description: 'Item independente.',
    status: 'completed',
    commitment: 'committed',
  },
  {
    id: 'dependente',
    title: 'Item com dependências',
    description: 'Depende de uma referência válida e uma ausente.',
    status: 'planned',
    commitment: 'exploratory',
    dependencyIds: ['base', 'referencia-ausente'],
  },
]

const lifecycleFixture = {
  versions,
  incidents,
  roadmap,
} satisfies ProjectCaseStudy

const emptyLifecycleFixture: ProjectCaseStudy = {}

test('formata uma data civil sem deslocamento de fuso', () => {
  assert.equal(formatCivilDate('2026-11-11'), '11 de novembro de 2026')
  assert.equal(formatCivilDate('2026-02-30'), undefined)
  assert.equal(formatCivilDate(), undefined)
})

test('preserva todos os estados de versão na ordem cadastrada', () => {
  assert.deepEqual(
    lifecycleFixture.versions.map((version) => version.status),
    ['published', 'in-development', 'planned', 'cancelled'],
  )
  assert.deepEqual(
    lifecycleFixture.versions.map((version) => version.version),
    ['v1.0', 'v1.10', 'v1.2', 'v2.0'],
  )
  assert.equal(toAnchorFragment('v1.10'), 'v1-10')
})

test('relaciona versões e ocorrências sem duplicar dados', () => {
  assert.equal(findIncidentByReference('incidente-resolvido', incidents)?.status, 'resolved')
  assert.deepEqual(
    getIncidentsForVersion(versions[0], incidents).map((incident) => incident.id),
    ['incidente-resolvido'],
  )
  assert.equal(findIncidentByReference('referencia-ausente', incidents), undefined)
})

test('aceita incidentes e roadmap sem datas e referências ausentes', () => {
  assert.equal(incidents[1].identifiedInVersion, undefined)
  assert.equal(roadmap[0].expectedAt, undefined)

  const dependencies = resolveRoadmapDependencies(roadmap[1], roadmap)
  assert.equal(dependencies[0].item?.title, 'Base sem data')
  assert.equal(dependencies[1].item, undefined)
})

test('aceita projeto sem histórico de ciclo de vida', () => {
  assert.equal(emptyLifecycleFixture.versions, undefined)
  assert.equal(emptyLifecycleFixture.incidents, undefined)
  assert.equal(emptyLifecycleFixture.roadmap, undefined)
})
