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
import ViewStaff from "./components/BusOwnerRelated/ViewStaff";
import PasswordReset from "./components/PasswordReset";
import Bus from "./components/Bus";
import BusRoute from "./components/BusRoute";
import BusSchedule from "./components/BusSchedule";
import Cart from "./components/PassengerRelated/Cart";
import TodayTrip from "./components/BusCrewRelated/TodayTrip";
import TripHistory from "./components/TripHistory";
import PaymentSuccess from "./components/PassengerRelated/PaymentSuccess";
import MyReservations from "./components/PassengerRelated/MyReservations";

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
                          <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} userId={userData.userId} />} />
                          <Route path="/requests" element={<Request/>}></Route>
                          <Route path="/profile" element={<Profile/>}></Route>
                          <Route path="/resetPassword" element={<PasswordReset/>}></Route>
                          <Route path="/busRoute" element={<BusRoute/>}></Route>
                          <Route path="/busSchedule" element={<BusSchedule/>}></Route>
                          <Route path="/tripHistory" element={<TripHistory/>}></Route>
                      </>
                  ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }

                  {(userData != null && userData.userTypeId === 2) ? (
                          <>
                              <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} userId={userData.userId}/>} />
                              <Route path="/viewStaff" element={<ViewStaff/>}></Route>
                              <Route path="/profile" element={<Profile/>}></Route>
                              <Route path="/resetPassword" element={<PasswordReset/>}></Route>
                              <Route path="/bus" element={<Bus/>}></Route>
                              <Route path="/busRoute" element={<BusRoute/>}></Route>
                              <Route path="/busSchedule" element={<BusSchedule/>}></Route>
                              <Route path="/tripHistory" element={<TripHistory/>}></Route>
                          </>
                      ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }

                  {(userData != null && userData.userTypeId === 3) ? (
                          <>
                              <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} userId={userData.userId}/>} />
                              <Route path="/profile" element={<Profile/>}></Route>
                              <Route path="/resetPassword" element={<PasswordReset/>}></Route>
                              <Route path="/busSchedule" element={<BusSchedule/>}></Route>
                              <Route path="/cart" element={<Cart/>}></Route>


                          </>
                      ) :
                      <>
                          <Route path="*" element={<SignIn/>}></Route>
                      </>
                  }

                  {(userData != null && (userData.userTypeId === 4 || userData.userTypeId === 5)) ? (
                          <>
                              <Route path="/dashboard" element={<DashBoard userName={userData.userName} userTypeId={userData.userTypeId} userId={userData.userId}/>} />
                              <Route path="/profile" element={<Profile/>}></Route>
                              <Route path="/resetPassword" element={<PasswordReset/>}></Route>
                              <Route path="/busSchedule" element={<BusSchedule/>}></Route>
                              <Route path="/todaySchedule" element={<TodayTrip/>}></Route>
                              <Route path="/tripHistory" element={<TripHistory/>}></Route>
                              <Route path="/myReservations" element={<MyReservations/>}></Route>
                          </>
                      ) :
                      <>
                          <Route path="/payment/success" element={<PaymentSuccess/>}></Route>
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
