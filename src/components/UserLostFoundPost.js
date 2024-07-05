import {useEffect, useState} from "react";
import {
    deleteUserFoundPost,
    deleteUserLostPost,
    getUserFoundItemPosts,
    getUserLostItemPosts
} from "../services/lostFoundService";
import deleteImg from "../images/deleteAny.png";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function UserLostFoundPost({userId,userTypeId}){
    const [lostItemList,setLostItemList] = useState([]);
    const [foundItemList, setFoundItemList] = useState([]);
    const [message, setMessage] = useState('');
    const [confirmationBox, setConfirmationBox] = useState(false);
    const [deleteType,setDeleteType] = useState('');
    const [deleteItemId, setDeleteItemId] = useState(0);

    function loadUserLostItems() {
        getUserLostItemPosts(userId).then(response => {
            setLostItemList(response.data);
        });
    }

    function loadUserFoundItems() {
        getUserFoundItemPosts(userId).then(response => {
            setFoundItemList(response.data);
        });
    }

    function loadUserLostFoundItems() {
        loadUserLostItems();
        loadUserFoundItems();
    }

    useEffect(() => {
        loadUserLostFoundItems();
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

    function deleteFoundPost(foundItemId) {
        deleteUserFoundPost(foundItemId,userId).then(response => {
            setMessage(response.data);
            setConfirmationBox(false);
            loadUserFoundItems();
        });
    }

    function deleteLostPost(lostItemId) {
        deleteUserLostPost(lostItemId,userId).then(response => {
            setMessage(response.data);
            setConfirmationBox(false);
            loadUserLostItems();
        });
    }

    function showDeletePostConfirmation(itemId, type) {

        console.log(itemId +" - "+type);
        if(type === 'Lost'){
            setDeleteType('Lost');
            setDeleteItemId(itemId);
            setConfirmationBox(true);

        }else if(type === 'Found'){
            setDeleteType('Found');
            setDeleteItemId(itemId);
            setConfirmationBox(true);

        }
    }

    function deletePost() {
        if(deleteType === 'Lost'){
            deleteLostPost(deleteItemId);
        }else if(deleteType === 'Found'){
            deleteFoundPost(deleteItemId);
        }
    }

    return (
        <div>
            <h1>My Lost/Found Posts</h1>

            <h3>{message}</h3>

            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                <h3>My Lost Items</h3>
                {lostItemList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {lostItemList.map((lostItem, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={lostItem.lostItemId}>


                                    <img
                                        className="alert-card-delete-icon"
                                        src={deleteImg}
                                        alt="Delete" onClick={() => showDeletePostConfirmation(lostItem.lostItemId,'Lost')}

                                    />
                                    
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

            <div className="boarder-style" style={{marginTop:'20px',height:'500px',overflow:'auto'}}>
                <h3>My Found Item List</h3>
                {foundItemList.length > 0 ? (
                    <>
                        <div className="card-container">
                            {foundItemList.map((foundItem, index) => (

                                <div className="card" style={{width:'100%',padding:'5px'}} key={foundItem.foundItemId}>

                                    <img
                                        className="alert-card-delete-icon"
                                        src={deleteImg}
                                        alt="Delete" onClick={() => showDeletePostConfirmation(foundItem.foundItemId,'Found')}

                                    />
                                    <div>
                                        <p>On <b>{formatDateToStr(foundItem.incidentDate)}</b> at around <b>{foundItem.incidentTime}</b>, <b>{foundItem.itemColor}</b> color <b>{foundItem.itemName}</b> belonging to a person was found inside <b>{foundItem.scheduleTime}</b> highway bus {foundItem.busNo !== '' ? ('( Bus No -'+foundItem.busNo+')') : ''} from <b>{foundItem.scheduleOrigin}</b> to <b>{foundItem.scheduleDestination}</b>.</p>

                                        <p>It can be obtained by verifying the identity.</p>
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


            <Dialog open={confirmationBox}>
                <DialogTitle>Do you want to delete the selected post?</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{color:"white"}} onClick={deletePost}
                             autoFocus>
                        Okay
                    </Button>
                    <Button onClick={() => setConfirmationBox(false)}
                            style={{color:"white"}} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}