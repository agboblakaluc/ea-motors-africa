'use client'

import { useEffect, useRef, useState } from 'react'
import type { CardProfile, Lang } from '@/lib/cards/types'
import { strings } from '@/lib/cards/i18n'
import { vcfPath, qrPngPath, whatsappUrl } from '@/lib/cards/luc-agboblaka'
import { Icon } from './icons'
import styles from './card.module.css'

const STORAGE_KEY = 'ea-card-lang'

export default function DigitalCard({ profile, cardUrl }: { profile: CardProfile; cardUrl: string }) {
  const { person, parent, entities } = profile
  const [lang, setLang] = useState<Lang>('fr')
  const [toast, setToast] = useState('')
  const [qrOpen, setQrOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const t = strings[lang]
  const fullName = `${person.firstName} ${person.lastName}`

  // Langue initiale : ?lang=xx > choix mémorisé > français
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('lang')
      const saved = localStorage.getItem(STORAGE_KEY)
      const pick = [q, saved].find((v) => v === 'fr' || v === 'en') as Lang | undefined
      if (pick) setLang(pick)
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(STORAGE_KEY, lang) } catch {}
  }, [lang])

  useEffect(() => {
    if (!qrOpen) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setQrOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [qrOpen])

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl)
      flash(t.copied)
    } catch {
      flash(t.copyFailed)
    }
  }

  const share = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${fullName} — ${person.group}`,
          text: `${fullName} · ${person.title[lang]} · ${person.group}`,
          url: cardUrl,
        })
        return
      } catch (e) {
        if ((e as Error).name === 'AbortError') return
      }
    }
    await copyLink()
  }

  const phoneDisplay = person.phone.replace(/^(\+228)(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.langBar} role="group" aria-label={t.lang}>
          {(['fr', 'en'] as Lang[]).map((l, i) => (
            <span key={l}>
              {i > 0 && <span className={styles.sep} aria-hidden="true">|</span>}
              <button
                type="button"
                lang={l}
                className={`${styles.langBtn} ${lang === l ? styles.langOn : ''}`}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </div>

        <header className={styles.header}>
          <p className={styles.brand}>{person.group}</p>
          <h1 className={styles.name}>{fullName.toUpperCase()}</h1>
          <p className={styles.role}>{person.title[lang]}</p>
        </header>

        <div className={styles.actions}>
          <a className={styles.action} href={`tel:${person.phone}`}>
            <Icon name="phone" /> <span>{t.call}</span>
          </a>
          <a className={`${styles.action} ${styles.wa}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> <span>{t.whatsapp}</span>
          </a>
          <a className={styles.action} href={`mailto:${person.emails[0].address}`}>
            <Icon name="mail" /> <span>{t.email}</span>
          </a>
        </div>

        <a className={styles.save} href={`${vcfPath}?lang=${lang}`} download>
          <Icon name="download" /> {t.save}
        </a>

        <section className={styles.panel} aria-labelledby="contact-h">
          <h2 id="contact-h" className={styles.h2}>{t.contact}</h2>
          <ul className={styles.list}>
            <li>
              <a href={`tel:${person.phone}`} className={styles.row}>
                <span className={styles.ico}><Icon name="phone" /></span>
                <span><small>{t.phone}</small><strong>{phoneDisplay}</strong></span>
              </a>
            </li>
            {person.emails.map((e) => (
              <li key={e.address}>
                <a href={`mailto:${e.address}`} className={styles.row}>
                  <span className={styles.ico}><Icon name="mail" /></span>
                  <span><small>{e.label[lang]}</small><strong>{e.address}</strong></span>
                </a>
              </li>
            ))}
            <li>
              <a href={person.website} target="_blank" rel="noopener noreferrer" className={styles.row}>
                <span className={styles.ico}><Icon name="globe" /></span>
                <span><small>{t.website}</small><strong>{person.website.replace(/^https?:\/\//, '')}</strong></span>
              </a>
            </li>
            {person.socials?.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.row}>
                  <span className={styles.ico}><Icon name="link" /></span>
                  <span><strong>{s.label}</strong></span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="group-h">
          <h2 id="group-h" className={styles.h2}>{t.group}</h2>
          <div className={styles.parent}>
            <span className={styles.ico}><Icon name="building" /></span>
            <span><small>{t.parentTag}</small><strong>{parent.name}</strong></span>
          </div>
          <h3 className={styles.h3}>{t.companies}</h3>
          <ul className={styles.entities}>
            {entities.map((e) => (
              <li key={e.id} className={styles.entity}>
                <span className={styles.ico}><Icon name="building" /></span>
                <span className={styles.entityBody}>
                  <strong>{e.name}</strong>
                  {e.description && <small>{e.description[lang]}</small>}
                </span>
                {e.website && (
                  <a href={e.website} target="_blank" rel="noopener noreferrer" aria-label={`${e.name} — ${t.website}`} className={styles.ext}>
                    <Icon name="link" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.shareRow}>
          <button type="button" className={styles.share} onClick={share}>
            <Icon name="share" /> {t.share}
          </button>
          <button type="button" className={styles.qrBtn} onClick={() => setQrOpen(true)} aria-label={t.qrTitle} aria-haspopup="dialog">
            <Icon name="qr" />
          </button>
        </div>
      </div>

      {qrOpen && (
        <div className={styles.overlay} onClick={() => setQrOpen(false)}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label={t.qrTitle} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.mTitle}>{t.qrTitle}</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrPngPath} alt={`QR code — ${cardUrl}`} width={220} height={220} className={styles.qr} />
            <p className={styles.mHint}>{t.qrHint}</p>
            <p className={styles.mUrl}>{cardUrl.replace(/^https?:\/\//, '')}</p>
            <a className={styles.mBtn} href={qrPngPath} download="luc-agboblaka-qr.png"><Icon name="download" /> {t.qrDownload}</a>
            <button type="button" className={styles.mBtn2} onClick={copyLink}>{t.copyLink}</button>
            <button ref={closeRef} type="button" className={styles.mClose} onClick={() => setQrOpen(false)}>{t.close}</button>
          </div>
        </div>
      )}

      <div className={styles.toast} role="status" aria-live="polite">{toast}</div>
    </main>
  )
}
