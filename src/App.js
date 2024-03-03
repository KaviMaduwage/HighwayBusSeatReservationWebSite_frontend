import './App.css';
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import {Route, Routes} from "react-router-dom";

function App() {


  return (
      <div className="App">
        <NavBar></NavBar>
          <div className="container">
              <Routes>
                  <Route path="/" element={ <Home/> }></Route>
                  <Route path="/about" element={ <About/> }></Route>
                  <Route path="/contact" element={ <Contact/> }></Route>
                  <Route path="/signIn" element={ <SignIn/> }></Route>
                  <Route path="/signUp" element={ <SignUp/> }></Route>
              </Routes>
          </div>


        <Footer></Footer>

      </div>
  );
}

export default App;
