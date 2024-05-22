import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Compoments/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Compoments/Dashboard';
import Appoinment from './Compoments/Appoinment';




function App() {
  return (
   <>
    <ToastContainer 
    position="bottom-left"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={< Login/>} />
            <Route path="/dashboard" element={< Dashboard/>} />
            <Route path="/report" element={<Appoinment/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
