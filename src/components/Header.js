import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Kiri: Logo + Nama */}
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
              <img
                src="/logo-maysha-removebg.png"
                alt="Maysha Store"
                className="w-full h-full object-contain"
                loading="eager"
                draggable={false}
              />
            </div>
            <div className="ml-2 sm:ml-3 md:ml-4 flex flex-col justify-center min-w-0">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white leading-tight truncate">
                Maysha Store
              </span>
              <span className="text-blue-200 text-xs sm:text-sm leading-tight hidden sm:block">
                Solusi Terpercaya Kebutuhan Rumah Tangga
              </span>
              <span className="text-blue-200 text-xs leading-tight sm:hidden">
                Solusi Terpercaya
              </span>
            </div>
          </div>
          
          {/* Kanan: Dropdown Menu */}
          <div className="relative group">
            <button className="text-white font-semibold py-2 px-3 sm:px-6 rounded hover:bg-indigo-800 transition flex items-center gap-1 focus:outline-none text-sm sm:text-base">
              MENU
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className="absolute right-0 mt-2 hidden group-hover:block group-focus-within:block bg-white min-w-[160px] sm:min-w-[180px] rounded-lg shadow-lg py-2 z-50"
              tabIndex={-1}
            >
              <a
                href="/katalog"
                className="block px-4 py-3 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition rounded text-sm sm:text-base"
              >
                Semua Katalog
              </a>
            </div>
            {/* Tambahkan kategori/menu lain di sini jika perlu */}
          </div>
        </div>
      </div>
    </header>
  )
}