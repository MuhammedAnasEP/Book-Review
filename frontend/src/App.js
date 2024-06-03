import {Routes, Route } from "react-router-dom";
import Booklist from "./components/BooksList/Booklist";
import Bookdetails from "./components/BookDetails/Bookdetails";
import Reviewform from "./components/ReveiwForm/Reviewform";
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
      <>
        
        <AuthProvider>


        <Routes>
          <Route element = {<PrivateRoute/>}>
              <Route path='/' element = {<Booklist/>}/>
              <Route path='/book-details/:bookId' element = {<Bookdetails />}/>
              <Route path='/add-review/:bookId' element = {<Reviewform />}/>
          </Route>
          <Route path='/login'  element = {<Login/>}/>
          <Route path="/signup" element = {<Signup/>}/>
        </Routes>
        </AuthProvider>
      </>
  );
}

export default App;
