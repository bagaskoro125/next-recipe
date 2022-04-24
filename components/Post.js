import Link from 'next/link';

export default function Post({ img, title, slug }){
    return (
        <div className="flex gap-4 border p-2 rounded">
            <Link href={`/post/${slug}`}>
                <img src={img} className="aspect-square rounded cursor-pointer w-[200px] object-center object-cover"/>
            </Link>
            <div>
                <Link href={`/post/${slug}`}>
                    <h1 className='font-bold text-2xl cursor-pointer'>{title}</h1>
                </Link>
            </div>
        </div>
    )
}