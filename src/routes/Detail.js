import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestion(id: $id) {
        id
        medium_cover_image
    }
  }
`;
const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;


export default () => {
    const {id} = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id}
    });
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : ${data.movie.title} ${data.movie.isLiked ? "heart":"cried"}}</Title>
                {!loading && data.movie && (
                    <>
                        <Subtitle>
                            {data?.movie?.language} , {data.movie.rating}
                        </Subtitle>
                        <Description>lorem ipsum</Description>
                    </>
                )}
            </Column>
            <Poster 
            bg={data && data.movie ? data.movie.medium_cover_image : ""}
            ></Poster>
            {data && data.suggestion && data.suggestions.map(s => )}
        </Container>
    );
};