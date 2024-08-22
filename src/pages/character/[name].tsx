import Layout from "@/components/layouts/Layout";
import { Item } from "@/interface/characters";
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image";

interface CharacterPageProps {
    character: Item;
}


export default function CharacterPage({ character }: CharacterPageProps) {
    return (
        <Layout
            title={`Personaje: ${character.name}`}
            description={`Informacion sobre ${character.description}`}
        >
            <article className="max-w-3xl mx-auto mt-8">
                <h1>{character.name}</h1>
                <Image
                    src={character.image}
                    alt={character.name}
                    width={160}
                    height={160}
                />
                <p>{character.description}</p>
            </article>

        </Layout>
    )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const character = ctx.params?.name;
    const res = await fetch(`https://dragonball-api.com/api/characters?name=${character}`);
    const data = await res.json();

    return {
        props: {
            character: data[0],
        },
        //un dia
        revalidate: 86400
    }

}



export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const response = await fetch('https://dragonball-api.com/api/characters?limit=12');
    const data = await response.json();
    const paths = data.items.map((character: Item) => {
        return {
            params: { name: character.name }
        }
    });

    return {
        paths,
        fallback: false,
    }
}
