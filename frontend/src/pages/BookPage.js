import React, {useState,  useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios/axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from '../components/Rating'
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'

function BookPage() {
    const [book, setBook] = useState()
    const [review, setReview] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()

    useEffect(() => {
        getBook(params.id)
        getBookReview(params.id)
    }, [])
    
    const getBook = (id) => {
      setLoading(true);
      axios.get(`book/${id}`)
          .then((respone)=>{
              setBook(respone.data)
              setLoading(false);
          })
          .catch((error) => {
              setError(error.respone.detail);
              setLoading(false);
          });
    }

    const getBookReview = (id) => {
        axios.get(`review/${id}`)
            .then((respone)=>{
                setReview(respone.data.results)
            })
            .catch((error) => {
                setError(error.respone.detail);
            });
            
        }
        
        const baseUrl = 'http://127.0.0.1:8000/'
       
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
       {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (book &&
        <>
          <Row style={{marginLeft: '10px'}}>
            <Col md={3}>
              <Image src={baseUrl + book.cover_image} alt={book.title} fluid/>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{book.title}</h3>
                  <h6 style={{color: 'gray'}}>{book.author}</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating
                        value={book.average_rating}
                        text={`${book.average_rating} Average reviews`}
                    />
                </ListGroup.Item>
                <ListGroup.Item>
                  Category: {book.genre}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row style={{marginLeft: '10px', marginTop: '10px'}}>
            <Col md={6}>
              <h2>Reviews</h2>
              {/* {review.length === 0 && <Message>No Reviews</Message>} */}
              <ListGroup variant="flush">
                {/* {review.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.user.username}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))} */}
                <ListGroup.Item>
                  {/* {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )} */}
                  {/* {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                      <div>
                        <h2>Write a customer review</h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="1">1- Bad</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>

                      <div>
                        <label />
                        <button className="primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link>to write a review
                    </Message>
                  )} */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )} 
    </>
  );
}

export default BookPage;
