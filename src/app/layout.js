import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import BackToTopButton from '@/components/BackToTopButton'
import SessionProviderLayout from '@/components/SessionProviderLayout'
import LoadingOverlay from '@/components/LoadingOverlay'
import Header from '@/components/Header' // Pastikan ini default export!

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Maysha Store - Solusi Lengkap Kebutuhan Rumah Tangga',
  description: 'Temukan berbagai produk kebutuhan rumah tangga berkualitas tinggi dengan harga terjangkau. Dipercaya oleh ribuan pelanggan di seluruh Indonesia.',
  keywords: 'sabun mandi, deterjen, pembersih lantai, sabun cuci piring, produk rumah tangga, home care',
  authors: [{ name: 'Maysha Store' }],
  creator: 'Maysha Store',
  publisher: 'Maysha Store',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mayshstore.id'),
  alternates: {
    canonical: '/',
    languages: {
      'id-ID': '/id',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Maysha Store - Solusi Lengkap Kebutuhan Rumah Tangga',
    description: 'Temukan berbagai produk kebutuhan rumah tangga berkualitas tinggi dengan harga terjangkau.',
    url: 'https://MayshaStore.id',
    siteName: 'Maysha Store',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Maysha Store - Produk Berkualitas',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maysha Store - Solusi Lengkap Kebutuhan Rumah Tangga',
    description: 'Temukan berbagai produk kebutuhan rumah tangga berkualitas tinggi dengan harga terjangkau.',
    images: ['/images/twitter-image.jpg'],
    creator: '@Maysha Store',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="theme-color" content="#3b82f6" />
        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Maysha Store" />
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Critical CSS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              margin: 0; 
              padding: 0;
              overflow-x: hidden;
            }
            .loading-screen {
              position: fixed;
              inset: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              transition: opacity 0.5s ease-out;
            }
            .loading-screen.hidden {
              opacity: 0;
              pointer-events: none;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`}>
        <SessionProviderLayout>
          <Header />
          <LoadingOverlay />
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:z-[9999] transition-all duration-200"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-1 relative">
              {children}
            </main>
            <Footer />
          </div>
          <BackToTopButton />
          <script dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('performance' in window) {
                window.addEventListener('load', function() {
                  const navigation = performance.getEntriesByType('navigation')[0];
                  if (navigation) {
                    console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                  }
                });
              }
              // Service Worker registration for PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }} />
        </SessionProviderLayout>
        {/* WA Floating Button */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Admin%20saya%20mau%20tanya%20produk"
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center group"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat via WhatsApp"
        >
          <span className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-500 group-hover:scale-110 transition-transform duration-200">
            <img
              src="/wa.png"
              alt="Chat WA"
              className="w-9 h-9 object-contain"
              style={{ filter: 'drop-shadow(0 2px 8px #22c55e33)' }}
              draggable={false}
            />
          </span>
          <span className="mt-2 text-xs font-semibold text-green-700 bg-white/80 px-3 py-1 rounded-full shadow group-hover:bg-green-50 transition-all">
            Call Center
          </span>
        </a>
      </body>
    </html>
  )
}
