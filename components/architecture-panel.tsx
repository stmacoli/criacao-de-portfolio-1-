import { ArrowDown, ArrowRight, Database, Globe, Layers, Workflow } from 'lucide-react'

export function ArchitecturePanel() {
  return <div className="architecture-panel"><div className="panel-top"><span className="mono">SYSTEM / FLOW</span><span className="status-dot">Em construção</span></div><div className="flow"><div className="flow-node accent"><Globe /><span>Interface</span><small>Experiência</small></div><ArrowRight className="flow-arrow" /><div className="flow-node"><Layers /><span>API</span><small>Integração</small></div><ArrowRight className="flow-arrow" /><div className="flow-node"><Workflow /><span>Processamento</span><small>Lógica</small></div><div className="flow-branch"><ArrowDown /><div className="flow-node"><Database /><span>Dados</span><small>Organização</small></div></div></div><div className="panel-note"><span className="note-line" />Da necessidade à solução.</div></div>
}
