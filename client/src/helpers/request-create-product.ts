import { useMutation } from "@tanstack/react-query";
import  apiProducts  from "../api/api";
import { IFormInput } from "../components/form-products";



export const useCreateProduct = () => {
  const { data, mutate, error } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: async (productData:IFormInput ) => {
      const response = await apiProducts.post<IFormInput>("/products", productData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Product created successfully");
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });

  return { data, mutate, error };
};