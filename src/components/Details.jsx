import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

let Details = () => {
  let prevLoc = useLocation().state;
  let [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://pokeapi.co/api/v2/pokemon/${prevLoc.name}`,
        headers: {},
      };

      await axios
        .request(config)
        .then((response) => {
          setPokemonData(response.data);
        })
        .catch((error) => {
          alert(error);
        });
    };
    getData();
  }, []);

  return (
    <div
      className="bg-warning d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{ textTransform: "capitalize" }}
        className="bg-info rounded-2 p-3 d-flex align-items-center"
      >
        <div>
          <h4 className="me-3">{prevLoc.name}</h4>
          {pokemonData?.abilities?.map((v, i) => {
            return <p>{v.ability.name}</p>;
          })}
          <Link to="/">
            <Button variant="outline-dark">Back</Button>
          </Link>
        </div>
        <img
        style={{maxWidth:"250px"}}
          src={pokemonData?.sprites?.other?.dream_world?.front_default}
          alt=""
        />
      </div>
    </div>
  );
};

export default Details;
