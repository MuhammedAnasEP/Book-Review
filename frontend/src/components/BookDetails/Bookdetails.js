import { useEffect } from 'react';
import './Bookdetails.css';
import { useParams } from "react-router";
import { useState } from "react";
import { backend, bookDetails, reviewList } from "../../constants/Constants";
import axios from '../../Axios'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Bookdetails(){
  const params = useParams()
  const [id, setID] = useState(params.bookId)
  const [img, setImg] = useState()
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [description, setDescription] = useState()
  const [reviewsdata, setReviewsdata] = useState()

  useEffect(() => {
    getBookDetails()
    reviews()         
  },[])

  const getBookDetails = () => {
    axios.get(bookDetails+id).then((respone)=>{
        setAuthor(respone.data.author)
        setImg(respone.data.cover_image)
        setTitle(respone.data.title)
        setDescription(respone.data.description)
    })
  }
  const reviews = () =>{
    axios.get(reviewList+id).then((respone)=>{
      setReviewsdata(respone.data)
    })
  }

    return(<>
    
    <Navbar></Navbar>

    <div className="container">
          <div className="book-details">
            <img src={backend+img} alt="Book Cover" className="book-cover"/>
            <div className="info">
              <h2></h2>
              <p className="author">{author}</p>
              <p className="description">{title}</p>
              <p className="description">{description}</p> 
              <h3>Reviews</h3>
              <ul className="reviews">
                {reviewsdata?.map((data)=>(

                <li>
                  <span className="rating">{data.rating} out of 5</span>
                  <p>{data.content}-{data.user.username}</p>
                </li>
                ))}
              </ul>
              <Link to={`/add-review/${id}`}>
                <button className="add-review">Add Review</button>
              </Link>
            </div>
          </div>
        </div>
    
    </>
    );
}

export default Bookdetails;