import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateListing from "./pages/createListings.jsx";
import EditListing from "./pages/EditListing.jsx";
import MyListings from "./pages/MyListing.jsx";
import Navbar from "./components/Navbar";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/update/:id" element={<EditListing/>}/>
         <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}

export default App;