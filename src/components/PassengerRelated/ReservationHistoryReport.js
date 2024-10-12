import {useState} from "react";
import {generateUserReservationHistoryReport} from "../../services/reportService";

export default function ReservationHistoryReport({userId}){
    const [fromDate, setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const [errorMessage, setErrorMessage] = useState();
    function formatDate(searchDate) {
        const date = new Date(searchDate);
        date.setDate(date.getDate() + 1);

        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    }
    function handleFromDate(e) {
        setFromDate(e.target.value);
    }

    function handleToDate(e) {
        setToDate(e.target.value);
    }

    function generatePDF(response, pdfName) {
        if (response.status === 200) {
            // Create a blob from the array buffer
            const blob = new Blob([response.data], { type: 'application/pdf' });
            console.log(response.data);
            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);
            // Create an anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = pdfName;
            // Append the anchor element to the body and click it
            document.body.appendChild(a);
            a.click();
            // Cleanup
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } else {

            setErrorMessage("Failed to generate the report");
        }

    }

    function generateReport() {
        if(fromDate && toDate ){
            generateUserReservationHistoryReport(userId,fromDate,toDate).then(response => {
                let pdfName = "PassengerReservationReport.pdf";
                generatePDF(response, pdfName);
            });
        }else{

            setErrorMessage("Please fill all the mandatory fields marked in asterics mark.");
        }

    }

    return (
        <div>
            <h1>Reservation History Report</h1>
            <div className="boarder-style" style={{width:'50%', display:'flex', flexDirection:'column',margin:'auto',textAlign:'center'}}>

                <h4 style={{color:"red"}}>{errorMessage}</h4>
                <div style={{display:'flex',flexDirection:'row',paddingBottomad:'5%',textAlign:"center"}}>
                    <label style={{padding :"10px"}} htmlFor="dateSearch">From:</label>
                    <input className="form-text-input" style={{width:'50%'}} type="date"  id="dateFrom" onChange={handleFromDate} value={fromDate ? formatDate(fromDate) : ''}/>
                    <label style={{padding :"10px"}} htmlFor="dateSearch">To:</label>
                    <input className="form-text-input" style={{width:'50%'}} type="date"  id="dateTo" onChange={handleToDate} value={toDate ? formatDate(toDate) : ''}/>

                </div>


                <div style={{display:'flex',flexDirection:'row',justifyContent:"center",marginTop:'2%'}}>
                    <button onClick={generateReport}>Generate Report</button>
                </div>


            </div>
        </div>
    );
}