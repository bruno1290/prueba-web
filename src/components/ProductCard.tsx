import { Instagram } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  const handleContact = () => {
    const message = `Hola! Estoy interesado en el ${product.name} ${product.storage} ${product.color}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/56959480660?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Vendido</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        {product.storage && (
          <p className="text-gray-600 mb-1">{product.storage}</p>
        )}
        {product.color && (
          <p className="text-gray-600 mb-2">{product.color}</p>
        )}
        {product.condition && (
          <p className="text-sm text-gray-500 mb-3">{product.condition}</p>
        )}
        {product.description && (
          <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#00D563]">
            {formatPrice(product.price)}
          </span>
          {product.available && (
            <button
              onClick={handleContact}
              className="bg-[#00D563] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00c056] transition-colors flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Contactar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}