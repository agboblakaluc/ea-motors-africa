import type { CardProfile, Lang } from './types'

/** Échappement vCard 3.0 (RFC 2426) : \ ; , et retours à la ligne. */
export function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\;')
    .replace(/,/g, '\\,')
}

/** Pliage des lignes à 75 octets max (continuation = CRLF + espace), sans couper un caractère UTF-8. */
export function fold(line: string): string {
  const enc = new TextEncoder()
  if (enc.encode(line).length <= 75) return line
  const out: string[] = []
  let cur = ''
  let curBytes = 0
  let limit = 75
  for (const ch of line) {
    const b = enc.encode(ch).length
    if (curBytes + b > limit) {
      out.push(cur)
      cur = ''
      curBytes = 0
      limit = 74 // l'espace de continuation compte
    }
    cur += ch
    curBytes += b
  }
  out.push(cur)
  return out.join('\r\n ')
}

export function buildVCard(profile: CardProfile, lang: Lang = 'en'): string {
  const { person, parent, entities } = profile
  const note = [parent.name, ...entities.map((e) => e.name)].join(' - ')
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(person.lastName)};${esc(person.firstName)};;;`,
    `FN:${esc(`${person.firstName} ${person.lastName}`)}`,
    `ORG:${esc(person.group)}`,
    `TITLE:${esc(person.title[lang])}`,
    `TEL;TYPE=CELL,WORK,VOICE:${person.phone}`,
    ...person.emails.map((e) => `EMAIL;TYPE=INTERNET,WORK:${e.address}`),
    `URL:${person.website}`,
    `NOTE:${esc(note)}`,
    'END:VCARD',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}
