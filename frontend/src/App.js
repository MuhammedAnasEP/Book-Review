import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import AuthMiddleware from './middleware/auth';
import PersistLogin from './components/PersistLogin';

function App() {
  return (    
    <Routes>
          <Route path='/' element={<PersistLogin />}>
            <Route element={<AuthMiddleware />} >
              <Route path='login' element={<LoginPage />}  />
              <Route path='register' element={<RegisterPage />}  />
            </Route>
            <Route element={<ProtectiveRoutes />}>
              <Route index element={<HomePage />} />
              <Route path='book/:id' element={<BookPage />}  />
            </Route>
          </Route>
    </Routes>
  );
}

export default App;
