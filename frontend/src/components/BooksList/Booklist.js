import { useState, useEffect } from "react";
import { Card } from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import { backend, bookList } from "../../constants/Constants";
import axios from '../../Axios'
import './Booklist.css'
import { useLocation } from "react-router";

function Booklist(){
    const [book, setBook] = useState()
    const {state} = useLocation()
    console.log(state)

    useEffect(() => {
        getBooks()
      },[])

      const getBooks = () => {
        axios.get(bookList).then((respone)=>{
            setBook(respone.data)
        })
      }

      
    return (
        <div>
            <Navbar searchFlag={true}/>
            <div className="list">
                <div className="col">
                
                    {state ?<div> <Card imgSrc={backend+ state.image} link={state.id}/></div>: book?.map((book)=>
                        
                        <Card imgSrc={backend+book.cover_image} link={book.id}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Booklist;