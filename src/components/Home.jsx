import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

let Home = () => {
  let [pokemonData, setPokemonData] = useState([]);
  let [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://pokeapi.co/api/v2/pokemon",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setAllPokemon(response.data.results);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container fluid className="bg-warning" style={{ minHeight: "100vh" }}>
        <h3 className="text-center py-3">PokeDex</h3>
        <Container>
          <Row>
            {allPokemon.map((v, i) => {
              return (
                <Col sm={6} md={6} lg={4} key={i} className="mb-3">
                  <Link state={v} to="/details" className="text-decoration-none">
                    <Card key={i} className="rounded-5 shadow-sm">
                      <Card.Body className="text-center">
                        <Card.Title style={{ textTransform: "capitalize" }}>
                          {v.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
