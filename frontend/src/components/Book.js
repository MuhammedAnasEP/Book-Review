import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


function Book({ book }) {
  return (
        <Card className='m-3 px-3 pt-2 rounded'>
            <Link to={`/book/${book.id}`}>
                <Card.Img src={book.cover_image} style={{ height: '200px' }} variant='top'/>
            </Link>

            <Card.Body>
                <Link to={`/book/${book.id}`}>
                    <Card.Title as='div'>
                        <strong>{book.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating
                        value={book.average_rating}
                        text={`${book.average_rating} Average reviews`}
                    />
                </Card.Text>

                <Card.Text as='h3'>{book.author}</Card.Text>
            </Card.Body>
        </Card>
    
  )
}

export default Book