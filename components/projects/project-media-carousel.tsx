'use client'

import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react'
import type { ProjectMedia } from '@/lib/projects'

type MediaDevice = NonNullable<ProjectMedia['device']>

interface ProjectMediaCarouselProps {
  media: readonly ProjectMedia[]
  projectTitle: string
}

const deviceLabels: Record<MediaDevice, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
}

export function ProjectMediaCarousel({
  media,
  projectTitle,
}: ProjectMediaCarouselProps) {
  const groupedMedia = useMemo(() => ({
    desktop: media.filter((item) => item.device === 'desktop'),
    mobile: media.filter((item) => item.device === 'mobile'),
  }), [media])
  const availableDevices = (['desktop', 'mobile'] as const).filter(
    (device) => groupedMedia[device].length,
  )
  const initialDevice = availableDevices.includes('desktop')
    ? 'desktop'
    : availableDevices[0]
  const [device, setDevice] = useState<MediaDevice>(initialDevice ?? 'desktop')
  const [indices, setIndices] = useState<Record<MediaDevice, number>>({
    desktop: 0,
    mobile: 0,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | undefined>(undefined)
  const didSwipe = useRef(false)
  const items = groupedMedia[device]
  const currentIndex = Math.min(indices[device], Math.max(items.length - 1, 0))
  const current = items[currentIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || !lightboxOpen) return

    const previousOverflow = document.body.style.overflow
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [lightboxOpen])

  if (!current) return null

  function selectDevice(nextDevice: MediaDevice) {
    setDevice(nextDevice)
    setIndices((currentIndices) => ({ ...currentIndices, [nextDevice]: 0 }))
  }

  function move(direction: -1 | 1) {
    if (items.length < 2) return
    setIndices((currentIndices) => ({
      ...currentIndices,
      [device]: (currentIndex + direction + items.length) % items.length,
    }))
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    }
  }

  function handleTouchStart(event: TouchEvent) {
    touchStartX.current = event.changedTouches[0]?.clientX
  }

  function handleTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0]?.clientX
    if (touchStartX.current === undefined || endX === undefined) return
    const distance = endX - touchStartX.current
    touchStartX.current = undefined
    if (Math.abs(distance) < 45) return
    didSwipe.current = true
    move(distance > 0 ? -1 : 1)
  }

  function openLightbox(trigger: HTMLButtonElement) {
    openerRef.current = trigger
    setLightboxOpen(true)
  }

  function closeLightbox() {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
  }

  function restoreFocus() {
    setLightboxOpen(false)
    requestAnimationFrame(() => openerRef.current?.focus())
  }

  const imageWidth = current.width ?? (device === 'mobile' ? 722 : 1910)
  const imageHeight = current.height ?? (device === 'mobile' ? 1600 : 943)
  const positionLabel = `${currentIndex + 1} de ${items.length}`

  return (
    <section
      className={'project-media-carousel'}
      aria-label={`Imagens do projeto ${projectTitle}`}
      onKeyDown={handleKeyDown}
    >
      <div className={'media-carousel-toolbar'}>
        {availableDevices.length > 1 ? (
          <div className={'media-device-selector'} role={'group'} aria-label={'Formato das capturas'}>
            {availableDevices.map((availableDevice) => (
              <button
                key={availableDevice}
                type={'button'}
                className={device === availableDevice ? 'active' : ''}
                aria-pressed={device === availableDevice}
                onClick={() => selectDevice(availableDevice)}
              >
                {deviceLabels[availableDevice]}
              </button>
            ))}
          </div>
        ) : (
          <span className={'mono media-device-label'}>{deviceLabels[device]}</span>
        )}
        <span className={'mono media-position'} aria-live={'polite'}>{positionLabel}</span>
      </div>

      <div className={'media-carousel-stage'} data-device={device}>
        <button
          type={'button'}
          className={'media-expand'}
          aria-label={`Ampliar: ${current.title ?? current.alt}`}
          onClick={(event) => {
            if (didSwipe.current) {
              didSwipe.current = false
              return
            }
            openLightbox(event.currentTarget)
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={imageWidth}
            height={imageHeight}
            loading={device === initialDevice && currentIndex === 0 ? 'eager' : 'lazy'}
            fetchPriority={device === initialDevice && currentIndex === 0 ? 'high' : 'auto'}
            decoding={'async'}
          />
          <span className={'media-expand-hint'}><Expand aria-hidden /> Ampliar</span>
        </button>
      </div>

      <div className={'media-carousel-footer'}>
        <div className={'media-caption'} aria-live={'polite'}>
          {current.title && <strong>{current.title}</strong>}
          {current.caption && <p>{current.caption}</p>}
        </div>
        {items.length > 1 && (
          <div className={'media-carousel-controls'}>
            <button type={'button'} onClick={() => move(-1)} aria-label={'Imagem anterior'}>
              <ArrowLeft aria-hidden />
            </button>
            <button type={'button'} onClick={() => move(1)} aria-label={'Próxima imagem'}>
              <ArrowRight aria-hidden />
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className={'media-lightbox'}
        aria-label={`Visualização ampliada de ${projectTitle}`}
        onClose={restoreFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox()
        }}
        onKeyDown={(event) => {
          event.stopPropagation()
          handleKeyDown(event)
        }}
      >
        <div className={'media-lightbox-content'}>
          <div className={'media-lightbox-toolbar'}>
            <div>
              <strong>{current.title ?? projectTitle}</strong>
              <span className={'mono'}>{deviceLabels[device]} · {positionLabel}</span>
            </div>
            <button type={'button'} onClick={closeLightbox} aria-label={'Fechar imagem ampliada'}>
              <X aria-hidden />
            </button>
          </div>
          <div className={'media-lightbox-image'} data-device={device}>
            <img
              src={current.src}
              alt={current.alt}
              width={imageWidth}
              height={imageHeight}
              decoding={'async'}
            />
          </div>
          {current.caption && <p>{current.caption}</p>}
          {items.length > 1 && (
            <div className={'media-lightbox-controls'}>
              <button type={'button'} onClick={() => move(-1)}>
                <ArrowLeft aria-hidden /> Anterior
              </button>
              <button type={'button'} onClick={() => move(1)}>
                Próxima <ArrowRight aria-hidden />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </section>
  )
}
