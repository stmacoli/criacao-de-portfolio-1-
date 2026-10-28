'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X, Mail, MessageCircle, GitBranch, ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ThemeToggle } from './theme-toggle'
import { getContactHref, siteConfig } from '@/lib/site-config'

const nav = [{ href: '/', label: 'Início' }, { href: '/projetos', label: 'Projetos' }, { href: '/sobre', label: 'Sobre' }, { href: '/contato', label: 'Contato' }]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { if (!open) return; const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey) }, [open])
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="Steven Oliveira, início"><span className="brand-mark">SO</span><span>Steven Oliveira</span></Link><nav id="main-navigation" ref={menuRef} className={open ? 'nav mobile-open' : 'nav'} aria-label="Navegação principal">{nav.map(item => <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>)}<Link href="/contato" className="header-cta">Vamos conversar <ArrowUpRight /></Link></nav><div className="header-actions"><ThemeToggle /><button className="mobile-menu" onClick={() => setOpen(value => !value)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button></div></div></header>
}

export function Footer() {
  const connections = [{ key: 'email' as const, label: 'E-mail', icon: Mail }, { key: 'whatsappNumber' as const, label: 'WhatsApp', icon: MessageCircle }, { key: 'linkedinUrl' as const, label: 'LinkedIn', icon: GitBranch }, { key: 'githubUrl' as const, label: 'GitHub', icon: GitBranch }]
  return <footer className="footer"><div className="container footer-grid"><div><div className="brand"><span className="brand-mark">SO</span><span>Steven Oliveira</span></div><p>Desenvolvimento de software, sistemas e automação.</p></div><div><p className="footer-label">NAVEGAÇÃO</p><nav className="footer-links" aria-label="Navegação do rodapé">{nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div><div><p className="footer-label">CONEXÕES</p><div className="footer-links">{connections.map(({ key, label, icon: Icon }) => { const href = getContactHref(key); return href ? <a key={key} href={href} target={key === 'email' ? undefined : '_blank'} rel="noreferrer"><Icon />{label}</a> : null })}</div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} / Portfólio técnico</span><a href="#top">Voltar ao topo <ArrowUp /></a></div></footer>
}
