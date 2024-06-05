import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/book/:id' element={<BookPage />}  />
      </Routes>
   </Router>
  );
}

export default App;
