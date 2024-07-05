import {useEffect, useState} from "react";
import {
    getFoundItemsAfterDate,

    loadFoundItems
} from "../services/lostFoundService";

export default function FoundItems(){

    const [foundItemList, setFoundItemList] = useState([]);
    const [searchDate, setSearchDate] = useState(null);
    const [errorMessage,setErrorMessage] = useState('');

    useEffect(() => {
        loadFoundItems().then(response => {
            setFoundItemList(response.data);
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

    function searchFoundItemsByDate() {
        getFoundItemsAfterDate(searchDate).then(response => {
            setFoundItemList(response.data);
        });
    }

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function formatDateToStr(incidentDate) {
        const date = new Date(incidentDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    return (
        <div>
            <h1>Found Items</h1>

            <div className="boarder-style">
                <p style={{color:'red'}}>{errorMessage}</p>
                <label style={{padding :"10px"}} htmlFor="dateSearch">After:</label>
                <input className="form-text-input" type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchFoundItemsByDate}> Search </button>


            </div>

            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                {foundItemList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {foundItemList.map((foundItem, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={foundItem.foundItemId}>


                                    <div>
                                        <p>On <b>{formatDateToStr(foundItem.incidentDate)}</b> at around <b>{foundItem.incidentTime}</b>, <b>{foundItem.itemColor}</b> color <b>{foundItem.itemName}</b> belonging to a person was found inside <b>{foundItem.scheduleTime}</b> highway bus {foundItem.busNo !== '' ? ('( Bus No -'+foundItem.busNo+')') : ''} from <b>{foundItem.scheduleOrigin}</b> to <b>{foundItem.scheduleDestination}</b>.</p>

                                        <p>It can be obtained by veryfying the identity.</p>
                                        <label style={{marginLeft:'0'}}><b>{foundItem.reporterName} - <b>{foundItem.contactNo}</b></b></label>

                                    </div>




                                </div>
                            ))}

                        </div>


                    </>


                ) : (
                    <div>
                        <h3>No Found Items.</h3>
                    </div>
                )}
            </div>
        </div>
    )
}