import Link from 'next/link'
import { products } from '@/data/products'

export const metadata = {
  title: 'Katalog Produk - Maysha Store'
}

export default function KatalogPage() {
  // Debug: log products untuk memastikan data ter-load
  console.log('Products loaded:', products)
  
  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-10 max-w-7xl">
      <div className="mb-4 sm:mb-5">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:underline hover:text-blue-800 font-medium text-sm">
          <span className="mr-1 text-base">←</span> Kembali ke Beranda
        </Link>
      </div>
      
      <h1 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4 sm:mb-6">Katalog Produk</h1>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow border p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                {product.id}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                product.stock === 0 
                  ? 'bg-red-100 text-red-800' 
                  : product.stock <= 5 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {product.stock === 0 ? 'Habis' : `${product.stock} unit`}
              </span>
            </div>
            
            <Link 
              href={`/katalog/${product.id}`} 
              className="block font-medium text-indigo-700 hover:text-indigo-900 hover:underline transition-colors duration-200 mb-3"
            >
              {product.name}
            </Link>
            
            <div className="flex flex-col gap-1">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="line-through text-gray-400 text-xs">
                    Rp {Number(product.originalPrice).toLocaleString('id-ID')}
                  </span>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                    -{product.discount}%
                  </span>
                </div>
              )}
              <span className="text-base font-semibold text-indigo-900">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow border bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50 text-indigo-700">
              <th className="py-3 px-3 lg:px-5 text-left font-semibold">No</th>
              <th className="py-3 px-3 lg:px-5 text-left font-semibold">Nama Produk</th>
              <th className="py-3 px-3 lg:px-5 text-left font-semibold">Harga</th>
              <th className="py-3 px-3 lg:px-5 text-left font-semibold">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              // Debug: log setiap product
              console.log(`Product ${idx + 1}:`, {
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock
              })
              
              return (
                <tr key={product.id} className="border-t hover:bg-indigo-50/40">
                  {/* Kolom No */}
                  <td className="py-3 px-3 lg:px-5 text-gray-900 font-medium">
                    {product.id}
                  </td>
                  
                  {/* Kolom Nama Produk */}
                  <td className="py-3 px-3 lg:px-5">
                    <Link 
                      href={`/katalog/${product.id}`} 
                      className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline transition-colors duration-200 block sm:inline"
                    >
                      {product.name}
                    </Link>
                  </td>
                  
                  {/* Kolom Harga */}
                  <td className="py-3 px-3 lg:px-5">
                    <div className="flex flex-col gap-1">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="flex items-center gap-1 lg:gap-2 flex-wrap">
                          <span className="line-through text-gray-400 text-xs">
                            Rp {Number(product.originalPrice).toLocaleString('id-ID')}
                          </span>
                          <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-1.5 lg:px-2 py-0.5 rounded">
                            -{product.discount}%
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-semibold text-indigo-900">
                        Rp {Number(product.price).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </td>
                  
                  {/* Kolom Stok */}
                  <td className="py-3 px-3 lg:px-5">
                    <span className={`inline-flex items-center px-2 lg:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock <= 5 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock === 0 ? 'Habis' : `${product.stock}`}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {/* Info untuk developer */}
      <div className="text-xs text-gray-400 mt-4 sm:mt-6 text-center">
        Edit daftar produk di <code className="bg-gray-100 px-1 py-0.5 rounded">src/data/products.js</code>
      </div>
    </div>
  )
}