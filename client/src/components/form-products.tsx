import { useForm } from "react-hook-form";
import { useCreateProduct } from "../helpers/request-create-product";
import { useProductStore } from "../store/product-store";


export type IFormInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
}
function FormProducts() { 
const  {register,handleSubmit, formState: { errors }}=useForm<IFormInput>({
  defaultValues: {
    name: "",
    description: "",
    price: 0,
    stock: 0
  }
});

const product =useProductStore( state => state.product) 

console.log(product)


const {mutate}=useCreateProduct()
  const onSubmit = (data: IFormInput) => {
    console.log(data);
    //Send to server
    mutate(data)
   
  };
  return (
    <>
      <div className="form-products">
        <h2>prueba</h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Nombre"
              {...register('name', { required: 'El nombre es obligatorio' })}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Descripción"
              {...register('description', { required: 'La descripción es obligatoria' })}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Precio" 
              {...register('price', { required: 'El precio es obligatorio' })}
            />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              placeholder="Stock"
              {...register('stock', { required: 'El stock es obligatorio' })}
            />
            {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
    </>
  );
}

export default FormProducts;