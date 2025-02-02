import apiProducts from "../api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProduct = () => {
    const queryClient = useQueryClient();
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const response = await apiProducts.get(`/products`);
            return response.data;
        },
        onsuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: "products" });    
            return data;
        },
        onError: (error: Error) => {
            return error;
        },
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, error };
}