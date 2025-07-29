'use client'
export default function BuyPopup({
  open,
  onClose,
  shopeeLink,
  tokopediaLink,
  waLink,
  shopeeIcon = '/shopee.png',
  tokopediaIcon = '/tokopedia.png',
  waIcon = '/wa.png',
  productName = '', // <--- pastikan diterima dari ProductCard!
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Judul dinamis */}
        <h3 className="text-lg font-bold mb-1 text-gray-900 text-center">
          {productName ? `Mau beli ${productName}?` : 'Mau beli produk ini?'}
        </h3>
        <div className="mb-6 text-sm text-gray-500 text-center">
          Pilih Cara Beli
        </div>
        <div className="flex flex-row justify-center gap-5 mb-5">
          {/* Shopee */}
          <a href={shopeeLink} target="_blank" rel="noopener noreferrer" title="Shopee"
            className="flex flex-col items-center group">
            <span className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow group-hover:scale-110 transition">
              <img src={shopeeIcon} alt="Shopee" className="w-8 h-8 object-contain" />
            </span>
            <span className="mt-1 text-xs text-orange-700 font-semibold">Shopee</span>
          </a>
          {/* Tokopedia */}
          <a href={tokopediaLink} target="_blank" rel="noopener noreferrer" title="Tokopedia"
            className="flex flex-col items-center group">
            <span className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow group-hover:scale-110 transition">
              <img src={tokopediaIcon} alt="Tokopedia" className="w-8 h-8 object-contain" />
            </span>
            <span className="mt-1 text-xs text-green-700 font-semibold">Tokopedia</span>
          </a>
          {/* WhatsApp */}
          <a href={waLink} target="_blank" rel="noopener noreferrer" title="WhatsApp"
            className="flex flex-col items-center group">
            <span className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow group-hover:scale-110 transition">
              <img src={waIcon} alt="WhatsApp" className="w-8 h-8 object-contain" />
            </span>
            <span className="mt-1 text-xs text-green-600 font-semibold">WhatsApp</span>
          </a>
        </div>
        {/* Tombol tutup, opsional */}
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg py-3 font-semibold transition"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  )
}
