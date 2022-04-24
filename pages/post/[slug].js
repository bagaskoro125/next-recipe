import { useState } from "react";
import { sanityClient, usePreviewSubsciption } from "../../lib/sanity";
import Layout from "../Layout";

const recipeQuery = `*[ _type=='recipe' && slug.current == $slug ][0]{
    _id,
    name,
    slug,
    mainImage{
      asset->{
        url,
      }
    },
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name,
        }
    },
    instructions,
    likes
}`;

export default function Post({ data, preview }){

    const { data: recipe } = usePreviewSubsciption(recipeQuery, {
        params: { slug: data?.recipe?.slug?.current },
        initialData: data,
        enabled: preview
    });
    const [likes, setLikes] = useState(data?.recipe?.likes);

    const addLike = async () => {
        const res = await fetch('/api/handle-like', {
            method: 'POST',
            body: JSON.stringify({ _id: recipe._id })
        }).catch(error=>console.log(error))

        const data = await res.json();
        setLikes(data.likes);
    }

    return (
        <Layout title={recipe.name}>
            <article className="px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-10">{recipe.name}</h1>
                    <button onClick={addLike} className="font-bold text-red-300 border px-2 py-1 rounded">{likes ? likes : 0} Likes</button>
                </div>
                <section className="flex justify-center gap-10">
                    <img src={recipe?.mainImage?.asset?.url} className="aspect-square rounded object-cover object-center w-[300px]"/>
                    {recipe.ingredient && (
                        <>
                        {recipe.ingredient.map((data,i)=>(
                            <ul key={i}>
                                <li>{data.fraction}</li>
                            </ul>
                        ))}
                        </>
                    )}
                </section>
            </article>
        </Layout>
    )
}

export async function getStaticPaths(){
    const paths = await sanityClient.fetch(
        `*[ _type=='recipe' && defined(slug.current) ]{
            "params" : {
                "slug" : slug.current
            }
        }`
    );
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }){
    const { slug } = params;
    const recipe = await sanityClient.fetch(recipeQuery, {slug})
    return { props: { data: { recipe }, preview: true } }
}