'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import CommentSection from './CommentSection'
import useProductComments from '../hooks/useProductComments'

export default function ProductDetail({ product }) {
  // State preview modal
  const [showPreview, setShowPreview] = useState(false)
  // State deteksi gambar lebar/besar
  const [isWideImage, setIsWideImage] = useState(false)
  const imageRef = useRef(null)
  const { comments, addComment, deleteComment } = useProductComments(product.id)

  // Format harga ke rupiah
  const formatPrice = (price) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price).replace('IDR', 'Rp')

  // Detect lebar gambar setelah load
  useEffect(() => {
    const img = imageRef.current
    if (!img) return
    if (img.complete) {
      setIsWideImage(img.naturalWidth / img.naturalHeight > 1.3)
    } else {
      img.onload = () => {
        setIsWideImage(img.naturalWidth / img.naturalHeight > 1.3)
      }
    }
    // Cleanup: remove event
    return () => {
      if (img) img.onload = null
    }
  }, [product.image])

  // Fallback WA number
  const waNumber = product.waNumber || '6281234567890'

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 max-w-4xl">
      {/* Tombol kembali */}
      <div className="mb-4 sm:mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:underline hover:text-blue-800 font-medium text-sm touch-manipulation"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[370px,1fr] gap-6 items-start">
                {/* Gambar produk */}
                <div className="flex justify-center">
                  <img
                    ref={imageRef}
                    src={product.image}
                    alt={product.name}
                    onClick={() => setShowPreview(true)}
                    className="w-full max-w-[320px] lg:max-w-[340px] h-auto rounded-lg shadow object-contain bg-gray-50 cursor-zoom-in transition"
                    style={{
                      minHeight: 220,
                      maxHeight: 440,
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Info produk */}
                <div className="flex flex-col justify-start w-full">
                  <div className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                    {product.description}
                  </div>
                  <div className="mb-2">
                    <span className="text-xl sm:text-2xl font-bold text-blue-700 block sm:inline">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-0 sm:ml-2 block sm:inline mt-1 sm:mt-0">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      product.stock > 10
                        ? 'bg-green-100 text-green-700'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 10
                        ? 'Stok Tersedia'
                        : product.stock > 0
                        ? 'Stok Terbatas'
                        : 'Stok Habis'}
                    </span>
                  </div>
                  {/* Area BELI MELALUI, SEKARANG DI SINI */}
                  <div className="mt-6 flex flex-col items-center sm:items-start">
                    <div className="mb-2 text-base font-semibold text-gray-700 text-center sm:text-left">
                      Beli Melalui :
                    </div>
                    <div className="flex flex-row gap-4">
                      {/* Shopee */}
                      {product.shopeeLink && (
                        <a href={product.shopeeLink} target="_blank" rel="noopener noreferrer" title="Shopee">
                          <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
                            <img src="/shopee.png" alt="Shopee" className="w-7 h-7 object-contain" />
                          </span>
                        </a>
                      )}
                      {/* Tokopedia */}
                      {product.tokopediaLink && (
                        <a href={product.tokopediaLink} target="_blank" rel="noopener noreferrer" title="Tokopedia">
                          <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
                            <img src="/tokopedia.png" alt="Tokopedia" className="w-7 h-7 object-contain" />
                          </span>
                        </a>
                      )}
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo! apakah produk "${product.name}" masih tersedia? saya ingin order`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                      >
                        <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition">
                          <img src="/wa.png" alt="WhatsApp" className="w-7 h-7 object-contain" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

        {/* Komentar & rating */}
        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Ulasan & Komentar</h2>
          <CommentSection
            productId={product.id}
            comments={comments}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
            isAdmin={false}
          />
        </div>
      </div>

      {/* Modal Preview Gambar */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-h-full max-w-full">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-xl object-contain"
            />
            {/* Tombol close */}
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition touch-manipulation"
              aria-label="Tutup preview"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
