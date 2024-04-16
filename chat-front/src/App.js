import Login from "./Authentication/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Register from './Authentication/Register';
import ForgotPassword from "./Authentication/ForgotPassword";
import Chat from  "./Body/Chat";
import { useState } from "react";
import Protected from "./Authentication/Protected";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
    <Routes> 
      <Route  path="/" element={ <Login setUser={setUser} />} />
      <Route  path="register" element={ <Register setUser={setUser} />} />
      <Route  path="forgotpassword" element={ <ForgotPassword />} />
      <Route  
      path="chat" 
      element={
        <Protected user={user}>
      <Chat user={user} />
      </Protected>
      } />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
