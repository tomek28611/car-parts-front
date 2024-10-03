import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://carparts-ki7c.onrender.com/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return <div>Produkt nebyl nalezen</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-cover mb-6"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Žádný obrázek k dispozici</span>
            </div>
          )}
          <p><strong>Výrobce:</strong> {product.make}</p>
          <p><strong>Model:</strong> {product.model}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 font-bold text-lg">{product.price} {product.currency}</p>
        </div>
      </div>
    </div>
  );
}
