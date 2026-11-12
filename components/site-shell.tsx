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
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 851px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  const closeMenu = () => setOpen(false)
  return <header className="site-header" ref={headerRef}><div className="container header-inner"><Link href="/" className="brand" aria-label="Steven Oliveira, início" onClick={closeMenu}><span className="brand-mark">SO</span><span>Steven Oliveira</span></Link><div className="header-controls"><nav id="main-navigation" ref={menuRef} className={open ? 'nav mobile-open' : 'nav'} aria-label="Navegação principal">{nav.map(item => <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''} aria-current={isActive(item.href) ? 'page' : undefined} onClick={closeMenu}>{item.label}</Link>)}<Link href="/contato" className="header-cta" onClick={closeMenu}>Vamos conversar <ArrowUpRight /></Link></nav><div className={open ? 'header-actions theme-control mobile-menu-open' : 'header-actions theme-control'}><span className="mobile-theme-label">Tema</span><ThemeToggle /></div><Link href="/contato" className="mobile-header-cta" onClick={closeMenu}>Vamos conversar</Link><button ref={menuButtonRef} type="button" className="mobile-menu" onClick={() => setOpen(value => !value)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button></div></div></header>
}

export function Footer() {
  const connections = [{ key: 'email' as const, label: 'E-mail', icon: Mail }, { key: 'whatsappNumber' as const, label: 'WhatsApp', icon: MessageCircle }, { key: 'linkedinUrl' as const, label: 'LinkedIn', icon: GitBranch }, { key: 'githubUrl' as const, label: 'GitHub', icon: GitBranch }]
  return <footer className="footer"><div className="container footer-grid"><div><div className="brand"><span className="brand-mark">SO</span><span>Steven Oliveira</span></div><p>Desenvolvimento de software, sistemas e automação.</p></div><div><p className="footer-label">NAVEGAÇÃO</p><nav className="footer-links" aria-label="Navegação do rodapé">{nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div><div><p className="footer-label">CONEXÕES</p><div className="footer-links">{connections.map(({ key, label, icon: Icon }) => { const href = getContactHref(key); return href ? <a key={key} href={href} target={key === 'email' ? undefined : '_blank'} rel="noreferrer"><Icon />{label}</a> : null })}</div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} / Portfólio técnico</span><a href="#top">Voltar ao topo <ArrowUp /></a></div></footer>
}
