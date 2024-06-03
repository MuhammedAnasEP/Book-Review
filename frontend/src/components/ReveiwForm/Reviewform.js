import { useEffect, useContext} from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { backend, bookDetails, createReview, reviewList } from "../../constants/Constants";
import axios from '../../Axios'
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";
import Navbar from "../Navbar/Navbar";


function Reviewform(){
    const params = useParams()
    const [id, setID] = useState(params.bookId)
    const [img, setImg] = useState()
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [description, setDescription] = useState()
    const [stars, setStars] = useState(1)
    const [review, setReview] = useState()
    const {user} = useContext(AuthContext)
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



    const addReview = (e) => {
      e.preventDefault()
        const formdata = new FormData();
        formdata.append('user', user.user_id)
        formdata.append('review', review)
        formdata.append('rating', stars)

        const body = formdata
      axios.post(createReview+id,body).then((response)=>{
        setReview("")
        Swal.fire({
          position: "center",
          type: "success",
          title: "Tank You for your review",
          showConfirmButton: false,
          timer: 1500,
      });
      })
    }

    console.log(stars,review)
    return(
        <>
        <Navbar id={id} />
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
              <div className="add-review-form">
                <h4>Add Your Review</h4>
                <form onSubmit={addReview}>  
                    <div className="rating-container">
                    <label for="rating">Rating:</label>
                    <select name="rating" id="rating" onChange={(e)=>{setStars(e.target.value)}} required>
                      <option value="1">1 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </div>
                  <div className="review-text">
                    <label for="review">Your Review:</label>
                    <textarea onChange={(e) => { setReview(e.target.value) }} value={review} name="review" id="review" rows="5" placeholder="Enter your review here" required></textarea>
                  </div>
                  <button className="add-review">Add Review</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default Reviewform