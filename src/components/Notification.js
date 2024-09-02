import {useEffect, useState} from "react";
import {loadNotificationsByUserId} from "../services/notificationService";

export default function Notification({userId,userTypeId}){
    const [notificationList, setNotificationList] = useState([]);

    function loadNotifications() {
        loadNotificationsByUserId(userId).then(response => {
            setNotificationList(response.data);
        })
    }

    function formatDate(date) {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();

        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}/${month}/${day}  ${hours}:${minutes}`;
    }

    useEffect(() => {
        loadNotifications();
    }, []);
    return(
        <div>
            <h1>Notifications</h1>

            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th style={{width:'80%'}}>Message</th>
                        <th> </th>

                    </tr>
                    </thead>
                    <tbody>
                    {notificationList.length === 0 ?
                        ( <tr>
                            <td colSpan="3">-- No Notifications --</td>
                            <td></td>
                        </tr>)
                        :
                        ( notificationList.map(notification => (
                            <tr key={notification.notificationId}>
                                <td style={{fontWeight: notification.isViewed ? 'normal' : 'bold'}}>{formatDate(notification.createdDate)}</td>
                                <td style={{fontWeight: notification.isViewed ? 'normal' : 'bold'}}>{notification.note}</td>


                                <td>


                                </td>
                            </tr>
                        )))

                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}