import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductStore } from "../store/product-store";
import { useCreateProduct } from "../helpers/request-create-product";
import { useUpdateProduct } from "../helpers/request-edit-product";

export type IFormInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

function FormProducts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const { product, resetProduct } = useProductStore();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  // 🔹 Estados locales para manejar los valores de los inputs
  const [formValues, setFormValues] = useState<IFormInput>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  // 🔹 Cargar datos cuando se edita un producto
  useEffect(() => {
    if (product?.id > 0) {
      setFormValues({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setFormValues({
        name: "",
        description: "",
        price: 0,
        stock: 0,
      });
    }
  }, [product]);

  // 🔹 Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const onSubmit = (data: IFormInput) => {
    if (product?.id > 0) {
      // Modo Edición
      updateProduct(
        { id: product.id, productData: formValues },
        {
          onSuccess: () => {
            console.log("Producto actualizado con éxito");
            reset(); // 🔄 Limpia el formulario de react-hook-form
            setFormValues({ name: "", description: "", price: 0, stock: 0 }); // 🔄 Limpia estado local
            resetProduct();
          },
        }
      );
    } else {
      // Modo Creación
      createProduct(formValues, {
        onSuccess: () => {
          console.log("Producto creado con éxito");
          reset(); // 🔄 Limpia el formulario de react-hook-form
          setFormValues({ name: "", description: "", price: 0, stock: 0 }); // 🔄 Limpia estado local
        },
      });
    }
  };

  return (
    <div className="form-products">
      <h2>{product?.id > 0 ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nombre"
            {...register("name", { required: "El nombre es obligatorio" })}
            value={formValues.name}
            onChange={handleChange}
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
            {...register("description", { required: "La descripción es obligatoria" })}
            value={formValues.description}
            onChange={handleChange}
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
            {...register("price", { required: "El precio es obligatorio" })}
            value={formValues.price}
            onChange={handleChange}
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
            {...register("stock", { required: "El stock es obligatorio" })}
            value={formValues.stock}
            onChange={handleChange}
          />
          {errors.stock && <span className="text-red-500">{errors.stock.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          {product?.id > 0 ? "Actualizar Producto" : "Agregar Producto"}
        </button>

        {/* 🔹 Botón para cancelar edición */}
        {product?.id > 0 && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              reset(); // 🔄 Limpia react-hook-form
              setFormValues({ name: "", description: "", price: 0, stock: 0 }); // 🔄 Limpia estado local
              resetProduct();
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default FormProducts;
