'use client'
import { useState, useMemo, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

const LOGO_FILE = 'logo-maysha-removebg.png'
const LOGO_ALT = 'Logo Maysha Store'

const SECTION_DISKON_TITLE = 'Promo Diskon Spesial'
const SECTION_DISKON_COLOR = 'text-orange-700'
const SECTION_DISKON_BUTTON = 'Lihat Promo Lainnya'
const SECTION_REGULAR_TITLE = 'Semua Produk'
const SECTION_REGULAR_COLOR = 'text-gray-800'
const SECTION_REGULAR_BUTTON = 'Lihat Produk Lainnya'

const INITIAL_LOAD = 8
const LOAD_MORE_STEP = 8

export default function Home() {
  const [search, setSearch] = useState('')
  const [visibleDiscountCount, setVisibleDiscountCount] = useState(INITIAL_LOAD)
  const [visibleRegularCount, setVisibleRegularCount] = useState(INITIAL_LOAD)

  const discountProducts = useMemo(() => products.filter(p => p.discount), [])
  const regularProducts = useMemo(() => products.filter(p => !p.discount), [])

  const filteredDiscountProducts = useMemo(() => {
    if (!search) return discountProducts
    return discountProducts.filter(
      p =>
        (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
    )
  }, [discountProducts, search])

  const filteredRegularProducts = useMemo(() => {
    if (!search) return regularProducts
    return regularProducts.filter(
      p =>
        (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
    )
  }, [regularProducts, search])

  useEffect(() => {
    setVisibleDiscountCount(INITIAL_LOAD)
    setVisibleRegularCount(INITIAL_LOAD)
  }, [search])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* HERO & SEARCH */}
      <section className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Produk Unggulan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Temukan berbagai produk kebutuhan harian berkualitas tinggi dengan harga terjangkau, 
            dipercaya oleh ribuan pelanggan di seluruh Indonesia
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={setSearch} />
          </div>
        </div>
      </section>

      {/* SECTION DISKON */}
      {filteredDiscountProducts.length > 0 && (
        <section className="container mx-auto px-6 py-8">
          <h2 className={`text-3xl font-bold mb-6 ${SECTION_DISKON_COLOR}`}>{SECTION_DISKON_TITLE}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDiscountProducts.slice(0, visibleDiscountCount).map((product) => (
              <ProductCard key={product.id} product={product} showDiscountBadge={true} />
            ))}
          </div>
          {visibleDiscountCount < filteredDiscountProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleDiscountCount(v => v + LOAD_MORE_STEP)}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition-all"
              >
                {SECTION_DISKON_BUTTON}
              </button>
            </div>
          )}
        </section>
      )}

      {/* SECTION SEMUA PRODUK */}
      <section className="container mx-auto px-6 py-8">
        <h2 className={`text-3xl font-bold mb-6 ${SECTION_REGULAR_COLOR}`}>{SECTION_REGULAR_TITLE}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRegularProducts.slice(0, visibleRegularCount).map((product) => (
            <ProductCard key={product.id} product={product} showDiscountBadge={false} />
          ))}
        </div>
        {visibleRegularCount < filteredRegularProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleRegularCount(v => v + LOAD_MORE_STEP)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all"
            >
              {SECTION_REGULAR_BUTTON}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
