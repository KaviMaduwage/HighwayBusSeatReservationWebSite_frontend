import './App.css';
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import {useEffect, useState} from "react";
import {Route, Routes,useNavigate } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Cookies from "js-cookie";
import Request from "./components/adminRelated/Request";
import Profile from "./components/Profile";

function App() {

     const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const cookieData = Cookies.get('auth');

        if (cookieData) {
            setUserData(JSON.parse(cookieData));
        }else{
            setUserData(null);
        }
    }, [Cookies.get('auth')]);



    const isAuthenticated = !!userData;

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
        <NavBar isLoggedIn={isAuthenticated} userData={userData}></NavBar>
          <div className="container">
              <Routes>
                  <Route path="/" element={ <Home/> }></Route>
                  <Route path="/about" element={ <About/> }></Route>
                  <Route path="/contact" element={ <Contact/> }></Route>
                  <Route path="/signIn" element={ <SignIn confirmUserAccount={confirmUserAccount} loggedIn={isAuthenticated}/> }></Route>
                  <Route path="/signUp" element={ <SignUp/> }></Route>


                  {(userData != null && userData.userTypeId === 1) ? (
                      <>
                          <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} />} />
                          <Route path="/requests" element={<Request/>}></Route>
                          <Route path="/profile" element={<Profile/>}></Route>
                      </>
                  ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }

                  {(userData != null && userData.userTypeId === 2) ? (
                          <>
                              <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} />} />
                          </>
                      ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }

                  {(userData != null && userData.userTypeId === 3) ? (
                          <>
                              <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} />} />
                              <Route path="/profile" element={<Profile/>}></Route>
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
