import { Space_Grotesk } from 'next/font/google'
import './globals.css'

// Import your new components (make sure the folder path matches where you saved them)
import BackgroundOrbs from './component/BackgroundOrbs'
import CustomCursor from './component/CustomCursor'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  // Basic
  title: 'Noventra Visuals — Premium Video Production for Brands & Creators',
  description: 'Noventra Visuals is India\'s premier video production company and creator marketplace. We help startups and brands create stunning brand films, reels, and digital content. Connect with elite video editors globally.',
  keywords: [
    'Noventra Visuals',
    'Noventra',
    'video production India',
    'brand films India',
    'hire video editors India',
    'video editing agency',
    'creator marketplace India',
    'video production for startups',
    'social media video production',
    'video editors for brands',
  ],

  // Open Graph (WhatsApp / LinkedIn / Facebook preview)
  openGraph: {
    title: 'Noventra Visuals — Premium Video Production for Brands & Creators',
    description: 'India\'s premier video production company and creator marketplace for startups and brands.',
    url: 'https://noventravisuals.in',
    siteName: 'Noventra Visuals',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://noventravisuals.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Noventra Visuals — Premium Video Production',
      }
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: 'Noventra Visuals — Premium Video Production',
    description: 'India\'s premier video production company and creator marketplace.',
    images: ['https://noventravisuals.in/og-image.jpg'],
  },

  // Canonical URL
  alternates: {
    canonical: 'https://noventravisuals.in',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
  },

  // Verification
  verification: {
    google: 'paste-your-search-console-code-here',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Added Tailwind classes for your dark void background and text colors */}
      <body className={`${spaceGrotesk.className} bg-[#050508] text-[#F0F0FA]`}>
        
        {/* Global Premium Effects */}
        <BackgroundOrbs />
        <CustomCursor />
        
        {/* Page Content */}
        {children}
      </body>
    </html>
  )
}