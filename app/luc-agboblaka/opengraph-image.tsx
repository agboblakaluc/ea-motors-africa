import { ImageResponse } from 'next/og'
import { profile } from '@/lib/cards/luc-agboblaka'

export const alt = 'Luc Agboblaka — EA HOLDINGS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  const { person, entities } = profile
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '70px 80px', color: '#fff',
          background: 'linear-gradient(135deg, #050d1a 0%, #0F2B5B 60%, #1a4080 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, letterSpacing: 8, color: '#7fb0ff', fontWeight: 700 }}>
          <div style={{ width: 56, height: 6, background: '#2f7bff', display: 'flex' }} />
          <div style={{ display: 'flex' }}>{person.group}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, textTransform: 'uppercase' }}>
            {`${person.firstName} ${person.lastName}`}
          </div>
          <div style={{ fontSize: 40, marginTop: 20, color: '#c8d2de' }}>
            {`${person.title.fr} · ${person.title.en}`}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 24, color: '#dbe6f7' }}>
          {entities.map((e) => (
            <div key={e.id} style={{ display: 'flex', padding: '10px 20px', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 10 }}>
              {e.name}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
