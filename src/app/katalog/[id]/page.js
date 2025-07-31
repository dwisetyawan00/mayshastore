import { products } from '@/data/products'
import ProductDetail from '@/components/ProductDetail'

export default async function ProductDetailPage({ params }) {
  const awaitedParams = await params
  const { id } = awaitedParams
  const product = products.find((p) => p.id?.toString() === id)

  if (!product) {
    return <div className="text-center py-24">Produk tidak ditemukan.</div>
  }

  return <ProductDetail product={product} />
}

