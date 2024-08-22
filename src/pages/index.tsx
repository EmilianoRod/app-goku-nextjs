import Layout from "@/components/layouts/Layout";
import { Characters } from "@/interface/characters";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  characters: Characters
}


export default function Home({ characters }: HomeProps) {
  return (
    <Layout
      title="App de Goku"
      description="App de Goku con Next.js"
    >
      <h1>App de Goku</h1>
      <div className="grid grid-cols-3 gap-8">
        {characters.items.map((character) => (
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
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : 1;
  const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=12`);
  const data = await response.json();


  return {
    props: {
      characters: data,
    }
  }
};