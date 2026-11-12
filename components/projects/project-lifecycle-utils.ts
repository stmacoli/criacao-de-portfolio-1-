import type {
  ProductionIncident,
  ProjectVersion,
  RoadmapItem,
} from '@/lib/projects'

const civilDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/

export function formatCivilDate(value?: string) {
  if (!value) return undefined

  const match = civilDatePattern.exec(value)
  if (!match) return undefined

  const [, yearText, monthText, dayText] = match
  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  const date = new Date(Date.UTC(year, month - 1, day))

  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return undefined
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export function toAnchorFragment(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function findIncidentByReference(
  reference: string,
  incidents: readonly ProductionIncident[],
) {
  return incidents.find((incident) => incident.id === reference)
}

export function getIncidentsForVersion(
  version: ProjectVersion,
  incidents: readonly ProductionIncident[],
) {
  return incidents.filter((incident) =>
    incident.identifiedInVersion === version.version
    || incident.fixedInVersion === version.version
    || version.fixes?.includes(incident.id),
  )
}

export interface ResolvedRoadmapDependency {
  id: string
  item?: RoadmapItem
}

export function resolveRoadmapDependencies(
  item: RoadmapItem,
  roadmap: readonly RoadmapItem[],
): ResolvedRoadmapDependency[] {
  return (item.dependencyIds ?? []).map((id) => ({
    id,
    item: roadmap.find((candidate) => candidate.id === id),
  }))
}
