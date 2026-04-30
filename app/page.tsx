import { sanityFetch } from '@/lib/sanity'
import {
  SETTINGS_QUERY, HERO_QUERY, STATS_QUERY, APROPOS_QUERY,
  MARQUES_QUERY, DOMAINES_QUERY, EQUIPEMENTS_QUERY,
  VEHICULES_QUERY, FINANCEMENT_QUERY, ENGAGEMENTS_QUERY,
  ATOUTS_QUERY
} from '@/lib/queries'
import type {
  SiteSettings, Hero, Stats, Apropos, Marque,
  Domaine, Equipement, Vehicule, FinancementData,
  EngagementsData, AtoutsData
} from '@/lib/types'

import Loader from '@/components/ui/Loader'
import Navbar from '@/components/sections/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutSection from '@/components/sections/AboutSection'
import DomainesSection from '@/components/sections/DomainesSection'
import EquipementsSection from '@/components/sections/EquipementsSection'
import VehiculesSection from '@/components/sections/VehiculesSection'
import FinancementSection from '@/components/sections/FinancementSection'
import EngagementsSection from '@/components/sections/EngagementsSection'
import AtoutsSection from '@/components/sections/AtoutsSection'
import CtaStrip from '@/components/sections/CtaStrip'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'
import BackToTop from '@/components/ui/BackToTop'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [
    settings, hero, stats, apropos, marques,
    domaines, equipements, vehicules, financement,
    engagements, atouts
  ] = await Promise.all([
    sanityFetch<SiteSettings>(SETTINGS_QUERY).catch(() => null),
    sanityFetch<Hero>(HERO_QUERY).catch(() => null),
    sanityFetch<Stats>(STATS_QUERY).catch(() => null),
    sanityFetch<Apropos>(APROPOS_QUERY).catch(() => null),
    sanityFetch<Marque[]>(MARQUES_QUERY).catch(() => []),
    sanityFetch<Domaine[]>(DOMAINES_QUERY).catch(() => []),
    sanityFetch<Equipement[]>(EQUIPEMENTS_QUERY).catch(() => []),
    sanityFetch<Vehicule[]>(VEHICULES_QUERY).catch(() => []),
    sanityFetch<FinancementData>(FINANCEMENT_QUERY).catch(() => null),
    sanityFetch<EngagementsData>(ENGAGEMENTS_QUERY).catch(() => null),
    sanityFetch<AtoutsData>(ATOUTS_QUERY).catch(() => null),
  ])

  return (
    <>
      <Loader />
      <Navbar settings={settings} />
      <main>
        <HeroSection hero={hero} settings={settings} />
        <StatsSection stats={stats} />
        <AboutSection apropos={apropos} />
        <DomainesSection domaines={domaines ?? []} />
        <EquipementsSection equipements={equipements ?? []} />
        <FinancementSection financement={financement} />
        <VehiculesSection vehicules={vehicules ?? []} />
        <EngagementsSection engagements={engagements} />
        <AtoutsSection atouts={atouts} />
        <CtaStrip settings={settings} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={null} />
      <BackToTop />
    </>
  )
}
