import axios from "axios";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Home = styled.section`
  height: calc(100vh - 80px);
  background: #0c121c;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 20px;
`;

const Card = styled.div`
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  /* overflow: hidden; */
  position: relative;
  height: 300px;
  transition: 0.5s ease-in-out;
  > .cardContent {
    opacity: 0;
  }
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.08);
    > .cardContent {
      transition: 0.7s ease-in-out;
      opacity: 1;
    }
    > .thumbnail{
        transition: 0.4s ease-in-out;
        opacity:0.4;
    }
  }
`;

const CardContentContainer = styled.div`
  position: absolute;
  bottom: 10px;
  height: 100px;
  font-size: 0.68rem;
  margin: 0 6px 6px 6px;
  color: white;
`;

const Genre = styled.li`
  color: white;
  list-style: none;
  margin-left: 20px;
  font-size: 1.8rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;
`;

const GenreContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 10px;
`;

const Thumbnail = styled.img`
  border-radius: 20px;
  height: 300px;
`;

const Content = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const history = useHistory()

  useEffect(() => {
    const fetchMoviesData = async () => {
      const config = {
        headers: {
          Authorization: "Bearer Wookie2019",
        },
      };
      let genreSet = new Set();
      const url = "https://wookie.codesubmit.io/movies";
      const data = await axios.get(url, config);
      console.log(data.data.movies);
      data?.data?.movies?.map((movie) =>
        movie.genres.map((genre) => genreSet.add(genre))
      );
      setGenres(Array.from(genreSet));
      setMovies(data.data.movies);
    };
    fetchMoviesData();
  }, []);


  const handleMovieSelection = (movie) =>{
        history.push({
            pathname: `/${movie.slug}`,
            state: {movie: movie},
        })
  };

  return (
    <Home>
      {/* <button onClick={fetchMoviesData} > Click</button> */}
      {/* {movies ? movies.map((item)=>{

                return <li>{item.title}</li>;
                
            }) : <span>Loading ...</span>} */}
      {genres ? (
        genres.map((genre, idx) => {
          return (
            <>
              <Genre key={idx}>{genre}</Genre>
              <GenreContainer>
                {movies
                  .filter((movie) =>
                    movie.genres.some((item) => item === genre)
                  )
                  .map((movie) => {
                    return (
                      <Card
                        key={movie.id}
                        onClick= {()=>handleMovieSelection(movie)}
                      >
                        <Thumbnail src={movie.poster} className = "thumbnail" />
                        <CardContentContainer className="cardContent">
                          <h3>
                            {movie.title.split(" ").join("").length > 30
                              ? movie.title.substr(0, 30) + "..."
                              : movie.title}
                          </h3>
                          <p>
                            {movie.overview.split(" ").join("").length > 100
                              ? movie.overview.substr(0, 100) + "..."
                              : movie.overview}
                          </p>
                        </CardContentContainer>
                      </Card>
                    );
                  })}
              </GenreContainer>
            </>
          );
        })
      ) : (
        <span>Loading ....</span>
      )}
    </Home>
  );
};

export default Content;
