import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
// @ts-expect-error -- Node's strip-types runner requires the explicit TypeScript extension.
import { studioZileideRocha } from './studio-zileide-rocha.ts'
// @ts-expect-error -- Node's strip-types runner requires the explicit TypeScript extension.
import { filterProjects, getProjectTechnologies } from '../catalog.ts'

test('cadastra o case profissional com a rota e os estados corretos', () => {
  assert.equal(studioZileideRocha.slug, 'studio-zileide-rocha')
  assert.equal(studioZileideRocha.classification, 'professional')
  assert.equal(studioZileideRocha.category, 'Web')
  assert.equal(studioZileideRocha.lifecycleStatus, 'in-production')
  assert.equal(studioZileideRocha.publicationStatus, 'production')
})

test('aparece nos filtros profissionais, Web, produção e tecnologias', () => {
  assert.equal(filterProjects([studioZileideRocha], {
    classification: 'professional',
    category: 'Web',
    state: 'lifecycle:in-production',
    technology: 'Next.js 16.2',
  }).length, 1)
  assert.ok(getProjectTechnologies(studioZileideRocha).includes('Cloudflare Pages'))
})

test('preserva datas, histórico e itens exploratórios com mídia real', () => {
  const caseStudy = studioZileideRocha.caseStudy
  assert.equal(caseStudy?.versions?.[0].releasedAt, '2026-11-11')
  assert.equal(caseStudy?.versions?.[1].releasedAt, '2026-11-12')
  assert.equal(caseStudy?.incidents?.length, 7)
  assert.equal(caseStudy?.roadmap?.every((item) => item.commitment === 'exploratory'), true)
  const media = caseStudy?.media ?? []
  assert.equal(media.length, 13)
  assert.equal(media.filter((item) => item.device === 'desktop').length, 5)
  assert.equal(media.filter((item) => item.device === 'mobile').length, 8)
  assert.equal(new Set(media.map((item) => item.src)).size, 13)
  assert.equal(media.every((item) =>
    existsSync(join(process.cwd(), 'public', item.src.slice(1))),
  ), true)
  assert.equal(studioZileideRocha.coverImage, '/studio_zileide_rocha/pc-hero.png')
  assert.deepEqual(studioZileideRocha.gallery, [])
})

test('não apresenta base preexistente como resultado do site', () => {
  const results = studioZileideRocha.caseStudy?.results ?? []
  assert.equal(results.some((result) => result.value === 800), false)
  assert.match(studioZileideRocha.caseStudy?.context ?? '', /não representa clientes conquistados pelo site/)
})

test('mantém pendências externas como ocorrências não resolvidas', () => {
  const incidents = studioZileideRocha.caseStudy?.incidents ?? []
  assert.equal(incidents.find(({ id }) => id === 'instagram-footer')?.status, 'identified')
  assert.equal(incidents.find(({ id }) => id === 'instagram-target')?.status, 'identified')
  assert.equal(incidents.find(({ id }) => id === 'destino-google-maps')?.status, 'monitoring')
})
