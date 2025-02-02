 
import apiProducts from "../api/api";
import { useMutation } from "@tanstack/react-query";




export const useDeleteProduct = () => {
  const { data, mutate, error } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: async (id:number) => {
      const response = await apiProducts.delete(`/products/${id}`,);
      return response.data;
    },
    onSuccess: () => {
        console.log("Product delete successfully");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  return { data, mutate, error,};
}
