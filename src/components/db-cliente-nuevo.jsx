import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"


async function nuevoCliente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const domicilio = formData.get('domicilio')
    const fechanac = formData.get('fechanac')

    const sql = 'insert into `clientes` (`nombre`, `domicilio`, `fechanac`) values (?, ?, ?)'
    const values = [nombre, domicilio, fechanac];

    const [result, fields] = await mysql.query(sql, values)
    revalidatePath('/productos')
}



function ClienteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />
            <label htmlFor='domicilio'>Domicilio</label>
            <input required id='domicilio' name='domicilio' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />
            <label htmlFor='fechanac'>Fecha nacimiento</label>
            <input required id='fechanac' name='fechanac' type="date" className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            

            <div className='col-span-2 grid gap-2'>
                <button formAction={nuevoCliente} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar producto
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default ClienteNuevo;