import Layout from "@/components/layouts/Layout";
import { Characters, Item, Links, Meta } from "@/interface/characters";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  characters: Item[],
  meta: Meta,
  links: Links,
}


export default function Home({ characters, meta, links }: HomeProps) {
  return (
    <Layout
      title="App de Goku"
      description="App de Goku con Next.js"
    >
      <h1>App de Goku</h1>
      <div className="grid grid-cols-3 gap-8">
        {characters.map((character) => (
          <Link className="border rounded-md" key={character.id} href={`/character/${character.name}`}>
            <div
              key={character.id}
              className="flex flex-col items-center justify-center p-6">
              <Image
                src={character.image}
                alt={character.name}
                width={160}
                height={160} />
              <p>{character.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {links.previous && (
          <Link
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100
                        hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            href={`/?page=${meta.currentPage - 1}`}
          >
            Previous
          </Link>
        )}
        {links.next && (
          <Link
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100
                                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            href={`/?page=${meta.currentPage + 1}`}
          >
            Next
          </Link>
        )}
      </div>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : 1;
  const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=12`);
  const data = await response.json();

  ctx.res.setHeader("Cache-Control", "s-maxage=10 stale-while-revalidate=59");


  return {
    props: {
      characters: data.items,
      meta: data.meta,
      links: data.links
    }
  }
};