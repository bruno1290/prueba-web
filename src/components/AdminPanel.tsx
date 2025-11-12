import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'iphone' as 'iphone' | 'macbook',
    subcategory: '',
    price: '',
    description: '',
    storage: '',
    color: '',
    condition: 'Como nuevo',
    image_url: '',
    available: true,
  });

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.category === 'iphone' ? formData.subcategory : null,
        price: parseFloat(formData.price),
        description: formData.description,
        storage: formData.storage,
        color: formData.color,
        condition: formData.condition,
        image_url: formData.image_url,
        available: formData.available,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update({ ...productData, updated_at: new Date().toISOString() })
          .eq('id', editingProduct.id);

        if (error) throw error;
        alert('Producto actualizado exitosamente');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        alert('Producto creado exitosamente');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar producto');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price.toString(),
      description: product.description,
      storage: product.storage,
      color: product.color,
      condition: product.condition,
      image_url: product.image_url,
      available: product.available,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Producto eliminado exitosamente');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar producto');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'iphone',
      subcategory: '',
      price: '',
      description: '',
      storage: '',
      color: '',
      condition: 'Como nuevo',
      image_url: '',
      available: true,
    });
    setIsEditing(false);
    setEditingProduct(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Panel de Administración</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                    placeholder="iPhone 15 Pro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as 'iphone' | 'macbook' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                    >
                      <option value="iphone">iPhone</option>
                      <option value="macbook">MacBook</option>
                    </select>
                  </div>

                  {formData.category === 'iphone' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Modelo
                      </label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                      >
                        <option value="">Seleccionar</option>
                        <option value="11">iPhone 11</option>
                        <option value="12">iPhone 12</option>
                        <option value="13">iPhone 13</option>
                        <option value="14">iPhone 14</option>
                        <option value="15">iPhone 15</option>
                        <option value="16">iPhone 16</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio (CLP)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                      placeholder="500000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Almacenamiento
                    </label>
                    <input
                      type="text"
                      value={formData.storage}
                      onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                      placeholder="256GB"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                      placeholder="Negro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condición
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                    >
                      <option value="Nuevo">Nuevo</option>
                      <option value="Como nuevo">Como nuevo</option>
                      <option value="Excelente">Excelente</option>
                      <option value="Muy bueno">Muy bueno</option>
                      <option value="Bueno">Bueno</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D563] focus:border-transparent"
                    rows={3}
                    placeholder="Descripción del producto..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="h-4 w-4 text-[#00D563] focus:ring-[#00D563] border-gray-300 rounded"
                  />
                  <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                    Producto disponible
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#00D563] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00c056] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Agregar'}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Productos Existentes</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {loading && products.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#00D563] mx-auto"></div>
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay productos</p>
                ) : (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#00D563] transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">
                            {product.storage} {product.color}
                          </p>
                          <p className="text-lg font-bold text-[#00D563] mt-1">
                            ${product.price.toLocaleString('es-CL')}
                          </p>
                          <span
                            className={`inline-block text-xs px-2 py-1 rounded-full mt-2 ${
                              product.available
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.available ? 'Disponible' : 'No disponible'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}