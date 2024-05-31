import SideBar from "./SideBar";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import "../sideBar.css";
import "../styles.css";
import Home from "./Home";
import Request from "./adminRelated/Request";
import Profile from "./Profile";
import ViewStaff from "./BusOwnerRelated/ViewStaff";
import PasswordReset from "./PasswordReset";
import Bus from "./Bus";
import BusRoute from "./BusRoute";
import BusSchedule from "./BusSchedule";
import Cart from "./PassengerRelated/Cart";
import TodayTrip from "./BusCrewRelated/TodayTrip";
import TripHistory from "./TripHistory";
import AdminReports from "./Reports/AdminReports";
import MyReservations from "./PassengerRelated/MyReservations";
import ReservationHistoryReport from "./PassengerRelated/ReservationHistoryReport";
import Summary from "./PassengerRelated/Summary";


export default function DashBoard({ userName, userTypeId, userId }) {
    const contentRef = useRef(null);
    const [selectedPage, setSelectedPage] = useState('Summary');

    console.log(selectedPage);

    useLayoutEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.clientHeight;
            const sidebar = document.querySelector(".sideBar");
            sidebar.style.height = `${contentHeight}px`;
        }
    }, [contentRef]);

    return (
        <div className="main_sideBar_dshboard" style={{ display: "flex", height: "100vh" }}>
            <SideBar userTypeId={userTypeId} setSelectedPage={setSelectedPage} />
            <div className="dashBoard-container" style={{ flex: "1", padding: "20px", overflow: "auto" }}>

                {selectedPage === 'Home' && <Home />}
                {selectedPage === 'Summary' && <Summary userTypeId={userTypeId} userId={userId}/>}
                {selectedPage === 'Accept Requests' && <Request />}
                {selectedPage === 'View Profile' && <Profile userTypeId={userTypeId} userId={userId}/>}
                {selectedPage === 'View Staff' && <ViewStaff/>}
                {selectedPage === 'Reset Password' && <PasswordReset/>}
                {selectedPage === 'View Bus Details' && <Bus userTypeId={userTypeId} userId={userId}/>}
                {selectedPage === 'View Routes' && <BusRoute userTypeId={userTypeId}/>}
                {selectedPage === 'View Bus Schedule' && <BusSchedule userTypeId={userTypeId} userId={userId} />}

                {selectedPage === 'Cart' && <Cart userId={userId}/>}
                {selectedPage === 'Today\'s Trip' && <TodayTrip userId={userId}/>}
                {selectedPage === 'Trip History' && <TripHistory userId={userId} userTypeId={userTypeId}/>}
                {selectedPage === 'Generate Reports' && <AdminReports/>}
                {selectedPage === 'My Reservations' && <MyReservations userId={userId}/>}
                {selectedPage === 'Travel History Report' && <ReservationHistoryReport userId={userId}/>}

            </div>
        </div>
    );
}
