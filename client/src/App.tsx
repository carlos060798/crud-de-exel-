
import './App.css'
import FormProducts from './components/form-products'
import TableProducts from './components/TableProduct'

function App() {

const   className = 'MainLayout'
  return (
    <>
      <main  className={className}>
        <h1   className={`${className}__title`} >
          Crud de Productos
        </h1>
                 
        <div className={`${className}__content`}> 

          <FormProducts /> 

          <TableProducts />

        </div>

        
      </main>
    </>
  )
}

export default App
