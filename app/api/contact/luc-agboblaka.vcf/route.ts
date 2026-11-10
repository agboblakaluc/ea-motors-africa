import { NextRequest } from 'next/server'
import { profile } from '@/lib/cards/luc-agboblaka'
import { buildVCard } from '@/lib/cards/vcard'

// Statique par défaut ; ?lang=fr bascule la fonction en français (rend la route dynamique).
export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') === 'fr' ? 'fr' : 'en'
  return new Response(buildVCard(profile, lang), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${profile.person.slug}.vcf"`,
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
