import Seo from "../components/Seo";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Home({results}) {
    const router = useRouter();
    const onClick = (id, title)=> {
        router.push(
            {
                pathname: `/movies/${id}`, //path를 바꿔주고
                query: {
                    title, //url에서 쿼리를 추가해준다.
                },
            },
            `/movies/${id}` //쿼리를 path와 똑같이 해주어서 마스킹해준다.
        );
    }
    return (
        <div className="container">
            <Seo title="Home" />
            {results?.map((movie) => (
                <div
                    onClick={() => onClick(movie.id, movie.original_title)}
                    className="movie"
                    key={movie.id}
                >
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <h4>
                        <Link legacyBehavior
                            href={{
                                pathname: `/movies/${movie.id}`,
                                query: {
                                    title: movie.original_title,
                                },
                            }}
                            as={`/movies/${movie.id}`}
                        >{/* onClick에서 router.push 해준 것 처럼 동일하게 적용시켜줘야 한다. */}
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
        </div>
    );
}

export async function getServerSideProps(){
    const { results } = await (await fetch(`http://localhost:3000//api/movies`)).json();
    return {
        props:{
            results,
        },
    }
    /*getServerSideProps 에서 리턴하는 것은 모두 컴포넌트에서 props로 받아올 수 있다.
    * 위에 Home 컴포넌트에서 props로 results를 가져왔다.*/
}