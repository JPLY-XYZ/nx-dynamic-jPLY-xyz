import Link from "next/link";
import { notFound } from 'next/navigation'
import mysql from '@/lib/mysql'


async function obtenercliente(id) {
    const sql = 'select * from clientes where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}


function getRandomTailwindColor() {
    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-teal-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-purple-500",
        "bg-pink-500",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


async function clientePage({ params }) {
    const { id } = await params
    const cliente = await obtenercliente(id)

    if (!cliente) notFound()

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">

            <Link href="/clientes-db" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                cliente #{cliente.id}
            </h1>
            <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-blue-100 rounded-xl">
            <div className={`text-8xl place-self-center items-center content-center text-center rounded-full h-[200px] w-[200px]  ${getRandomTailwindColor()}  `}>{cliente.nombre.charAt(0).toUpperCase()}</div>
                <p className="text-6xl place-self-center">{cliente.nombre}</p>
                <p className="text-2xl place-self-center text-slate-400">{cliente.domicilio}</p>
                <p className="text-7xl place-self-center text-blue-400 *:font-bold">{cliente.fechanac.toLocaleString().split(',')[0]}</p>
            </div>
        </section>
    );
}

export default clientePage;