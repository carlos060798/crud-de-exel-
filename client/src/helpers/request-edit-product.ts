
import apiProducts from "../api/api";
import { useMutation } from "@tanstack/react-query";
import { Product } from "./types/types";


type  productProps = {
    id: string;
    productData: Product;
}

export const useUpdateProduct = ({id,productData}:productProps) => {
  const { data, mutate, error } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: async () => {
      const response = await apiProducts.put<Product>(`/products/${id}`, productData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Product updated successfully");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  return { data, mutate, error,};
}
