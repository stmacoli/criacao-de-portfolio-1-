export const siteConfig = {
  name: 'Steven Oliveira',
  professionalTitle: 'Desenvolvimento de Software | Análise de Sistemas | Automação de Processos',
  email: '',
  whatsappNumber: '',
  whatsappMessage: 'Olá, Steven! Encontrei seu portfólio e gostaria de conversar sobre uma oportunidade ou projeto.',
  linkedinUrl: '',
  githubUrl: '',
  resumeUrl: '',
} as const

export function getContactHref(type: keyof typeof siteConfig) {
  const value = siteConfig[type]
  if (!value || typeof value !== 'string') return null
  if (type === 'email') return `mailto:${value}`
  if (type === 'whatsappNumber') return `https://wa.me/${value.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
  return value
}
