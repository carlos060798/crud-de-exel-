import React, { useEffect, useState } from 'react';
import { ProductForm } from '../components/products';
import { ProductTable } from '../components/tableproducts';
import { productApi } from '../services/api';
import { Product,CreateProductDto } from '../../shared/types/product';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Aquí podrías agregar una notificación de error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (productData: CreateProductDto) => {
    try {
      await productApi.create(productData);
      await fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async (productData: CreateProductDto) => {
    try {
      if (selectedProduct?.id) {
        await productApi.update(selectedProduct.id, productData, selectedProduct);
        await fetchProducts();
        setIsModalOpen(false);
        setSelectedProduct(undefined);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productApi.delete(id);
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => {
            setSelectedProduct(undefined);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Nuevo Producto
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? 'Editar' : 'Crear'} Producto
            </h2>
            <ProductForm
              initialData={selectedProduct}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedProduct(undefined);
              }}
              onSubmit={selectedProduct ? handleUpdate : handleCreate}  ></ProductForm>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedProduct(undefined);
              }}
              className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;