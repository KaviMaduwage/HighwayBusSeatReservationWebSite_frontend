import {useEffect, useRef, useState} from "react";
import {
    cancelReservations,
    findReservationsByUserId,
    findReservedSeatsByReservationId,
    generateTicketPDF
} from "../../services/reservationService";
import {generateBusOwnerListReport} from "../../services/reportService";

export default function MyReservations({userId}){
    const [reservationList, setReservationList] = useState([]);
    const [reservationCancellationPanel,setReservationCancellationPanel] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const reservationPanelRef = useRef(null);

    const [selectedReservationDate,setSelectedReservationDate] = useState('');
    const [selectedOrigin,setSelectedOrigin] = useState('');
    const [selectedDestination,setSelectedDestination] = useState('');
    const [selectedNoOfSeats,setSelectedNoOfSeats] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedResId,setSelectedResId] = useState('');
    const [reservedSeatList,setReservedSeatList] = useState([]);
    const [isCancellationButtonsEnable, setCancellationButtonsEnable] = useState(true);
    const [checkedSeats, setCheckedSeats] = useState([]);

    useEffect(() => {

        loadReservationsByUserId(userId);
    }, []);

    useEffect(() => {
        if (reservationCancellationPanel) {
            reservationPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [reservationCancellationPanel]);

    function loadReservationsByUserId(userId) {
        findReservationsByUserId(userId).then(response => {
            setReservationList(response.data);
        })
    }

    function generatePDF(response, pdfName) {
        if (response.status === 200) {
            // Create a blob from the array buffer
            const blob = new Blob([response.data], { type: 'application/pdf' });
            //console.log(response.data);
            // Create a URL for the blob
            const reportUrl = window.URL.createObjectURL(blob);
            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = reportUrl;
            a.download = pdfName;
            // Append the anchor element to the body and click it
            document.body.appendChild(a);
            a.click();
            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(reportUrl);
        } else {

            setErrorMessage("Failed to generate the report");
        }

    }

    async function generateTicket(reservationId) {
        try {

            generateTicketPDF(reservationId).then(response => {
                let pdfName = "ticket.pdf";

                generatePDF(response, pdfName);
            });


        } catch (error) {
            // Handle error
            setErrorMessage("Error generating the report: " + error.message);
        }
    }


    function cancellation(tripDateStr,timeStr) {
        const tripDate = new Date(tripDateStr+" "+timeStr);
        const today = new Date();


        const lastTime = new Date(tripDate.getTime() - 2 * 60 * 60 * 1000);

        return lastTime > today;

    }

    function showReservationCancellationPanel(revId,tripDateStr, origin,destination,startTime,noOfSeats) {

        findReservedSeatsByReservationId(revId).then(response => {
            setReservedSeatList(response.data);
            setReservationCancellationPanel(true);
            setSelectedReservationDate(tripDateStr);
            setSelectedOrigin(origin);
            setSelectedDestination(destination);
            setSelectedStartTime(startTime);
            setSelectedNoOfSeats(noOfSeats);
            setSelectedResId(revId);
            setCancellationButtonsEnable(true);
        })
    }

    function handleCancelSeatSelection(event) {
        const { value, checked } = event.target;
        if (checked) {
            setCheckedSeats([...checkedSeats, value]);
        } else {
            setCheckedSeats(checkedSeats.filter(id => id !== value));
        }

    }

    function cancelReservation(type) {
        if(checkedSeats.length > 0){
            setErrorMessage('');
            cancelReservations(type,checkedSeats,userId).then(response => {
                setSuccessMessage(response.data);
                setReservationCancellationPanel(false);
                loadReservationsByUserId(userId);

            });

        }else{
            setErrorMessage("Please select at least one seat to cancel the reservation.")
        }
    }

    return(
        <div>
            <h1>My Reservations</h1>
            <div className="boarder-style" style={{marginTop:'30px'}}>
                <h4 style={{marginLeft:'0'}}>Cancellation of any ticket is allowed prior to 2h of the trip start.</h4>
                <h2 style={{color:'red'}}>{successMessage}</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Reserve Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Time</th>
                        <th>No of Seats</th>
                        <th></th>
                    </tr>

                    </thead>

                    <tbody>
                        {reservationList === 0 ?
                        (<tr>
                            <td>No Reservations</td>
                        </tr>)
                        :
                            (
                                reservationList.map(reservation => (
                                    <tr key={reservation.reservation.reservationId}>
                                        <td>{reservation.reservation.schedule.tripDateStr}</td>
                                        <td>{reservation.reservation.schedule.origin}</td>
                                        <td>{reservation.reservation.schedule.destination}</td>
                                        <td>{reservation.reservation.schedule.tripStartTime}</td>
                                        <td>{reservation.noOfSeats}</td>
                                        <td>
                                            <input type="button" value="Download Ticket" onClick={() => generateTicket(reservation.reservation.reservationId)}/>
                                            {cancellation(reservation.reservation.schedule.tripDateStr,reservation.reservation.schedule.tripStartTime) ? (
                                                <>
                                                    <input type="button" value="Cancel Reservation" onClick={() => showReservationCancellationPanel(reservation.reservation.reservationId,reservation.reservation.schedule.tripDateStr,
                                                        reservation.reservation.schedule.origin,reservation.reservation.schedule.destination,reservation.reservation.schedule.tripStartTime,reservation.noOfSeats)}/>
                                                </>
                                            )

                                            :
                                            (
                                            <></>
                                            )
                                            }

                                        </td>

                                    </tr>
                                ))
                            )
                        }

                    </tbody>
                </table>
            </div>
            <h3 style={{color:'red'}}>{errorMessage}</h3>
            {reservationCancellationPanel ? (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={reservationPanelRef}>
                    <h3>Cancell A Reservation</h3>

                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>Trip Date : </span>{selectedReservationDate}</label>
                        <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>Origin : </span>{selectedOrigin}</label>
                        <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>Destination : </span>{selectedDestination}</label>
                        <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>Start Time : </span>{selectedStartTime}</label>
                        <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>No Of Seats : </span>{selectedNoOfSeats}</label>

                        <div style={{display:'flex', flexDirection:'row', margin:'auto'}}>

                            <label style={{marginBottom:'10px'}}><span style={{fontWeight: 'bold'}}>Reserved Seats : </span></label>

                            {reservedSeatList.length === 0 ?
                            <></>

                            :
                                (reservedSeatList.map(reservationSeat => (
                                    <label >
                                        <input type="checkbox" value={reservationSeat.seatReservationId} onChange={handleCancelSeatSelection}/> {reservationSeat.seat.rowNo} - {reservationSeat.seat.columnNo}
                                    </label>
                                    )

                                ))}
                        </div>

                    </div>

                    <div>
                        <label style={{color:'red'}}>
                            <input type="checkbox" onClick={() => setCancellationButtonsEnable(!isCancellationButtonsEnable)}/> Are you sure you want to cancel the selected reservations?
                        </label>
                    </div>

                    <div style={{marginTop:"10px"}}>
                            <span style={{padding:'10px'}}>
                                <button id="addToWalletButton" disabled={isCancellationButtonsEnable} onClick={() => cancelReservation("wallet")}>Add To Wallet</button>
                            </span>

                        {/*<span style={{padding:'10px'}}>*/}
                        {/*        <button id="needRefundButton" disabled={isCancellationButtonsEnable} onClick={() => cancelReservation("refund")}>Need Refund</button>*/}
                        {/*    </span>*/}
                        <span style={{padding:'10px'}}>
                                <button onClick={() => setReservationCancellationPanel(false)}>Close</button>
                            </span>


                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}