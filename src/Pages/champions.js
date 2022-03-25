import React, { useEffect, useState } from "react";
import "../App.css";

import { Row, Container, Col, Card, Button, Form, FormControl } from "react-bootstrap";
import { arr } from "../Services/levelChampion";
import SearchIcon from "@mui/icons-material/Search";

const ChampionsPage = () => {
  const [search, setsearch] = useState("");
  const [digimon, setdigimon] = useState(arr);

  useEffect(() => {
    if (search === "") {
      setdigimon(arr);
    }
    if (search !== "") {
      setdigimon(
        arr.filter((bl) => {
          let name = bl.name.toLowerCase();
          console.log(search);
          return name.includes(search.toLowerCase());
        })
      );
    }
  }, [search]);

  const [itensPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(digimon.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const digimons = digimon.slice(startIndex, endIndex);
  const isLastPage = digimons.length !== itensPerPage || endIndex === digimon.length;


  useEffect(() => {
    if (digimon.length) {
      setCurrentPage(0);
    }
  }, [digimon.length]);

  const [show, setShow] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          <h1>Champion</h1>
          <div className="pagination">
          {/*Toggle search box, checks if its true or false*/}
            <Button
              className="buttonSearch"
              onClick={() => setShow((prevCheck) => !prevCheck)}
            >
              <SearchIcon />
            </Button>
            <div className="searchbar">
            {show ? (
              <Form>
              <FormControl
                className="Search"
                type="text"
                id="search"
                placeholder="Search here"
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              </Form>
            ) : null}
            </div>
           
            {pages < 2 ? null : (
              <Button
                className="buttonPages"
                variant="outline-primary"
                onClick={(e) =>
                  setCurrentPage(currentPage > 0 ? currentPage - 1 : null)
                }
              >
                Prev
              </Button>
            )}
            {Array.from(Array(pages), (item, index) => {
              return (
                <Button
                  className="buttonPages"
                  variant="outline-primary"
                  value={index}
                  onClick={(e) => setCurrentPage(Number(e.target.value))}
                >
                  {index + 1}
                </Button>
              );
            })}
            {pages < 2 ? null : (
              <Button
                className="buttonPages"
                variant="outline-primary"
                onClick={(e) =>
                  setCurrentPage(isLastPage ? currentPage : currentPage + 1)
                }
              >
                Next
              </Button>
            )}
          </div>
          {digimons.map((card) => (
            <Col sm={3}>
              <Card key={card.name} style={{ width: "18rem" }}>
                <Card.Img key={card.img} variant="top" src={card.img} />
                <Card.Body>
                  <Card.Title key={card.name}>{card.name}</Card.Title>
                  <Card.Text key={card.level}>{card.level}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );

}
export default ChampionsPage;