import {useEffect, useState} from "react";
import {
    getWalletAmountByUSerId,
    loadAdminSummaryDataForSummaryPage, loadBusCrewSummaryDataForSummaryPage,
    loadBusOwnerSummaryDataForSummaryPage
} from "../../services/userService";
import walletImg from "../../images/wallet.png";
import upcomingReservationImg from "../../images/upcomingReservationImg.jpg";
import cancelledResImg from "../../images/cancelledImg.png";
import userHome from "../../images/homepage/userHome.png";
import busesImg from "../../images/buses.jpg";
import driverImg from "../../images/drivers.png";
import todayImg from "../../images/todayImg.jpg";
import tomorrowImg from "../../images/tomorrowImg.jpg";
import conductorImg from "../../images/conductor.png";

import travelServiceImg from "../../images/travelService.jpg";
import {getUpcomingReservationsByUserId} from "../../services/reservationService";

export default function Summary({userTypeId,userId}){
    const [walletAmount, setWalletAmount] = useState(0);
    const [upcomingReservations ,setUpcomingReservations] = useState(0);
    const [cancelledReservations, setCancelledReservations] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBuses, setTotalBuses] = useState(0);
    const [totalTravelServices, setTotalTravelServices] = useState(0);
    const [totalupcomingReservations,setTotalupcomingReservations] = useState(0);

    const [totalDrivers,setTotalDrivers] = useState(0);
    const [totalConductors, setTotalConductors] = useState(0);

    const [todayTrips, setTodayTrips] = useState(0);
    const [tomorrowTrips, setTomorrowTrips] = useState(0);





    function findUpcomingReservations(userId) {
        getUpcomingReservationsByUserId(userId).then(response => {

            setUpcomingReservations(response.data.noOfReservations);
            setCancelledReservations(response.data.totalCancellations);
        })
    }

    useEffect(() => {
        if(userTypeId === 1){
            loadAdminSummaryData();
        }
        if(userTypeId === 2){
            loadBusOwnerSummaryData();
        }
        if(userTypeId === 3){
            findWalletAmount(userId);
            findUpcomingReservations(userId);
        }

        if(userTypeId === 4 || userTypeId === 5){
            loadBusCrewSummaryData(userId);
        }

    }, []);

    function loadAdminSummaryData(){
        loadAdminSummaryDataForSummaryPage().then(response => {
            let result = response.data;
            setTotalUsers(result.totalUsers);
            setTotalBuses(result.totalBuses);
            setTotalTravelServices(result.totalBusOwners);
            setTotalupcomingReservations(result.totalReservations);

        })
    }

    function loadBusOwnerSummaryData(){
        loadBusOwnerSummaryDataForSummaryPage(userId).then(response => {
            let result = response.data;
            setTotalUsers(result.totalUsers);
            setTotalDrivers(result.totalDrivers);
            setTotalConductors(result.totalConductors);
            setTotalBuses(result.totalBuses);
            setTotalupcomingReservations(result.totalReservations);

        })
    }
    function loadBusCrewSummaryData(){
        loadBusCrewSummaryDataForSummaryPage(userId).then(response => {
            let result = response.data;
            setTodayTrips(result.todayTrips);
            setTomorrowTrips(result.tomorrowTrips);


        })
    }

    function findWalletAmount(userId){
        getWalletAmountByUSerId(userId).then(response => {
            setWalletAmount(response.data);
        })
    }
    return (
        <div>
            {userTypeId === 1 ? (
                <div>
                    <h1>Admin home panel</h1>
                    <div className="card-container">
                        <div className="card">

                            <img src={userHome} alt="" className="card-img"/>
                            <h4>Total Users : {totalUsers}</h4>
                        </div>

                        <div className="card">
                            <img src={busesImg} alt="" className="card-img"/>
                            <h4>Total Buses : {totalBuses}</h4>
                        </div>

                        <div className="card">
                            <img src={travelServiceImg} alt="" className="card-img"/>
                            <h4>Total Travel Services : {totalTravelServices}</h4>
                        </div>

                        <div className="card">
                            <img src={upcomingReservationImg} alt="" className="card-img"/>
                            <h4>Upcoming Reservations : {totalupcomingReservations}</h4>
                        </div>




                    </div>
                </div>
            ) : <></>}

            {userTypeId === 2 ? (
                <div>
                    <h1>Bus Owner home panel</h1>
                    <div className="card-container">
                        <div className="card">

                            <img src={userHome} alt="" className="card-img"/>
                            <h4>Total Users : {totalUsers}</h4>
                        </div>

                        <div className="card">

                            <img src={driverImg} alt="" className="card-img"/>
                            <h4>Total Drivers : {totalDrivers}</h4>
                        </div>

                        <div className="card">

                            <img src={conductorImg} alt="" className="card-img"/>
                            <h4>Total Conductors : {totalConductors}</h4>
                        </div>

                        <div className="card">
                            <img src={busesImg} alt="" className="card-img"/>
                            <h4>Total Buses : {totalBuses}</h4>
                        </div>

                        <div className="card">
                            <img src={upcomingReservationImg} alt="" className="card-img"/>
                            <h4>Upcoming Reservations : {totalupcomingReservations}</h4>
                        </div>




                    </div>

                </div>
            ) : <></>}

            {userTypeId === 3 ? (
                <div>
                    <h1>Summary</h1>

                    <div className="card-container">
                        <div className="card">

                            <img src={walletImg} alt="" className="card-img"/>
                            <h4>Wallet amount : {walletAmount}</h4>
                        </div>

                        <div className="card">
                            <img src={upcomingReservationImg} alt="" className="card-img"/>
                            <h4>Upcoming Reservations : {upcomingReservations}</h4>
                        </div>

                        <div className="card">
                            <img src={cancelledResImg} alt="" className="card-img"/>
                            <h4>Total Cancelled Reservations : {cancelledReservations}</h4>
                        </div>



                    </div>

                </div>
            ) : <></>}

            {userTypeId === 4 || userTypeId === 5 ? (
                <div>
                    <h1>Bus Crew home panel</h1>
                    <div className="card-container">
                        <div className="card">

                            <img src={todayImg} alt="" className="card-img"/>
                            <h4>Today Trips : {todayTrips}</h4>
                        </div>

                        <div className="card">
                            <img src={tomorrowImg} alt="" className="card-img"/>
                            <h4>Tomorrow Trips : {tomorrowTrips}</h4>
                        </div>

                    </div>
                </div>
            ) : <></>}

        </div>
    )
}