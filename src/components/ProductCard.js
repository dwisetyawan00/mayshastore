'use client'
import { useState, useEffect } from 'react'
import BuyPopup from './BuyPopup'
import CommentSection from './CommentSection'
import useProductComments from '../hooks/useProductComments'
import { useSession } from 'next-auth/react'

function ProductCardContent({
  product,
  comments,
  realRating,
  renderStars,
  formatPrice,
  isAdmin,
  onImageClick,
  showComments,
  setShowComments,
  addComment,
  deleteComment,
  setShowBuy,
  mode = 'grid',
  stockStatus,
}) {
  return (
    <div
      className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-white/20 max-w-xs w-full ${
        mode === 'preview'
          ? 'z-[9999] scale-110 shadow-2xl'
          : 'hover:shadow-2xl'
      }`}
    >
      {/* Badge Populer */}
      {product.isPopular && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            Populer
          </span>
        </div>
      )}

      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Gambar Produk */}
      <div className={`relative aspect-square flex items-center justify-center`}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover cursor-pointer transition-all duration-300`}
          onClick={onImageClick}
          draggable={false}
        />
      </div>

      {/* Konten Produk */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors text-center">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 text-center">{product.description}</p>
        </div>

        {/* Rating dan Ulasan */}
        {realRating && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center mr-2">{renderStars(realRating)}</div>
            <span className="text-sm text-gray-600">
              {realRating} ({comments.length} ulasan)
            </span>
          </div>
        )}

        {/* Harga dan Stok */}
          <div className="flex flex-row items-center gap-2 mb-4 flex-wrap">
            <div suppressHydrationWarning>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
            </div>
            <div className={`
              text-xs px-3 py-1 rounded-full flex-shrink-0 min-w-max
              ${stockStatus.bg} ${stockStatus.text}
            `}>
              {stockStatus.label}
            </div>
          </div>
        {/* Tombol aksi (hanya tampil di grid, tidak di preview/modal) */}
        {mode === 'grid' && (
          <>
            <div className="flex space-x-2">
              {/* Tombol BELI */}
              <button
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
                onClick={() => setShowBuy(true)}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 104 0m4 0a2 2 0 104 0" />
                  </svg>
                  {product.stock === 0 ? 'Habis' : 'Beli'}
                </span>
              </button>
              {/* Tombol KOMENTAR */}
              <button
                className="bg-white border-2 border-gray-200 text-gray-600 font-medium py-3 px-4 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
                onClick={() => setShowComments(v => !v)}
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
            {/* Section Komentar */}
            {showComments && (
              <CommentSection
                productId={product.id}
                comments={comments}
                onAddComment={addComment}
                onDeleteComment={deleteComment}
                isAdmin={isAdmin}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function ProductCard({ product, showDiscountBadge = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showBuy, setShowBuy] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const { comments, addComment, deleteComment } = useProductComments(product.id)
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Modal close via ESC, lock scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showImagePreview) {
        setShowImagePreview(false)
      }
    }
    if (showImagePreview) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }
  }, [showImagePreview])

  // Real-time rating
  const realRating =
    comments && comments.length > 0
      ? (
          comments.reduce((acc, c) => acc + (c.rating || 0), 0) /
          comments.filter(c => c.rating !== undefined).length
        ).toFixed(1)
      : null

  // Format harga
  const formatPrice = (price) => {
    if (!mounted) {
      return `Rp ${price.toLocaleString('id-ID')}`
    }
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp')
  }

  // Render rating bintang
  const renderStars = (rating) => {
    if (!rating) return null
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return stars
  }

  // Cek admin
  const isAdmin = session?.user?.email === "farelyogis7@gmail.com"

  // Stock status label & warna
  const stockStatus =
    product.stock > 10
      ? { label: 'Stok Tersedia', bg: 'bg-green-100', text: 'text-green-600' }
      : product.stock > 0
        ? { label: 'Stok Terbatas', bg: 'bg-yellow-100', text: 'text-yellow-600' }
        : { label: 'Habis', bg: 'bg-red-100', text: 'text-red-600' }

  // Icon marketplace
  const shopeeIcon = '/shopee.png'
  const tokopediaIcon = '/tokopedia.png'
  const waIcon = '/wa.png'

  // WhatsApp link otomatis
  const nomorWA = product.waNumber || '628xxxxxxx'
  const waMessage = encodeURIComponent(`Halo! apakah produk "${product.name}" masih tersedia? saya ingin order`)
  const waLink = `https://wa.me/${nomorWA}?text=${waMessage}`

  return (
    <>
      {/* --- Modal Preview di Tengah (Card satu-satunya) --- */}
      {showImagePreview && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur"
        onClick={() => setShowImagePreview(false)}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-[440px] w-full p-8 flex flex-col items-center"
          onClick={e => e.stopPropagation()}
        >
          {/* Tombol Close */}
          <button
            onClick={() => setShowImagePreview(false)}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 bg-white/70 rounded-full p-2 shadow"
            aria-label="Tutup"
          >
            &times;
          </button>
          {/* Gambar Produk */}
          <img
            src={product.image}
            alt={product.name}
            className="object-contain w-full h-96 mb-6 select-none pointer-events-none"
            draggable={false}
          />
          {/* Nama Produk */}
          <span className="block text-lg font-bold text-gray-700 mt-1 text-center">
            {product.name}
          </span>
        </div>
      </div>
    )}

      {/* --- Card Produk Grid (HANYA jika tidak preview/modal) --- */}
      {!showImagePreview && (
        <ProductCardContent
          product={product}
          comments={comments}
          realRating={realRating}
          renderStars={renderStars}
          formatPrice={formatPrice}
          isAdmin={isAdmin}
          onImageClick={() => setShowImagePreview(true)}
          showComments={showComments}
          setShowComments={setShowComments}
          addComment={addComment}
          deleteComment={deleteComment}
          setShowBuy={setShowBuy}
          mode="grid"
          stockStatus={stockStatus}
        />
      )}

      {/* Pop-up BELI */}
      <BuyPopup
        open={showBuy}
        onClose={() => setShowBuy(false)}
        shopeeLink={product.shopeeLink || '#'}
        tokopediaLink={product.tokopediaLink || '#'}
        waLink={waLink}
        shopeeIcon={shopeeIcon}
        tokopediaIcon={tokopediaIcon}
        waIcon={waIcon}
        productName={product.name}
      />
    </>
  )
}
