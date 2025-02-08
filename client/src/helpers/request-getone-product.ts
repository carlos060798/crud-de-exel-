import { useQuery } from "@tanstack/react-query";
import apiProducts from "../api/api";
import { useProductStore } from "../store/product-store";



export const useGetOneProduct = (id: number) => {
    const setProduct = useProductStore((state) => state.setProduct);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["product-by-id", id], 
        queryFn: async () => {
            try {
                const response = await apiProducts.get(`/products/${id}`);
                const product = response?.data?.data ?? null; // Acceder a la clave correcta
                if (product) setProduct(product); 
                return product; 
            } catch (error) {
                console.error("Error al obtener el producto:", error);
                return null; // Evita retornar `undefined`
            }
        },
        enabled: !!id, // Solo ejecuta la consulta si hay un ID válido
        retry: 2,
        refetchOnWindowFocus: false,
        onError: (error: Error) => console.error("Error al obtener el producto:", error),
    });

    return { data, isLoading, error, refetch };
};
