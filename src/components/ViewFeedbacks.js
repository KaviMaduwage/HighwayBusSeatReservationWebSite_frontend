import {useEffect, useState} from "react";
import {getAllFeedbacks} from "../services/feedbackService";

export default function ViewFeedbacks(){
    const [feedbackList, setFeedbackList] = useState([]);
    function loadFeedBacks() {
        getAllFeedbacks().then(response => {
            setFeedbackList(response.data);
        });
    }

    useEffect(() => {
        loadFeedBacks();
    }, []);

    function formatDate(createdDate) {
        const date = new Date(createdDate);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        if(month < 10){
            month = "0"+month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;

    }

    return (
        <div>
            <h1>User Feedbacks</h1>

            {feedbackList.length > 0 ? (
                <>
                    <div className="card-container">
                        {feedbackList.map((feedback, index) => (

                            <div className="card" style={{width:'100%',padding:'5px'}} key={feedback.feedBackId}>

                                <div style={{display:'flex',marginLeft:'5%',marginTop:'10px'}}>
                                    <label style={{fontStyle:'italic',width:'20%'}}>Published on : {formatDate(feedback.createdDate)}</label>
                                    <label style={{fontStyle:'italic',width:'80%'}}>{feedback.bus.plateNo} - {feedback.bus.busOwner.travelServiceName} - {feedback.bus.route.startingPoint} / {feedback.bus.route.endingPoint}</label>
                                </div>

                                <div style={{display:'flex',flexDirection:'row',alignItems: 'flex-start',marginTop:'6px'}}>
                                    <label style={{width:'25%'}} ><span style={{fontWeight:'bold'}}>Cleanliness :</span> {(feedback.cleanlinessGradeId == 1 ? 'Poor' : (feedback.cleanlinessGradeId == 2 ? 'Average' : (feedback.cleanlinessGradeId == 3 ? 'Good' : (feedback.cleanlinessGradeId == 4 ? 'Excellent' : ''))))}</label>
                                    <label style={{width:'25%'}}><span style={{fontWeight:'bold'}}>Timing :</span> {(feedback.timingGradeId == 1 ? 'Poor' : (feedback.timingGradeId == 2 ? 'Average' : (feedback.timingGradeId == 3 ? 'Good' : (feedback.timingGradeId == 4 ? 'Excellent' : ''))))}</label>
                                    <label style={{width:'25%'}}><span style={{fontWeight:'bold'}}>Driver Quality :</span> {(feedback.driverGradeId == 1 ? 'Poor' : (feedback.driverGradeId == 2 ? 'Average' : (feedback.driverGradeId == 3 ? 'Good' : (feedback.driverGradeId == 4 ? 'Excellent' : ''))))}</label>
                                    <label style={{width:'25%'}}><span style={{fontWeight:'bold'}}>Conductor Quality :</span> {(feedback.conductorGradeId == 1 ? 'Poor' : (feedback.conductorGradeId == 2 ? 'Average' : (feedback.conductorGradeId == 3 ? 'Good' : (feedback.conductorGradeId == 4 ? 'Excellent' : ''))))}</label>


                                </div>

                                {feedback.otherComments !== '' &&
                                    <div style={{display:'flex',marginLeft:'5%',marginTop:'10px'}}>
                                        <label>{feedback.otherComments}</label>
                                    </div>
                                }




                            </div>
                        ))}

                    </div>


                </>


            ) : (
                <div>
                    <h3>No Feedbacks.</h3>
                </div>
            )}
        </div>
    )
}