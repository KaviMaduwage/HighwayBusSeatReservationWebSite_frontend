import './App.css';
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import {useState} from "react";
import {Route, Routes,useNavigate } from "react-router-dom";

function App() {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const confirmUserAccount = async (confirmationToken) => {
        try {
            const response = await fetch(`/confirm-account?token=${confirmationToken}`);
            if (response.ok) {
                setMessage('Confirmation successful');
                navigate('/signIn'); // Redirect to the sign-in page
            } else {
                const data = await response.json();
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error confirming account:', error);
            setMessage('Error confirming account');
        }
    };


  return (
      <div className="App">
        <NavBar></NavBar>
          <div className="container">
              <Routes>
                  <Route path="/" element={ <Home/> }></Route>
                  <Route path="/about" element={ <About/> }></Route>
                  <Route path="/contact" element={ <Contact/> }></Route>
                  <Route path="/signIn" element={ <SignIn confirmUserAccount={confirmUserAccount}/> }></Route>
                  <Route path="/signUp" element={ <SignUp/> }></Route>
                  <Route path="/dashboard" element={<Dashboard/> }></Route>
              </Routes>
          </div>


        <Footer></Footer>

      </div>
  );
}

export default App;
