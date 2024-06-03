import React from "react";
import { Link } from 'react-router-dom' 
import "./Card.css";

export const Card = ({
  imgSrc,  
  title,
  link,
}) => {
  return (
    <div className="card-container">      
      <img src={imgSrc} alt="" className="card-img"/>      
      {title && <h1 className="card-title">{title}</h1>}
      <Link className="card-btn" to={`/book-details/${link}`}>More</Link>      
    </div>
  );
};