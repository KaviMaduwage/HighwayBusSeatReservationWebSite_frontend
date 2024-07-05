import {useEffect, useState} from "react";
import {getLostItemsAfterDate, loadLostItems} from "../services/lostFoundService";

export default function LostItems(){
    const [lostItemList, setLostItemList] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');


    useEffect(() => {
        loadLostItems().then(response => {
            setLostItemList(response.data);
        });
    }, []);

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

    function formatDateToStr(incidentDate) {
        const date = new Date(incidentDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    function searchLostItemsByDate() {
        getLostItemsAfterDate(searchDate).then(response => {
           setLostItemList(response.data);
        });
    }

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    return (
        <div>
            <h1>Lost Items</h1>

            <div className="boarder-style">
                <p style={{color:'red'}}>{errorMessage}</p>
                <label style={{padding :"10px"}} htmlFor="dateSearch">After:</label>
                <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchLostItemsByDate}> Search </button>


            </div>

            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                {lostItemList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {lostItemList.map((lostItem, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={lostItem.lostItemId}>


                                    {(lostItem.busNo !== null) ?
                                        <div>
                                            <p>On <b>{formatDateToStr(lostItem.incidentDate)}</b> at about <b>{lostItem.incidentTime}</b>, a <b>{lostItem.itemColor}</b> color <b>{lostItem.itemName}</b> was lost in <b>{lostItem.scheduleTime} {lostItem.scheduleOrigin}</b> to <b>{lostItem.scheduleDestination}</b> highway bus ( <b>{lostItem.busNo}</b>)  </p>
                                        </div>
                                        :
                                        <div>
                                            <p>On <b>{formatDateToStr(lostItem.incidentDate)}</b> at about <b>{lostItem.incidentTime}</b>, a <b>{lostItem.itemColor}</b> color <b>{lostItem.itemName}</b> was lost in <b>{lostItem.scheduleTime} {lostItem.scheduleOrigin}</b> to <b>{lostItem.scheduleDestination}</b> highway bus  </p>
                                        </div>

                                    }
                                        <p>Let me know if you have any information.</p>

                                        <label style={{marginLeft:'0'}}><b>{lostItem.reporterName} - <b>{lostItem.contactNo}</b></b></label>






                                </div>
                            ))}

                        </div>


                    </>


                ) : (
                    <div>
                        <h3>No Lost Items.</h3>
                    </div>
                )}
            </div>
        </div>


    )
}