"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Network, DollarSign, Globe } from 'lucide-react'

export function KeyInsights() {
  const insights = [
    {
      icon: BarChart3,
      title: "Market Share Analysis",
      description: "Detailed breakdown of Riedel's position in broadcast, live events, and enterprise markets",
      metrics: ["65% Live Events", "45% Broadcast", "25% Enterprise"],
      color: "blue"
    },
    {
      icon: Network,
      title: "Product Portfolio",
      description: "Comprehensive analysis of MediorNet, Artist, Bolero, and optical product lines",
      metrics: ["12G-SDI SFPs", "CWDM Solutions", "Fiber Systems"],
      color: "green"
    },
    {
      icon: DollarSign,
      title: "Pricing Strategy",
      description: "Premium positioning creates opportunities for competitive alternatives",
      metrics: ["30-50% Premium", "Bundle Focus", "Limited Flexibility"],
      color: "purple"
    },
    {
      icon: Globe,
      title: "Go-to-Market",
      description: "Channel strategy analysis and customer segment breakdown",
      metrics: ["Direct Sales", "Authorized Resellers", "OEM Partnerships"],
      color: "orange"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Key Market Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep dive into Riedel's competitive positioning and strategic opportunities for ProLabs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${getColorClasses(insight.color)}`}>
                    <insight.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {insight.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
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
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Explore the Full Analysis?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Access detailed competitive intelligence, interactive opportunity matrix, 
            and strategic recommendations tailored for ProLabs leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              View Full Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Schedule Strategy Session
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}