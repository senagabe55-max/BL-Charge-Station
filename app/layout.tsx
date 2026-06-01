import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: "swap",
})

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'BL Charge Station | Benefício Exclusivo para Motoristas de App',
  description: 'Motorista de aplicativo? Ganhe desconto especial na recarga do seu veículo elétrico. Cadastre-se e economize nas suas recargas diárias.',
  keywords: 'recarga veículo elétrico, motorista uber, motorista 99, desconto recarga, BL Charge Station, estação de carregamento',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
