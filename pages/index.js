import Layout from "./Layout";
import Image from "next/image";
import { sanityClient, urlFor } from "../lib/sanity";
import Post from "../components/Post";

const recipeQuery = `*[ _type=='recipe' ]{
  _id,
  name,
  slug,
  mainImage{
    asset->{
      url,
    }
  },
}`;

export default function Home({ recipes }) {
  return (
    <Layout title='Home'>
      <div className="px-6 flex flex-col gap-6 mb-10">
        {recipes?.length > 0 && (
          <>
          {recipes?.map(recipe=>(
            <Post key={recipe._id} slug={recipe.slug.current} img={recipe.mainImage.asset.url} title={recipe.name}/>
          ))}
          </>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const recipes = await sanityClient.fetch(recipeQuery);
  return { props: { recipes } };
}