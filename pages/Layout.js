import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }){
    return (
        <div>   
            <Head>
                <title>{title}</title>
            </Head>
            <nav className='flex items-center px-6 py-3 bg-white border-b'>
                <div>
                    <Link href='/'><a className='text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 to-blue-500 text-2xl font-bold'>Recipe</a></Link>
                </div>
            </nav>
            <div className='mt-10'>
                {children}
            </div>
        </div>
    )
}