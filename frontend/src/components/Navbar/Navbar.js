import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import AuthContext from "../../context/AuthContext";
import { search } from "../../constants/Constants";
import axios from '../../Axios'
import { useNavigate } from "react-router-dom";



function Navbar({id, searchFlag}) {
    
    const {logoutUser} = useContext(AuthContext)

    const [query,setQuery] = useState()
    const [data, setData] = useState()
    const navigate = useNavigate()


    const searching = () => {
        axios.get(`${search}?search=${query}`).then((respone)=>
        {
            setData(respone.data[0])
            navigate('/',{state:{image:data.cover_image, id:data.id}})
        })
    }
    
  return (
    <div>

        <header>
            <figure className="brand">Responsive</figure>
            {searchFlag && (<div className="search-box">
                    <input type="text" id="searchInput" onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search..."/>
                    <button onClick={searching} className="search-button">search</button>
            </div>)}
            <nav className="menu">   
                <input type="checkbox" id="menuToggle"/>
                <label for="menuToggle" className="menu-icon"><i className="fa fa-bars"></i></label>


                <ul>
                    <Link to="/">
                        <a><li>Home</li></a>
                    </Link>
                    {id && (<Link to={`/book-details/${id}`}>
                        <a><li>Back</li></a>
                    </Link>) }                
                    <a onClick={logoutUser}><li>Logout</li></a>
                </ul>
            </nav>
        </header>

    </div>
  ); 
}

export default Navbar;