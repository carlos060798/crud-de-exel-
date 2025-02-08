import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiProducts from "../api/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface UpdateProductProps {
  id: number;
  productData: Omit<Product, "id">; // Excluye `id` de los datos del producto
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { data, mutate, error } = useMutation({
    mutationFn: async ({ id, productData }: UpdateProductProps) => {
      const response = await apiProducts.put<Product>(`/products/${id}`, productData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Producto actualizado con éxito");
      queryClient.invalidateQueries({ queryKey: ["product-by-id"] }); // 🔄 Actualiza el producto en la caché
      queryClient.invalidateQueries({ queryKey: ["products"] }); // 🔄 Refresca la lista de productos
    },
    onError: (error) => {
      console.error("Error actualizando el producto:", error);
    },
  });

  return { data, mutate, error };
};

