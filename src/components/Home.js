import homeImg from "../images/home2.jpg"
import walletImg from "../images/wallet.png";
import reservationHome from "../images/homepage/reservationHome.jpg";
import scheduleHome from "../images/homepage/scheduleHome.png";
import userHome from "../images/homepage/userHome.png";
import routeHome from "../images/homepage/routeHome.jpg";
import notificationHome from "../images/homepage/notificationHome.jpg";
import onlinePaymentHome from "../images/homepage/onlinePaymentHome.jpg";
import discountHome from "../images/homepage/discountHome.jpg";
import lostFoundHome from "../images/homepage/lostFoundHome.jpg";
import emergencyHome from "../images/homepage/emergencyHome.jpg";
import feedbackHome from "../images/homepage/feedbackHome.jpg";
import reportHome from "../images/homepage/reportHome.jpg";
import {Schedule} from "@mui/icons-material";
import BusSchedule from "./BusSchedule";
import colors from "../colors";

export default function Home(){

    return (
        <div style={{padding: '20px'}}>
            <div className="home-screen" style={{ background: `url(${homeImg})`,padding:'0px', backgroundSize: 'cover', width: '100%', height: '300px', position: 'relative',borderRadius: '0 0 85% 85% / 30%' }}>
                <h3 style={{
                    fontFamily: 'Dancing Script',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize:'30px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                    Welcome ... <br/> Join With Us To Experience The Maximum
                </h3>
            </div>

            <div className="card-container">

                <div className="card" style={{width:'20%', textAlign: 'center'}}>

                    <img src={reservationHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '1px 0' }}>
                        <h4>Ticket Reservation/ Cancellation</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={scheduleHome} alt="" className="card-img"/>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Schedule Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={userHome} alt="" className="card-img"/>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>User Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={routeHome} alt="" className="card-img"/>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Route Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={notificationHome} alt="" className="card-img"/>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Notification Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={onlinePaymentHome} alt="" className="card-img"/>
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Online Payments</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={discountHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Discount Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={lostFoundHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Lost/Found Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={emergencyHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '1px 0' }}>
                        <h4>Emergency Alert Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={feedbackHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Feedback Management</h4>
                    </div>
                </div>

                <div className="card" style={{width:'20%',textAlign: 'center'}}>
                    <img src={reportHome} alt="" className="card-img" />
                    <div style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                        <h4>Report Generation</h4>
                    </div>
                </div>



            </div>

            <div className="boarder-style" style={{textAlign:'center',background: 'linear-gradient(#164863, cadetblue)'}}>
                <BusSchedule>

                </BusSchedule>
            </div>

        </div>
    )
}


