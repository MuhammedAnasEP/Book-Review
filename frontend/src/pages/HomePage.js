import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Book from "../components/Book";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState();
  const axios = useAxiosPrivate();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    setLoading(true);
    axios
      .get("books")
      .then((respone) => {
        setBooks(respone.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.respone.detail);
      });
  }

  return (
    <>
      <h1 className="mx-3">Books</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {books?.map((book) => (
            <Col key={book.id} sm={12} md={6} lg={3} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default HomePage;
