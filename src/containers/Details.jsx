import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const DetailsSection = styled.section`
  padding-left: 20px;
  padding-right: 20px;
  height: calc(100vh - 80px);
  background: #0c121c;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
`;

const BackdropImage = styled.img`
  margin: auto auto;
  border-radius: 20px;
  height: 800px;
  width: 600px;
`;

const MovieDetails = styled.div`
  margin: auto auto;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Details = () => {
  const location = useLocation();
  const history = useHistory();

  const getDate = (isoDate)=>{
    const date = new Date(isoDate)
    return date.getFullYear()
}

  return (
    <DetailsSection>
      <BackdropImage src={location.state.movie.backdrop} />
      <MovieDetails>
        <button
          style={{
            maxWidth: "100px",
            backgroundColor: "transparent",
            color: "white",
            border: "0.2px white solid",
            borderRadius: "20px",
          }}
          onClick={() => history.push("/")}
        >
          back
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1> Title: {location.state.movie.title}</h1>
          <h4>
            <strong>Rating - </strong> {location.state.movie.imdb_rating}
          </h4>
        </div>

        <p>
          {getDate(location.state.movie.released_on)} | {location.state.movie.length} |{" "}
          {location.state.movie?.director[0]}
        </p>
        <div>
          <p>
            <strong style={{ marginRight: "20px" }}>Movie Description</strong>{" "}
            {location.state.movie?.overview}
          </p>
        </div>
      </MovieDetails>
    </DetailsSection>
  );
};

export default Details;
