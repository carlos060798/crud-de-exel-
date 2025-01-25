import axios from 'axios';
import { CreateProductDto, UpdateProductDto, ProductResponse } from '../../shared/types/product';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const productApi = {
  getAll: async () => {
    const response = await axios.get<ProductResponse>(`${API_URL}/products`);
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await axios.get<ProductResponse>(`${API_URL}/products/${id}`);
    return response.data;
  },

  create: async (product: CreateProductDto) => {
    const response = await axios.post<ProductResponse>(`${API_URL}/products`, product);
    return response.data;
  },

  update: async (id: number, productData: CreateProductDto, product: UpdateProductDto) => {
    const response = await axios.put<ProductResponse>(`${API_URL}/products/${product.id}`, product);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete<ProductResponse>(`${API_URL}/products/${id}`);
    return response.data;
  }
};