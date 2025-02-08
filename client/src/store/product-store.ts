import { create } from 'zustand';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
};

type ProductStore = {
    product: Product | null;
    isEditing: boolean; // 🔹 Nuevo estado para saber si está en modo edición
    setProduct: (product: Product) => void;
    resetProduct: () => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    product: null, // 🔹 Por defecto, no hay producto seleccionado
    isEditing: false, // 🔹 No estamos en edición al iniciar

    setProduct: (product) => set({ product, isEditing: true }), // 🔹 Se activa modo edición

    resetProduct: () => set({
        product: null, // 🔹 Se limpia el producto
        isEditing: false // 🔹 Se vuelve a modo creación
    })
}));
