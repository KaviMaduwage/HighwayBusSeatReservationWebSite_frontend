import {RadioGroup} from "@mui/material";
import {useState} from "react";
import {saveFeedBack} from "../../services/feedbackService";

export default function FeedBackForm(){

    const [cleanliness, setCleanliness] = useState('');
    const [driverBehaviour, setDriverBehaviour] = useState('');
    const [conductorBehaviour, setConductorBehaviour] = useState('');
    const [timing, setTiming] = useState('');
    const [travelDate,setTravelDate] = useState(null);
    const [busNo, setBusNo] = useState('');
    const [otherComments,setOtherComments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    function handleCleanliness(e) {
        setCleanliness(e.target.value);
    }

    function handleDriverBehaviour(e) {
        setDriverBehaviour(e.target.value);
    }

    function handleConductorBehaviour(e) {
        setConductorBehaviour(e.target.value);
    }

    function handleTiming(e) {
        setTiming(e.target.value);
    }

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

    function getTodayDate(date) {
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

    function handleTravelDateDate(e) {
        setTravelDate(e.target.value);
    }

    function submitFeedBack() {

        if(busNo === '' || travelDate === null || travelDate === '' || cleanliness === '' || timing === '' || driverBehaviour === '' || conductorBehaviour === ''){
            setErrorMessage("Please fill all the mandatory data marked in asterisk(*) mark.");
        }else{
            let feedback = {busNo:busNo,travelDate:travelDate,cleanliness:cleanliness,timing:timing,driverBehaviour:driverBehaviour,conductorBehaviour:conductorBehaviour,otherComments:otherComments};
            saveFeedBack(feedback).then(response => {
                setSuccessMessage(response.data);
                setErrorMessage('');
                setBusNo('');
                setTravelDate(null);
                setCleanliness('');
                setTiming('');
                setDriverBehaviour('');
                setConductorBehaviour('');
                setOtherComments('');
            });
        }
    }

    function handleBusNo(e) {
        setBusNo(e.target.value);
    }

    function handleOtherComments(e) {
        setOtherComments(e.target.value);
    }

    return (
        <div>
            <h1>FeedBack Form</h1>

            <h3 style={{color:'red'}}>{errorMessage}</h3>
            <h3>{successMessage}</h3>

            <div className="boarder-style" style={{marginLeft:'25%',width:'45%'}}>
                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Bus No :</label>
                    <input className="form-text-input" style={{width:'40%',marginLeft:'5px'}} type="text" onChange={handleBusNo} value={busNo}/>
                </div>

                <div style={{textAlign:'left',marginLeft:'8%',marginTop:'10px',marginBottom:'10px'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Travel Date :</label>
                    <input className="form-text-input" style={{width:'40%',marginLeft:'5px'}} type="date"  id="dateSearch" onChange={handleTravelDateDate} value={travelDate ? formatDate(travelDate) : ''} max={getTodayDate(new Date())}/>

                </div>
                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Cleanness :</label>
                    <RadioGroup id="cleanliness" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                            <span style={{ padding:'15px'}}>
                                                <input type="radio" name="cleanliness" id="poorCleanliness" value="Poor"  onChange={handleCleanliness} checked={cleanliness === 'Poor'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="poorCleanliness">Poor</label>
                                                <input type="radio" name="cleanliness" id="averageCleanliness" value="Average" onChange={handleCleanliness} checked={cleanliness === 'Average'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="averageCleanliness">Average</label>
                                                <input type="radio" name="cleanliness" id="goodCleanliness" value="Good" onChange={handleCleanliness} checked={cleanliness === 'Good'}/>
                                                <label  style={{marginRight:'20px'}} htmlFor="goodCleanliness">Good</label>
                                                <input type="radio" name="cleanliness" id="excellentCleanliness" value="Excellent" onChange={handleCleanliness} checked={cleanliness === 'Excellent'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="excellentCleanliness">Excellent</label>
                                            </span>

                    </RadioGroup>

                </div>

                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Driver Behaviour :</label>
                    <RadioGroup id="driverbehaviour" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                            <span style={{ padding:'15px'}}>
                                                <input type="radio" name="driverbehaviour" id="poorDriverBehaviour" value="Poor"  onChange={handleDriverBehaviour} checked={driverBehaviour === 'Poor'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="poorDriverBehaviour">Poor</label>
                                                <input type="radio" name="driverbehaviour" id="averageDriverBehaviour" value="Average" onChange={handleDriverBehaviour} checked={driverBehaviour === 'Average'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="averageDriverBehaviour">Average</label>
                                                <input type="radio" name="driverbehaviour" id="goodDriverBehaviour" value="Good" onChange={handleDriverBehaviour} checked={driverBehaviour === 'Good'}/>
                                                <label  style={{marginRight:'20px'}} htmlFor="goodDriverBehaviour">Good</label>
                                                <input type="radio" name="driverbehaviour" id="excellentDriverBehaviour" value="Excellent" onChange={handleDriverBehaviour} checked={driverBehaviour === 'Excellent'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="excellentDriverBehaviour">Excellent</label>
                                            </span>

                    </RadioGroup>

                </div>

                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Conductor Behaviour :</label>
                    <RadioGroup id="driverbehaviour" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                            <span style={{ padding:'15px'}}>
                                                <input type="radio" name="conductorbehaviour" id="poorConductorBehaviour" value="Poor"  onChange={handleConductorBehaviour} checked={conductorBehaviour === 'Poor'} />
                                                <label style={{marginRight:'20px'}} htmlFor="poorConductorBehaviour">Poor</label>
                                                <input type="radio" name="conductorbehaviour" id="averageConductorBehaviour" value="Average" onChange={handleConductorBehaviour} checked={conductorBehaviour === 'Average'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="averageConductorBehaviour">Average</label>
                                                <input type="radio" name="conductorbehaviour" id="goodConductorBehaviour" value="Good" onChange={handleConductorBehaviour} checked={conductorBehaviour === 'Good'}/>
                                                <label  style={{marginRight:'20px'}} htmlFor="goodConductorBehaviour">Good</label>
                                                <input type="radio" name="conductorbehaviour" id="excellentConductorBehaviour" value="Excellent" onChange={handleConductorBehaviour} checked={conductorBehaviour === 'Excellent'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="excellentConductorBehaviour">Excellent</label>
                                            </span>

                    </RadioGroup>

                </div>

                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender"><span style={{color:'red'}}> *</span>Timing :</label>
                    <RadioGroup id="driverbehaviour" style={{display: "flex",alignItems: 'flex-start', marginLeft:'20px'}} >
                                            <span style={{ padding:'15px'}}>
                                                <input type="radio" name="timing" id="poorTiming" value="Poor"  onChange={handleTiming} checked={timing === 'Poor'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="poorTiming">Poor</label>
                                                <input type="radio" name="timing" id="averageTiming" value="Average" onChange={handleTiming} checked={timing === 'Average'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="averageTiming">Average</label>
                                                <input type="radio" name="timing" id="goodTimingTiming" value="Good" onChange={handleTiming} checked={timing === 'Good'}/>
                                                <label  style={{marginRight:'20px'}} htmlFor="goodTimingTiming">Good</label>
                                                <input type="radio" name="timing" id="excellentTiming" value="Excellent" onChange={handleTiming} checked={timing === 'Excellent'}/>
                                                <label style={{marginRight:'20px'}} htmlFor="excellentTiming">Excellent</label>
                                            </span>

                    </RadioGroup>

                </div>

                <div style={{textAlign:'left',marginLeft:'8%'}}>
                    <label style={{paddingBottom:'20px',fontWeight:'bold'}}  htmlFor="gender">Other Comments :</label><br/>

                    <textarea style={{marginLeft:'20px',width:'85%',marginTop:'10px'}} rows="5" onChange={handleOtherComments} value={otherComments}></textarea>
                </div>

                <div style={{marginTop:'15px'}}>
                    <button onClick={submitFeedBack}>Submit</button>
                </div>

            </div>
        </div>
    )
}