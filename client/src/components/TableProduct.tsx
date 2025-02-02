import { useDeleteProduct } from "../helpers/request-delete-product";
import { useGetProduct } from "../helpers/request-get-product";
import { useGetOneProduct } from "../helpers/request-getone-product";
import { Product } from "../helpers/types/types";


function TableProducts() { 
  const {data,isLoading} = useGetProduct() 
  const {fetchProduct} = useGetOneProduct()
  const { mutate } = useDeleteProduct() 


  
    
    // Función para editar un producto
    const editProduct = (id:number) => {
      // Aquí se implementa la lógica para editar un producto
      console.log("Editar producto con id:", id);
      fetchProduct(id);
    
    };
    
    // Función para eliminar un producto
    const deleteProduct = (id:number) => {
      mutate(id)
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