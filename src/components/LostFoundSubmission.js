import {RadioGroup} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import ReactDatetimeClass from "react-datetime";
import citiesData from "../data/cities.json";
import {saveFoundItem, saveLostItem} from "../services/lostFoundService";

export default function LostFoundSubmission({userTypeId,userId}){

    const responsePanelRef = useRef(null);


    const [name,setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [busNo, setBusNo] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemColor, setItemColor] = useState('');

    const [lostFoundType,setLostFoundType] = useState('');
    const [incidentDate,setIncidentDate] = useState(null);
    const [incidentTime, setIncidentTime] = useState(null);
    const [scheduleTime,setScheduleTime] = useState(null);
    const [cities, setCities] = useState([]);
    const [destination, setDestination] = useState('');
    const [origin, setOrigin] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showLostItemDesPreview, setShowLostItemDesPreview] = useState(false);
    const [showFoundItemDesPreview, setShowFoundItemDesPreview] = useState(false);



    useEffect(() => {
        setCities(citiesData);
    }, []);
    function formatDate(dateStr) {

        const date = new Date(dateStr);
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
    function handleLostFoundType(e) {
        setLostFoundType(e.target.value);
    }

    function handleIncidentDate(e) {
        setIncidentDate(e.target.value);
    }

    function handleIncidentTime(selectedTime) {
        const formattedTime = selectedTime.format('hh:mm A');
        setIncidentTime(formattedTime);
    }

    function handleScheduleTime(selectedTime) {
        const formattedTime = selectedTime.format('hh:mm A');
        setScheduleTime(formattedTime);
    }

    function handleDestination(e) {
        setDestination(e.target.value);
    }

    function handleOrigin(e) {
        setOrigin(e.target.value);
    }

    function showPreviewPanel() {
        let mobileNoRegex = /^\d*$/;
        console.log(incidentTime);

        if(lostFoundType === '' || name === '' || contactNo === '' || incidentDate === '' || incidentTime === null || scheduleTime === null ||
                origin === '' || destination === '' || itemName === '' || itemColor === ''){
            setSuccessMessage('');
            setErrorMessage("Please fill all the mandatory data marked in asterisk mark(*).");
            responsePanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }else if(!mobileNoRegex.test(contactNo) || (contactNo.length < 10 || contactNo.length>10)){
            setSuccessMessage('');
            setErrorMessage("Please enter 10 digits mobile no.");
            responsePanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }else if(new Date(incidentDate) > new Date()){
            setErrorMessage("Incident date should not be a future date.");
            responsePanelRef.current.scrollIntoView({ behavior: 'smooth' });
        } else{
            setErrorMessage('');

            if(lostFoundType === "Lost"){

                setShowLostItemDesPreview(true);
                setShowFoundItemDesPreview(false);
            }else{
                setShowLostItemDesPreview(false);
                setShowFoundItemDesPreview(true);
            }


        }


    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleContactNo(e) {
        setContactNo(e.target.value);
    }

    function handleBusNo(e) {
        setBusNo(e.target.value);
    }

    function handleItemName(e) {
        setItemName(e.target.value);
    }

    function handleItemColor(e) {
        setItemColor(e.target.value);
    }

    function resetFields() {
        setName('');
        setContactNo('');
        setLostFoundType('');
        setIncidentTime(null);
        setIncidentDate(null);
        setScheduleTime(null);
        setBusNo('');
        setOrigin('');
        setDestination('');
        setItemName('');
        setItemColor('');

        console.log("schedule time -"+scheduleTime);
    }

    function submitLostFound() {
        let lostFound = {reporterName: name,reportedDate: new Date(),contactNo:contactNo,incidentDate:(formatDate(incidentDate)),incidentTime:incidentTime,
            scheduleTime:scheduleTime,scheduleOrigin:origin,scheduleDestination:destination,itemName:itemName,busNo:busNo,itemColor:itemColor,user:{userId:userId}};
        if(lostFoundType === 'Lost'){
            saveLostItem(lostFound).then(response => {
                setSuccessMessage(response.data);
                setShowLostItemDesPreview(false);
                resetFields();


            });

        }else if(lostFoundType === 'Found'){
            saveFoundItem(lostFound).then(response => {
                setSuccessMessage(response.data);
                setShowFoundItemDesPreview(false);
                resetFields();
            });

        }
    }

    return (
        <div>
            <h1>Report Lost/Found Items</h1>
            <div style={{marginBottom:'20px'}} ref={responsePanelRef}>
                <label style={{color:'red'}}>{errorMessage}</label>
                <label>{successMessage}</label>
            </div>

            <div className="boarder-style">
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                        <div className="field-holder" style={{textAlign:'left'}}>


                            <label style={{paddingBottom:'20px'}}  htmlFor="lostOrFound"><span style={{color:'red'}}> *</span>Type :</label>
                            <RadioGroup id="lostOrFound" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                        <span style={{ padding:'15px'}}>
                                            <input type="radio" name="lostOrFound" value="Lost" id="lostLabel" onChange={handleLostFoundType} checked={lostFoundType === 'Lost'}/>
                                            <label htmlFor="lostLabel">Lost</label>
                                            <input type="radio" name="lostOrFound" value="Found" id="foundLabel" onChange={handleLostFoundType}  checked={lostFoundType === 'Found'}/>
                                            <label htmlFor="foundLabel">Found</label>
                                        </span>

                            </RadioGroup>


                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="name" onChange={handleName} value={name} required/>
                            <label className="form-label" htmlFor="name"><span style={{color:'red'}}> *</span> Name :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="number" id="contactNo" onChange={handleContactNo} value={contactNo} required/>
                            <label className="form-label" htmlFor="contactNo"><span style={{color:'red'}}> *</span>Contact number to be published :</label>
                        </div>

                        <div className="field-holder">
                            <input className="form-input" type="date" id="lostFoundDate" onChange={handleIncidentDate} value={incidentDate ? formatDate(incidentDate) : ''}/>
                            <label className="form-label" style={{top:'-25px', fontSize:'0.75rm'}} htmlFor="lostFoundDate"><span style={{color:'red'}}> *</span> Incident Date :</label>
                        </div>

                        <div  className="field-holder" style={{marginTop:'10px'}}>
                            <label className="form-label" style={{top:'-35px', fontSize:'0.75rm'}} htmlFor="incidentTime"><span style={{color:'red'}}>*</span>Incident Time (nearly):</label>

                            <ReactDatetimeClass


                                dateFormat={false}
                                timeFormat="hh:mm A"
                                inputProps={{ className: 'form-input', style:{padding:"10px", height:"fit-content", width:"50%"} }}
                                value={incidentTime}
                                onChange={handleIncidentTime}>

                            </ReactDatetimeClass>

                        </div>
                    </div>
                    <div style={{display:'1',flexDirection:'column',width:'50%'}}>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="busNo" required value={busNo} onChange={handleBusNo}/>
                            <label className="form-label" htmlFor="busNo">Bus No :</label>
                        </div>

                        <div  className="field-holder" style={{marginTop:'30px'}}>
                            <label className="form-label" style={{top:'-35px', fontSize:'0.75rm'}} htmlFor="ScheduleTime"><span style={{color:'red'}}>*</span>Schedule Time:</label>

                            <ReactDatetimeClass


                                dateFormat={false}
                                timeFormat="hh:mm A"
                                inputProps={{ className: 'form-input', style:{padding:"10px", height:"fit-content", width:"50%"} }}
                                value={scheduleTime}
                                onChange={handleScheduleTime}>

                            </ReactDatetimeClass>

                        </div>

                        <div style={{marginLeft:'-35px',padding:'10px', display:"flex"}}>
                            <label style={{padding :"10px",width:"150px"}} htmlFor="origin"><span style={{color:'red'}}>*</span>Starting Point:</label>
                            <select style={{width:"43%"}} className="select" id="origin" onChange={handleOrigin} value={origin} >

                                <option value="0">Please select...</option>
                                {cities.map(city => (

                                    (destination === city.name) ? (
                                        <option key={city.id} value={city.value} selected>
                                            {city.name}
                                        </option>
                                    ) : (
                                        <option key={city.id} value={city.value}>
                                            {city.name}
                                        </option>
                                    )



                                ))}

                            </select>
                        </div>

                        <div style={{marginLeft:'-40px',padding:'10px', display:"flex"}}>
                            <label style={{padding :"10px",width:"150px"}} htmlFor="destinationInput"><span style={{color:'red'}}>*</span>Destination:</label>
                            <select style={{width:"43%"}} className="select" id="destinationInput" onChange={handleDestination} value={destination} >

                                <option value="0">Please select...</option>
                                {cities.map(city => (

                                    (destination === city.name) ? (
                                        <option key={city.id} value={city.value} selected>
                                            {city.name}
                                        </option>
                                    ) : (
                                        <option key={city.id} value={city.value}>
                                            {city.name}
                                        </option>
                                    )



                                ))}

                            </select>
                        </div>

                        <div className="field-holder">
                            <input className="form-input" type="text" id="itemName" required value={itemName} onChange={handleItemName}/>
                            <label className="form-label" htmlFor="itemName"><span style={{color:'red'}}>*</span>Item Name :</label>
                        </div>

                        <div className="field-holder">
                            <input className="form-input" type="text" id="itemColor" value={itemColor} onChange={handleItemColor} required/>
                            <label className="form-label" htmlFor="itemColor"><span style={{color:'red'}}>*</span>Item Color :</label>
                        </div>




                    </div>
                </div>

                <div>
                    <button onClick={showPreviewPanel}>Preview</button>
                </div>
            </div>


            {showLostItemDesPreview &&
                <div className="boarder-style" style={{marginTop:'20px'}} >
                    <h3>Lost Item Description</h3>

                    <div>
                        <p>On <b>{incidentDate}</b> at about <b>{incidentTime}</b>, a <b>{itemColor}</b> color <b>{itemName}</b> was lost in <b>{scheduleTime} {origin}</b> to <b>{destination}</b> bus ( <b>{busNo}</b>)  </p>
                        <p>Let me know if you have any information.</p>

                        <label style={{marginLeft:'0'}}><b>{name} - <b>{contactNo}</b></b></label>



                    </div>

                    <div>
                        <button onClick={submitLostFound}>Submit</button>
                    </div>
                </div>
            }

            {showFoundItemDesPreview &&
                <div className="boarder-style" style={{marginTop:'20px',marginBottom:'20px'}} >
                    <h3>Found Item Description</h3>

                    <div>
                        <p>On <b>{incidentDate}</b> at around <b>{incidentTime}</b>, <b>{itemColor}</b> color <b>{itemName}</b> belonging to a person was found inside <b>{scheduleTime}</b> highway bus {busNo !== '' ? ('( Bus No -'+busNo+')') : ''} from <b>{origin}</b> to <b>{destination}</b>.</p>
                        <p>It can be obtained by veryfying the identity.</p>
                        <label style={{marginLeft:'0'}}><b>{name} - <b>{contactNo}</b></b></label>

                    </div>

                    <div>
                        <button onClick={submitLostFound}>Submit</button>
                    </div>
                </div>


            }
        </div>
    )
}