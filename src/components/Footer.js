'use client'
import Image from 'next/image'
import Link from 'next/link'

const LOGO_FILE = 'logo-maysha-removebg.png'
const LOGO_ALT = 'Logo Maysha Store'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white text-sm">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src={`/${LOGO_FILE}`}
                  alt={LOGO_ALT}
                  width={64}
                  height={64}
                  className="w-14 h-14 object-contain"
                  priority
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Maysha Store</h3>
                <p className="text-blue-200 text-sm mt-1">Solusi Terpercaya Kebutuhan Rumah Tangga</p>
              </div>
            </div>
            <p className="text-gray-300 mb-2 leading-relaxed text-[15px]">
              Produk kebutuhan rumah tangga berkualitas & harga terjangkau.<br />
              Dipercaya ribuan keluarga Indonesia sejak 2020.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition">Beranda</Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-white transition">Produk</Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition">Kontak</Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold mb-3">Hubungi Kami</h4>
            <div className="mb-2 flex items-center gap-2">
              <span className="w-7 h-7 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.52 3.48A11.92 11.92 0 0012.05 0C5.39 0 0 5.39 0 12.05a12 12 0 001.62 6.1l-1.7 6.2 6.35-1.66A12.13 12.13 0 0012.05 24c6.66 0 12.05-5.39 12.05-12.05 0-3.21-1.24-6.21-3.53-8.47zm-8.47 19.04c-1.92 0-3.8-.5-5.44-1.44l-.38-.23-3.78.99 1-3.7-.25-.38A10.06 10.06 0 012.01 12.05c0-5.54 4.5-10.04 10.04-10.04 2.68 0 5.2 1.05 7.1 2.96a10.04 10.04 0 012.94 7.08c.01 5.54-4.49 10.04-10.04 10.04zm5.11-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.6.14-.17.28-.68.89-.84 1.07-.15.18-.31.2-.59.07-.28-.14-1.18-.43-2.25-1.38-.83-.73-1.4-1.63-1.56-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.15.19-.26.28-.43.09-.18.04-.34-.02-.48-.07-.14-.6-1.44-.82-1.98-.22-.53-.45-.46-.6-.47-.16 0-.34 0-.52 0-.18 0-.47.07-.71.34-.24.28-.93.91-.93 2.23 0 1.32.96 2.6 1.09 2.77.13.17 1.89 2.89 4.61 3.93.65.23 1.15.37 1.54.47.65.16 1.25.14 1.72.09.52-.06 1.65-.67 1.89-1.31.24-.63.24-1.17.17-1.31-.07-.14-.26-.22-.54-.35z"/>
                </svg>
              </span>
              <a
                href="https://wa.me/6281234567890"
                className="hover:text-green-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                +62 812-3456-7890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <a
                href="mailto:info@mayshastore.id"
                className="hover:text-purple-400 transition"
              >
                info@mayshastore.id
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Maysha Store. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Kebijakan Privasi</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Syarat &amp; Ketentuan</Link>
            <Link href="/bantuan" className="text-gray-400 hover:text-white transition">Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
