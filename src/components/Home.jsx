import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

let Home = () => {
  let [allPokemon, setAllPokemon] = useState([]);
  let [nextPage, setNextPage] = useState("");
  let [prevPage, setPrevPage] = useState("");
  let [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  useEffect(() => {
    let config;
    if (localStorage.getItem("currentPage")) {
      config = {
        method: "get",
        maxBodyLength: Infinity,
        url: localStorage.getItem("currentPage"),
        headers: {},
      };
    } else {
      config = {
        method: "get",
        maxBodyLength: Infinity,
        url: currentPage,
        headers: {},
      };
    }
    axios
      .request(config)
      .then((response) => {
        setAllPokemon(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePrevPage = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: prevPage,
      headers: {},
    };
    localStorage.setItem("currentPage", prevPage);
    setCurrentPage(prevPage);

    axios
      .request(config)
      .then((response) => {
        setAllPokemon(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {});
  };

  const handleNextPage = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: nextPage,
      headers: {},
    };
    localStorage.setItem("currentPage", nextPage);
    setCurrentPage(nextPage);
    axios
      .request(config)
      .then((response) => {
        setAllPokemon(response.data.results);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container fluid className="bg-warning" style={{ minHeight: "100vh" }}>
        <h3 className="text-center py-3">PokeDex</h3>
        <Container>
          <Row>
            {allPokemon.map((v, i) => {
              return (
                <Col sm={6} md={6} lg={4} key={i} className="mb-3">
                  <Link
                    state={v}
                    to="/details"
                    className="text-decoration-none"
                  >
                    <Card
                      key={i}
                      className="rounded-5 shadow-sm"
                      url={currentPage}
                    >
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
            <Col sm={6} md={6} lg={4} className="mb-3">
              {prevPage ? (
                <Button
                  variant="success rounded-5"
                  className="h-100 w-50"
                  onClick={() => handlePrevPage()}
                >
                  Previous Page
                </Button>
              ) : null}
              {nextPage && !prevPage ? (
                <Button
                  variant="success rounded-5"
                  className="h-100 w-100"
                  onClick={() => handleNextPage()}
                >
                  Next Page
                </Button>
              ) : (
                <Button
                  variant="success rounded-5"
                  className="h-100 w-50"
                  onClick={() => handleNextPage()}
                >
                  Next Page
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Home;
