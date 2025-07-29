// src/data/products.js
// Data produk yang mudah diedit - tinggal tambah produk baru di array ini

export const products = [
  {
    id: 1,
    name: "Sabun Mandi Cair Premium",
    category: "Sabun Mandi Cair",
    description: "Sabun mandi cair dengan formula lembut untuk kulit sensitif, diperkaya vitamin E dan aloe vera",
    price: 25000,
    originalPrice: 35000,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: 29,
    rating: 4.8,
    reviewCount: 156,
    stock: 25,
    isPopular: true,
    image: "/images/produk1.png",
    bgColor: "from-blue-100 via-purple-50 to-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-blue-700"
  },
  {
    id: 2,
    name: "Sabun Cuci Piring Anti Lemak",
    category: "Sabun Cuci Piring",
    description: "Formula super concentrate yang efektif mengangkat lemak membandel dengan aroma jeruk segar",
    price: 18000,
    originalPrice: 22000,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: 18,
    rating: 4.6,
    reviewCount: 89,
    stock: 15,
    isPopular: true,
    image: null, // "/images/sabun-cuci-piring.jpg"
    bgColor: "from-yellow-100 via-orange-50 to-yellow-100",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-700"
  },
  {
    id: 3,
    name: "Deterjen Bubuk Super Clean",
    category: "Deterjen Bubuk",
    description: "Deterjen bubuk dengan teknologi enzim aktif yang mengangkat noda membandel dan menjaga warna kain",
    price: 32000,
    originalPrice: null,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: null,
    rating: 4.7,
    reviewCount: 203,
    stock: 8,
    isPopular: true,
    image: null, // "/images/deterjen-bubuk.jpg"
    bgColor: "from-green-100 via-emerald-50 to-green-100",
    iconColor: "text-green-600",
    titleColor: "text-green-700"
  },
    {
    id: 4,
    name: "Sabun Batang Herbal",
    category: "Sabun Batang",
    description: "Sabun batang dari bahan alami dengan ekstrak herbal untuk menjaga kelembaban kulit",
    price: 8500,
    originalPrice: 12000,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: 29,
    rating: 4.5,
    reviewCount: 67,
    stock: 0, // Habis stock
    isPopular: false,
    image: null, // "/images/sabun-batang.jpg"
    bgColor: "from-pink-100 via-rose-50 to-pink-100",
    iconColor: "text-pink-600",
    titleColor: "text-pink-700"
  },
  {
    id: 5,
    name: "Pembersih Lantai Antiseptik",
    category: "Pembersih Lantai",
    description: "Pembersih lantai dengan formula antiseptik yang membunuh 99.9% kuman dan bakteri",
    price: 28000,
    originalPrice: null,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: null,
    rating: 4.9,
    reviewCount: 134,
    stock: 20,
    isPopular: true,
    image: null, // "/images/pembersih-lantai.jpg"
    bgColor: "from-indigo-100 via-blue-50 to-indigo-100",
    iconColor: "text-indigo-600",
    titleColor: "text-indigo-700"
  },
  {
    id: 6,
    name: "Pewangi Pakaian Lavender",
    category: "Pewangi Pakaian",
    description: "Pewangi pakaian dengan aroma lavender yang tahan lama, memberikan kesegaran sepanjang hari",
    price: 15000,
    originalPrice: 20000,
    shopeeLink: 'https://shopee.co.id/produk1',
    tokopediaLink: 'https://tokopedia.com/produk1',
    waNumber: "6281234567890",
    discount: 25,
    rating: 4.4,
    reviewCount: 92,
    stock: 12,
    isPopular: false,
    image: null, // "/images/pewangi-pakaian.jpg"
    bgColor: "from-purple-100 via-violet-50 to-purple-100",
    iconColor: "text-purple-600",
    titleColor: "text-purple-700"
  }
]

// Fungsi helper untuk menambah produk baru
export const addProduct = (newProduct) => {
  const product = {
    id: products.length + 1,
    rating: 4.0,
    reviewCount: 0,
    stock: 10,
    isPopular: false,
    image: null,
    bgColor: "from-gray-100 via-slate-50 to-gray-100",
    iconColor: "text-gray-600",
    titleColor: "text-gray-700",
    ...newProduct
  }
  products.push(product)
  return product
}

// Fungsi helper untuk mengupdate produk
export const updateProduct = (id, updates) => {
  const index = products.findIndex(product => product.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    return products[index]
  }
  return null
}

// Fungsi helper untuk menghapus produk
export const deleteProduct = (id) => {
  const index = products.findIndex(product => product.id === id)
  if (index !== -1) {
    return products.splice(index, 1)[0]
  }
  return null
}

// Contoh cara menambah produk baru:
/*
addProduct({
  name: "Sabun Cuci Tangan Antibakteri",
  category: "Sabun Cuci Tangan",
  description: "Sabun cuci tangan dengan formula antibakteri untuk perlindungan maksimal",
  price: 12000,
  originalPrice: 15000,
  discount: 20,
  stock: 30,
  image: "/images/sabun-cuci-tangan.jpg", // Letakkan gambar di folder public/images/
  bgColor: "from-teal-100 via-cyan-50 to-teal-100",
  iconColor: "text-teal-600",
  titleColor: "text-teal-700"
})
*/
