import {useState} from "react";

export default function ReservationHistoryReport({userId}){
    const [searchDate, setSearchDate] = useState();
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
    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function generateReport() {

    }

    return (
        <div>
            <h1>Reservation History Report</h1>
            <div className="boarder-style" style={{width:'50%', display:'flex', flexDirection:'column',margin:'auto',textAlign:'center'}}>

                <div style={{display:'flex',flexDirection:'row',marginLeft:'15%'}}>
                    <label style={{padding :"10px"}} htmlFor="dateSearch">Trip Date:</label>
                    <input className="form-text-input" style={{width:'50%'}} type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                </div>

                <div style={{display:'flex',flexDirection:'row',marginLeft:'15%'}}>
                    <button onClick={generateReport}>Generate Report</button>
                </div>


            </div>
        </div>
    );
}