"use client"

import { Hero } from '@/components/sections/hero'
import { ExecutiveSummary } from '@/components/sections/executive-summary'
import { KeyInsights } from '@/components/sections/key-insights'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ExecutiveSummary />
      <KeyInsights />
    </main>
  )
}