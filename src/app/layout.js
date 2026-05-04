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
  title: 'Noventra Visuals — Premium Video Studio',
  description: 'Every frame has a story.',
   icons: {
    icon: '/favicon.ico',
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