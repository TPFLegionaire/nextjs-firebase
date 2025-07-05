import Link from 'next/link'
import { Shield, Mail, Globe, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="font-bold">ProLabs Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Strategic competitive analysis for fiber optics and networking industry leaders.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Analysis</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/analysis" className="hover:text-blue-600">Riedel Overview</Link></li>
              <li><Link href="/analysis#products" className="hover:text-blue-600">Product Portfolio</Link></li>
              <li><Link href="/analysis#market" className="hover:text-blue-600">Market Position</Link></li>
              <li><Link href="/opportunity-matrix" className="hover:text-blue-600">Opportunity Matrix</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-600">About ProLabs</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600">Industry Insights</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://prolabs.com" className="text-muted-foreground hover:text-blue-600">
                <Globe className="h-5 w-5" />
              </a>
              <a href="mailto:manuel.boissiere@producthelpdesk.net" className="text-muted-foreground hover:text-blue-600">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ProLabs. All rights reserved. Confidential strategic analysis.</p>
        </div>
      </div>
    </footer>
  )
}