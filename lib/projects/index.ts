import { audioMarketPlus } from './data/audio-market-plus'
import { desenvolvimentoWeb } from './data/desenvolvimento-web'
import { dropboxManager } from './data/dropbox-manager'
import { laboratorio } from './data/laboratorio'
import { studioZileideRocha } from './data/studio-zileide-rocha'
import type { Project } from './types'

/** Ordem de apresentação preservada como parte do contrato da interface. */
export const projects: Project[] = [
  dropboxManager,
  audioMarketPlus,
  desenvolvimentoWeb,
  laboratorio,
  studioZileideRocha,
]

export * from './queries'
export * from './catalog'
export type * from './types'
