import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

import Login from './pages/login';
import Signup from './pages/signup';
import LandingPage from './pages/landing';
import Contactpage from './pages/contactpage';
import Reset from './pages/reset';
import Resend from './pages/resend';
import Homepage from './pages/homepage';
import Profile from './pages/profile';
import Page404 from './pages/page404';

function App() {
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  }  

  return (
      <HashRouter>
        <Routes>
          <Route path="/login" element={
            <Login />
          } />
          <Route path='/signup' element={
            <Signup />
          } />
          <Route path='/reset' element={
            <div><Reset /></div>
          } />
          <Route path='/resend' element={
            <div><Resend /></div>
          } />
          <Route path="/" element={
            <LandingPage />
          } />
          <Route path="/contact" element={
            <Contactpage />
          } />  
          <Route path='/home' element={
            <RequireAuth>
              <Homepage />
            </RequireAuth>
          } />
          <Route path='/profile' element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path="/*" element={
            <Page404 />
          } />
        </Routes>
      </HashRouter>
  );
}

export default App;