import './App.css';
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import {useState} from "react";
import {Route, Routes,useNavigate } from "react-router-dom";
import PassengerDashBoard from "./components/PassengerDashBoard";

function App() {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const updateLoggedIn = (value) => {
        setLoggedIn(value);
    };

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
        <NavBar isLoggedIn={loggedIn}></NavBar>
          <div className="container">
              <Routes>
                  <Route path="/" element={ <Home/> }></Route>
                  <Route path="/about" element={ <About/> }></Route>
                  <Route path="/contact" element={ <Contact/> }></Route>
                  <Route path="/signIn" element={ <SignIn confirmUserAccount={confirmUserAccount} loggedIn={loggedIn} updateLoggedIn={updateLoggedIn}/> }></Route>
                  <Route path="/signUp" element={ <SignUp/> }></Route>

                  {loggedIn ? (
                      <>
                          <Route path="/admin-dashboard" element={<AdminDashboard />} />
                          <Route path="/passenger-dashboard" element={<PassengerDashBoard loggedIn={loggedIn} />} />
                      </>
                  ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }
              </Routes>
          </div>


        <Footer></Footer>

      </div>
  );
}

export default App;
