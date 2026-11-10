// Génère le QR code permanent (PNG + SVG). Usage : npm run qr
// Le QR encode l'URL de la page, jamais la vCard : les coordonnées restent modifiables.
import QRCode from 'qrcode'
import { mkdirSync, writeFileSync } from 'node:fs'

const URL_ENCODED = process.argv[2] || 'https://eamotorsafrique.com/luc-agboblaka'
const slug = 'luc-agboblaka'
const dir = 'public/assets/qr'
mkdirSync(dir, { recursive: true })

const opts = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#0F2B5B', light: '#FFFFFF' } }
await QRCode.toFile(`${dir}/${slug}.png`, URL_ENCODED, { ...opts, width: 1024 })
writeFileSync(`${dir}/${slug}.svg`, await QRCode.toString(URL_ENCODED, { ...opts, type: 'svg' }))
console.log('QR généré pour', URL_ENCODED)
