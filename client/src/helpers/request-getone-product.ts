import apiProducts from "../api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "../store/product-store";




export const useGetOneProduct = () => {
    console.log("useGetOneProduct");
    const setProduct = useProductStore((state) => state.setProduct);
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["product-by-id"],
        queryFn: async ({ queryKey }) => {
            const id = queryKey[1]; // Extrae el ID de la queryKey
            if (!id) throw new Error("ID no proporcionado");
            const response = await apiProducts.get(`/products/${id}`);
            console.log("product1",response.data.products);
            setProduct(response.data);
            return response.data;
        },
        enabled: false, // La consulta NO se ejecuta automáticamente
        retry: 2,
        refetchOnWindowFocus: false,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error: Error) => {
            console.error("Error al obtener el producto:", error);
        },
    });

    // Función manual para obtener un producto por ID
    const fetchProduct = async (id: number) => {
        if (id > 0) {
            queryClient.setQueryData(["product-by-id"], id);
            await refetch();
        }
    };

    return { data, isLoading, error, fetchProduct };
};