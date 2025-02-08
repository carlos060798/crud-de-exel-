import { useDeleteProduct } from "../helpers/request-delete-product";
import { useGetProduct } from "../helpers/request-get-product";
import { useGetOneProduct } from "../helpers/request-getone-product";
import { Product } from "../helpers/types/types";
import { useState } from "react";
import { useProductStore } from "../store/product-store";


function TableProducts() { 
  const  [id, setId] = useState<number>(0);
  const { data, isLoading } = useGetProduct();
  const {data:producto,refetch}= useGetOneProduct(id );
  const { mutate } = useDeleteProduct();

  const setProduct = useProductStore((state) => state.setProduct);

  setProduct(producto);



  console.log("data de producto",producto);


  // Función para editar un producto
  const editProduct = (id: number) => {
    setId(id);
    refetch();
  };

  // Función para eliminar un producto
  const deleteProduct = (id: number) => {
    mutate(id);
  };


  return ( <>
      <table>
        <caption>Productos</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha de creacion</th>
            <th>Fecha de actualizacion
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading? (
            <tr>
              <td colSpan={6}>Cargando...</td>
            </tr>
          ) : (
            data.products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>{new Date(product.updatedAt).toLocaleString()}</td>

                <td>
                  <button onClick={() => editProduct(product.id)}>Editar</button>
                  <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

   

    </> ); 
}

export default TableProducts;