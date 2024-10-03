import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchAllProducts();
}, []);

const fetchAllProducts = async () => {
    try {
        const response = await axios.get('https://carparts-ki7c.onrender.com/products/all');
        setProducts(response.data);
    } catch (err) {
        setError('Error fetching products');
    } finally {
        setLoading(false);
    }
};

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText) {
        fetchAllProducts();
        return;
    }

    try {
        const response = await axios.get(`https://carparts-ki7c.onrender.com/products/${searchText}`);
        setProducts(response.data);
    } catch (err) {
        setError('Error fetching products');
    }
};

const clearFilter = () => {
  setSearchText('');
  fetchAllProducts();
};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Auto Díly - Eshop</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6">
        {/* Banner */}
        <div className="mb-6 bg-blue-500 text-white text-center p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">Vítejte v našem obchodě s autodíly!</h2>
          <p className="mt-2">Najdete u nás kvalitní náhradní díly pro různé modely automobilů.</p>
        </div>


        <form className="mt-4 mb-4 flex items-center max-w-sm mx-auto" onSubmit={handleSearch}>
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="text"
              id="simple-search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5"
              placeholder="Hledat podle názvu nebo modelu..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mr-2"
          >
            Hledat
            
          </button>
          <button
            type="button"
            onClick={clearFilter}
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Vše
          </button>
        </form>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse mb-4"></div>
                  <div className="h-6 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center col-span-full">
              <div className="border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (


              <div key={product} className="bg-white shadow rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-xl">{product.title}</h3>
                  <p className="text-gray-500">{product.make} - {product.model}</p>
                  <p className="mt-2">{product.description.slice(0, 50)}</p>

                  <div className="flex justify-between">
                    <p className="mt-4 font-bold text-lg">{product.price} {product.currency}</p>
                    <button
                      className="p-2 bg-blue-300 rounded-md mr-1"
                      onClick={() => {
                        router.push(`/product/${product.id}`);
                      }}
                    >
                      Zobrazit
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </main>
    </div>
  );
}
