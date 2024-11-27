import Buscar from '@/components/buscar'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

async function obtenerProductos(query) {
    const response = await fetch('http://localhost:4000/productos')
    const productos = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return productos.filter(producto => producto.nombre.toLowerCase().includes(query))
}


async function eliminarProducto(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/productos/' + id, { method: 'DELETE' })

    revalidatePath('/productos-api')
}


async function Productos({ query }) {
    const productos = await obtenerProductos(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Lista de productos (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {productos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((producto) => (
                        <div key={producto.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/productos-api/${producto.id}`}>{producto.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={producto.id} />
                                    <button formAction={eliminarProducto} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Productos



