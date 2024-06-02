import {useEffect, useState} from "react";
import {getWalletAmountByUSerId} from "../../services/userService";
import walletImg from "../../images/wallet.png";
import upcomingReservationImg from "../../images/upcomingReservationImg.jpg";
import cancelledResImg from "../../images/cancelledImg.png";
import {getUpcomingReservationsByUserId} from "../../services/reservationService";

export default function Summary({userTypeId,userId}){
    const [walletAmount, setWalletAmount] = useState(0);
    const [upcomingReservations ,setUpcomingReservations] = useState(0);
    const [cancelledReservations, setCancelledReservations] = useState(0);

    function findUpcomingReservations(userId) {
        getUpcomingReservationsByUserId(userId).then(response => {

            setUpcomingReservations(response.data.noOfReservations);
            setCancelledReservations(response.data.totalCancellations);
        })
    }

    useEffect(() => {
        if(userTypeId === 3){
            findWalletAmount(userId);
            findUpcomingReservations(userId);
        }

    }, []);

    function findWalletAmount(userId){
        getWalletAmountByUSerId(userId).then(response => {
            setWalletAmount(response.data);
        })
    }
    return (
        <div>
            {userTypeId === 1 ? (
                <div>
                    <h3>Admin home panel</h3>
                </div>
            ) : <></>}

            {userTypeId === 2 ? (
                <div>
                    <h3>Bus Owner home panel</h3></div>
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

            {userTypeId === 4 ? (
                <div>
                    <h3>Bus Crew home panel</h3>
                </div>
            ) : <></>}

        </div>
    )
}