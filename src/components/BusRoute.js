import addImage from "../images/addItem.png";
import deleteImg from "../images/deleteItem.png";
import updateImg from "../images/updateItem.png";
import {useEffect, useRef, useState} from "react";
import {findRouteById, getAllRoutes, saveRoute} from "../services/routeService";

export default function BusRoute({userTypeId}){
    const addPanelRef = useRef(null);
    const [routeList, setRouteList] = useState([]);
    const [showAddPanel, setShowAddPanel] = useState(false);

    const [busRouteId,setBusRouteId] = useState('');
    const [routeNo, setRouteNo] = useState('');
    const [tripOrigin, setTripOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (showAddPanel) {
            addPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showAddPanel]);

    function loadRoutes() {
        getAllRoutes().then(response => {
            setRouteList(response.data);
        })

    }

    useEffect(() => {

        loadRoutes();
    }, []);

    function viewRoute(routeId) {
        findRouteById(routeId).then(response => {
            let route = response.data;
            setShowAddPanel(true);
            setRouteNo(route.routeNo);
            setTripOrigin(route.startingPoint);
            setDestination(route.endingPoint);
            setDescription(route.routeDescription);
            setBusRouteId(route.routeId);
            setErrorMessage('');
        })
    }

    function showPanelAdd() {
        setShowAddPanel(true);
        setRouteNo('');
        setTripOrigin('');
        setDestination('');
        setDescription('');
        setBusRouteId('');
        setErrorMessage('');
    }

    function handleRouteNo(e) {
        setRouteNo(e.target.value);
    }

    function handleOrigin(e) {
        setTripOrigin(e.target.value);
    }

    function handleDestination(e) {
        setDestination(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function saveRouteDetails() {
        if(routeNo.trim()==="" || tripOrigin.trim() ===""|| destination.trim()==="" ||description.trim() ===""){
            setErrorMessage("Please fill all the data.")
        }else{
            const route = {routeId : busRouteId,routeNo,startingPoint: tripOrigin, endingPoint:destination,routeDescription : description};
            saveRoute(route).then(response => {
                setResponseMessage(response.data);
                loadRoutes();
                setShowAddPanel(false);
            });
        }



    }

    return (
        <div>
            <h1>Route Management</h1>

            <p>{responseMessage}</p>

            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Route No</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Description</th>
                        {userTypeId === 1 &&
                            <th><img className="button-img" src={addImage} title="Add New Route" alt="add" onClick={showPanelAdd}/></th>

                        }


                    </tr>
                    </thead>
                    <tbody>
                    {routeList.length === 0 ?
                        ( <tr>
                            <td colSpan="5">-- No Data --</td>

                        </tr>)
                        :
                        ( routeList.map(busRoute => (
                            <tr key={busRoute.routeId}>
                                <td>{busRoute.routeNo}</td>
                                <td>{busRoute.startingPoint}</td>
                                <td>{busRoute.endingPoint}</td>
                                <td>{busRoute.routeDescription}</td>
                                {userTypeId === 1 &&
                                    <td>
                                        <img className="button-img" src={updateImg} title="Update Route" alt="update" onClick={() => viewRoute(busRoute.routeId)}/>
                                    </td>

                                }

                            </tr>
                        )))

                    }

                    </tbody>
                </table>

            </div>

            { showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} id="addPanel" ref={addPanelRef}>
                    <p style={{color:'red'}}>{errorMessage}</p>
                    <div>

                        <input type="hidden" id="busRouteId" value={busRouteId}/>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="routeNo" required onChange={handleRouteNo} value={routeNo}/>
                            <label className="form-label" htmlFor="routeNo">Route No :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="origin" required onChange={handleOrigin} value={tripOrigin}/>
                            <label className="form-label" htmlFor="origin">Origin :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text" id="destination" required onChange={handleDestination} value={destination}/>
                            <label className="form-label" htmlFor="destination">Destination :</label>
                        </div>
                        <div className="field-holder">
                            <input className="form-input" type="text"  id="description" required onChange={handleDescription} value={description}/>
                            <label className="form-label" htmlFor="description">Description :</label>
                        </div>
                    </div>

                    <div>
                        {userTypeId === 1 &&
                            <span style={{padding:'10px'}}>
                                <button onClick={saveRouteDetails}> Submit</button>
                            </span>
                        }

                        <span style={{padding:'10px'}}>
                                <button onClick={() => setShowAddPanel(false)}>Cancel</button>
                            </span>

                    </div>
                </div>
            )}
        </div>
    )
}