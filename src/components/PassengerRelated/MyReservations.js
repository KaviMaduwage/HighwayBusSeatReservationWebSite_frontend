import {useEffect, useState} from "react";
import {findReservationsByUserId, generateTicketPDF} from "../../services/reservationService";
import {generateBusOwnerListReport} from "../../services/reportService";

export default function MyReservations({userId}){
    const [reservationList, setReservationList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        loadReservationsByUserId(userId);
    }, []);

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
            console.log("rev id :"+reservationId);
            generateTicketPDF(reservationId).then(response => {
                let pdfName = "ticket.pdf";
                console.log(response);
                generatePDF(response, pdfName);
            });


        } catch (error) {
            // Handle error
            setErrorMessage("Error generating the report: " + error.message);
        }
    }

    // async function generateTicket(reservationId) {
    //     console.log("rev id :"+reservationId);
    //     generateTicketPDF(reservationId).then(response => {
    //         let pdfName = "ticket.pdf";
    //         console.log(response);
    //         generatePDF(response, pdfName);
    //     })
    // }

    return(
        <div>
            <h1>My Reservations</h1>
            <div className="boarder-style" style={{marginTop:'30px'}}>
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
                                        </td>

                                    </tr>
                                ))
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}