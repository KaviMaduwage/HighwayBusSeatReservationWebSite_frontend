
import {acceptSelectedRequest, getRequests, rejectSelectedRequest} from "../../services/requestService";
import {useEffect, useState} from "react";
import "../../styles.css";


export default function Request(){

    const [result, setResult] = useState([]);


    useEffect(() => {
        fetchRequests();
    }, []);

    function fetchRequests() {
        getRequests()
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }

    function rejectRequest(selectedRequestId) {
        rejectSelectedRequest(selectedRequestId).then((response => {
            alert(response.data);
            fetchRequests();
            })

        )

    }

    function acceptRequest(selectedRequestId) {
        acceptSelectedRequest(selectedRequestId).then((response => {

            alert(response.data);
            fetchRequests();
            })

        )
    }

    return (
        <div>
            <h1>Requests</h1>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Request Id</th>
                            <th>Travel Service Name</th>
                            <th>Requested Date</th>
                            <th>Accepted Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                    {result.length === 0 ?
                    (
                        <tr>
                            <td colSpan="6">-- No Data --</td>
                        </tr>
                    ) :
                        (



                        result.map(request => (
                            <tr key={request.requestId}>
                                <td>{request.requestId}</td>
                                <td>{request.busOwner.travelServiceName}</td>
                                <td>{new Date(request.requestedDate).toLocaleDateString()}</td>
                                <td>
                                    {request.approved ? new Date(request.acceptedDate).toLocaleDateString() : "N/A"}
                                </td>
                                <td>
                                    {request.approved ? "Approved" : (request.reject ? "Rejected" : "Pending")}
                                </td>
                                <td>
                                    {!request.approved && !request.reject
                                        ?
                                        <>
                                            <input type="button" value="Accept" onClick={() => acceptRequest(request.requestId)} />
                                            <input type="button" value="Reject" onClick={() => rejectRequest(request.requestId)}/>
                                        </>
                                        :
                                        <>
                                        </>
                                    }

                                </td>
                            </tr>
                        ))
                        )
                    }

                    </tbody>
                </table>
            </div>


        </div>
    )
}