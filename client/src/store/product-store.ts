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
    product: Product;
    setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
    product: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        stock: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    setProduct: (product) => set({ product }),
}));