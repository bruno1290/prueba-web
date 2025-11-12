import { useState, useEffect } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  category: 'iphone' | 'macbook';
  title: string;
  sectionId: string;
}

export default function ProductSection({ category, title, sectionId }: ProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const iphoneModels = ['11', '12', '13', '14', '15', '16'];

  useEffect(() => {
    fetchProducts();
  }, [category, selectedSubcategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (category === 'iphone' && selectedSubcategory) {
        query = query.eq('subcategory', selectedSubcategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={sectionId} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>

        {category === 'iphone' && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedSubcategory === null
                  ? 'bg-[#00D563] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Todos
            </button>
            {iphoneModels.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedSubcategory(model)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedSubcategory === model
                    ? 'bg-[#00D563] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                iPhone {model}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#00D563]"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No hay productos disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}