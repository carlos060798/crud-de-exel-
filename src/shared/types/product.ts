export type Product= {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateProductDto = {
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
  export type UpdateProductDto = Partial<CreateProductDto> & {
    id: number;
  }
  
  export type ProductResponse={
    success: boolean;
    data?: Product | Product[];
    error?: string;
  }