import type { Metadata } from 'next'
import './globals.css'
import { Footer, Header } from '@/components/site-shell'

export const metadata: Metadata = { title: 'Steven Oliveira — Software, Sistemas e Automação', description: 'Portfólio profissional de Steven Oliveira, com atuação em desenvolvimento de software, análise de sistemas e automação de processos.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body><Header />{children}<Footer /></body></html> }
