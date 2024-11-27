import Buscar from '@/components/buscar'
import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'



async function obtenerClientes(query) {
    const sql = 'select * from `Clientes` where nombre like ?';
    const values = [`%${query}%`]
    const [Clientes] = await mysql.query(sql, values);
    
    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return Clientes
}


async function eliminarProducto(formData) {
    'use server'
    const id = formData.get('id')

    const sql = 'delete from clientes where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/Clientes-db')
}


async function Clientes({ query }) {

    const Clientes = await obtenerClientes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Listado de Clientes
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {Clientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo   
                    .map((producto) => (
                        <div key={producto.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/clientes-db/${producto.id}`}>{producto.nombre}</Link>
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

export default Clientes



