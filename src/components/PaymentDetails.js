import {useState} from "react";
import {loadTotalPaymentsForEachSchedule} from "../services/reservationService";
import deleteImg from "../images/deleteAny.png";

export default function PaymentDetails({userId,userTypeId}){
    const [searchDate, setSearchDate] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');
    const [scheduleData, setScheduleData] = useState([]);
    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function formatDate(searchDate) {
        const date = new Date(searchDate);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()+1;

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }

    function searchPayments() {
        if(searchDate === '' || searchDate === null){
            setErrorMessage("Please select a date")
        }else{
            loadTotalPaymentsForEachSchedule(searchDate,userTypeId,userId).then(response => {
                console.log(response.data);
                setScheduleData(response.data);
            });
        }

    }

    return (
        <div>
            <h1>Payment Details</h1>

            <div className="boarder-style">
                <p style={{color:'red'}}>{errorMessage}</p>
                <label style={{padding :"10px"}} htmlFor="dateSearch">Schedule Date:</label>
                <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchPayments}> Search </button>


            </div>
            <div className="boarder-style" style={{marginTop:'10px'}}>
                {scheduleData.length > 0 ? (
                    <>
                        <div className="card-container">
                            {scheduleData.map((schedule, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}}>

                                    <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-start',marginLeft:'6%',marginTop:'6px'}}>

                                        <label style={{fontStyle:'italic'}}>{schedule.schedule.origin} - {schedule.schedule.destination} | {schedule.schedule.bus.busOwner.travelServiceName} | {schedule.schedule.bus.plateNo} | {schedule.schedule.tripStartTime} - {schedule.schedule.tripEndTime}</label>

                                    </div>

                                    <div style={{marginTop:'5px'}}>
                                        <table>
                                            <thead>
                                                <th>Booking No</th>
                                                <th>Seat No</th>
                                                <th>Price (Rs.)</th>
                                                <th>Discount (Rs.)</th>
                                                <th>Amount (Rs.)</th>
                                            </thead>

                                            <tbody>
                                            {schedule.seatReservations.map((seat, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{seat.seat.rowNo} - {seat.seat.columnNo}</td>
                                                    <td>{seat.reservation.schedule.ticketPrice}</td>
                                                    <td>{seat.discountAmount}</td>
                                                    <td>{seat.ticketPriceAfterDis}</td>
                                                </tr>
                                            ))}
                                                <tr>
                                                    <td>Total</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{schedule.totalDiscount}</td>
                                                    <td>{schedule.totalPayment}</td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>


                                </div>
                            ))}

                        </div>


                    </>


                ) : (
                    <div>
                        <h3>No schedule for the selected date.</h3>
                    </div>
                )}
            </div>
        </div>
    )
}