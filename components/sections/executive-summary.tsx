"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertTriangle, Target, Users } from 'lucide-react'

export function ExecutiveSummary() {
  const keyFindings = [
    {
      icon: TrendingUp,
      title: "Market Leadership",
      description: "Riedel dominates live events and broadcast markets with integrated solutions",
      status: "strength",
      impact: "High"
    },
    {
      icon: AlertTriangle,
      title: "Premium Pricing",
      description: "Higher cost structure creates opportunity for ProLabs' competitive pricing",
      status: "opportunity",
      impact: "Medium"
    },
    {
      icon: Target,
      title: "Specialized Focus",
      description: "Heavy focus on video SFPs leaves gaps in general networking applications",
      status: "opportunity",
      impact: "High"
    },
    {
      icon: Users,
      title: "Channel Strategy",
      description: "Bundled solutions approach limits individual component sales",
      status: "opportunity",
      impact: "Medium"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Executive Summary
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key insights from our comprehensive analysis of Riedel Communications' 
            market position, product strategy, and competitive landscape
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {keyFindings.map((finding, index) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    finding.status === 'strength' ? 'bg-green-100' :
                    finding.status === 'opportunity' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    <finding.icon className={`h-6 w-6 ${
                      finding.status === 'strength' ? 'text-green-600' :
                      finding.status === 'opportunity' ? 'text-blue-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{finding.title}</h3>
                      <Badge variant={finding.status === 'strength' ? 'default' : 'secondary'}>
                        {finding.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-gray-600">{finding.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Recommendation</h3>
          <p className="text-lg text-gray-700 mb-6">
            ProLabs should leverage its cost-effective manufacturing and broad compatibility 
            to target Riedel's underserved market segments, particularly in general networking 
            applications and price-sensitive customer segments.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-600">Cost Leadership</Badge>
            <Badge className="bg-green-600">Market Expansion</Badge>
            <Badge className="bg-purple-600">Product Differentiation</Badge>
          </div>
        </motion.div>
      </div>
    </section>
  )
}