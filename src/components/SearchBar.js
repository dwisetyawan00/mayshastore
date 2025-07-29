'use client'
import { useState } from 'react'

const popularSuggestions = [
  "Sabun Mandi",
  "Deterjen",
  "Pembersih Lantai",
  "Sabun Cuci Piring",
  "Pewangi Pakaian"
]

export default function SearchBar({ onSearch, placeholder = "Cari produk favorit Anda..." }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
    if (onSearch) onSearch('')
  }

  // Saring suggestion berdasarkan searchTerm jika ingin (bisa skip agar suggestion tetap)
  const filteredSuggestions = searchTerm
    ? popularSuggestions.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    : popularSuggestions

  return (
    <form className="relative" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // biar klik suggestion tetap masuk
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-800 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200/50 border-white/40 shadow-lg hover:border-blue-300"
        autoComplete="off"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* POPULAR SUGGESTION */}
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 z-50 max-h-60 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 px-3 py-2">Pencarian Populer</div>
            {filteredSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchTerm(suggestion)
                  if (onSearch) onSearch(suggestion)
                }}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm text-gray-700"
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Hints */}
      {isFocused && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <div className="inline-flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-1">Enter</kbd>
              untuk cari
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs mr-1">Esc</kbd>
              untuk batal
            </span>
          </div>
        </div>
      )}
    </form>
  )
}
