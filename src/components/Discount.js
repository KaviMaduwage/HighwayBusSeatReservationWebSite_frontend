import {useEffect, useRef, useState} from "react";
import {getAllRoutes} from "../services/routeService";
import {getAllTravelServiceList} from "../services/busService";
import addImage from "../images/addItem.png";
import viewDiscount from "../images/discount.png";
import deleteScheduleImg from "../images/deleteSchedule.png";
import viewSchedule from "../images/updateSchedule.png";
import {
    getAllDiscounts,
    getDiscountById,
    saveDiscount,
    searchDiscountsByDateRouteAndBusOwner
} from "../services/discountService";

export default function Discount({userId,userTypeId}){
    const [routeList, setRouteList] = useState([]);
    const [travelServiceList, setTravelServiceList] = useState([]);
    const [searchRouteId, setSearchRouteId] = useState('');
    const [searchDate, setSearchDate] = useState(null);
    const [searchTravelServiceId,setSearchTravelServiceId] = useState('');
    const [discountList,setDiscountList] = useState([]);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const addPanelRef = useRef(null);
    const [showViewDiscountPanel,setShowViewDiscountPanel] = useState(false);
    const viewPanelRef = useRef(null);

    const [discountName,setDiscountName] = useState('');
    const [discountId,setDiscountId] = useState('');
    const [discountStartDate,setDiscountStartDate] = useState(null);
    const [discountExpiryDate,setDiscountExpiryDate] = useState(null);
    const [inputRouteId,setInputRouteId] = useState('');
    const [percentage, setPercentage] = useState('');
    const [description,setDescription] = useState('');
    const [errorDataMsg,setErrorDataMsg] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    const [selectedDiscountDetails,setSelectedDiscountDetail] = useState(null);


    useEffect(() => {
        if (showAddPanel) {
            addPanelRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        if(showViewDiscountPanel){
            viewPanelRef.current.scrollIntoView({behavior:'smooth'});
        }

        findRoutes();
        findTravelServices();
    }, []);

    function loadAllDiscounts() {
        getAllDiscounts().then(response => {
            setDiscountList(response.data);
        });

    }

    useEffect(() => {
        loadAllDiscounts();
    }, [showAddPanel]);

    function findRoutes(){
        getAllRoutes().then(response => {
            setRouteList(response.data);
        });
    }

    function findTravelServices() {
        getAllTravelServiceList().then(response => {
            setTravelServiceList(response.data);
        })
    }

    function handleRouteId(e) {
        setSearchRouteId(e.target.value);
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

    function handleSearchDate(e) {
        setSearchDate(e.target.value);
    }

    function handleTravelService(e) {
        setSearchTravelServiceId(e.target.value);
    }

    function showPanelAdd() {
        setShowAddPanel(true);
        setErrorDataMsg('');
        setDiscountName('');
        setDiscountId('');
        setDiscountStartDate(null);
        setDiscountExpiryDate(null);
        setDescription('');
        setPercentage('');
        setInputRouteId('');
    }


    function handleDiscountName(e) {
        setDiscountName(e.target.value);
    }

    function handleDiscountStartDate(e) {
        setDiscountStartDate(e.target.value);
    }

    function handleDiscountExpiryDate(e) {
        setDiscountExpiryDate(e.target.value);
    }

    function handleInputRouteId(e) {
        setInputRouteId(e.target.value);
    }

    function handlePercentage(e) {
        setPercentage(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function saveDiscountDetails() {
        if(discountName === "" || (discountStartDate === "" || discountStartDate === null) || (discountExpiryDate === "" || discountExpiryDate === null)
        || description === "" || percentage === ""){
            setErrorDataMsg("Please fill all the mandatory data marked in asterisk(*) mark.");
        }else if(new Date(discountStartDate) > new Date(discountExpiryDate)){
            setErrorDataMsg("Expiry date should be greater than the start date.");
        }else if(percentage >100){
            setErrorDataMsg("Percentage should be less than 100.")
        }else{
            let startDate = new Date(discountStartDate);
            let discount = {discountId,discountName,discountStartDate,discountExpiryDate,route : {routeId:inputRouteId},percentage,description}
            saveDiscount(userId,discount).then(response => {
                setShowAddPanel(false);
                setSuccessMessage(response.data);

            });
        }
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

    function viewDiscountPanel(selectedDiscountId) {
        getDiscountById(selectedDiscountId).then(response => {
            setShowViewDiscountPanel(true);
            setSelectedDiscountDetail(response.data);
        });

    }

    function formatDateToStr(discountStartDate) {
        const date = new Date(discountStartDate);


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

    function searchDiscounts() {
        searchDiscountsByDateRouteAndBusOwner(searchDate,searchRouteId,searchTravelServiceId).then(response => {
            setDiscountList(response.data);
        });
    }

    return (
        <div>
            <h1>Discounts</h1>

            <label>{successMessage}</label>
            <div className="boarder-style">
                <div style={{display:'flex', flexDirection:'row'}}>


                        <div style={{padding:'1%'}}>
                            <label style={{paddingRight :"10px"}} htmlFor="route">From :</label>
                            <input className="form-text-input" style={{width:'150px'}} type="date"  id="dateSearch" onChange={handleSearchDate} value={searchDate ? formatDate(searchDate) : ''}/>

                        </div>

                    <div style={{padding:'1%'}}>
                        <label style={{paddingRight :"10px"}} htmlFor="route">Route:</label>
                        <select className="select" id="route" onChange={handleRouteId} value={searchRouteId}>

                            <option value="0">Please select...</option>
                            {routeList.map(busRoute => (
                                <option key={busRoute.routeId} value={busRoute.routeId} > {busRoute.routeNo} ({busRoute.startingPoint} - {busRoute.endingPoint}) </option>
                            ))}

                        </select>
                    </div>


                    {userTypeId === 1 ?
                        (<div style={{padding:'1%'}}>
                            <label style={{paddingRight :"10px"}} htmlFor="route">Travel Service:</label>
                            <select className="select" id="busOwnerId" onChange={handleTravelService} value={searchTravelServiceId}>

                                <option value="0">Please select...</option>
                                {travelServiceList.map(travelService => (
                                    <option key={travelService.busOwnerId} value={travelService.busOwnerId} > {travelService.travelServiceName}</option>
                                ))}

                            </select>
                        </div>)
                    : <></>}


                    <div>
                        <button type="button" style={{backgroundImage : "linear-gradient(#164863, #164863)", marginLeft:"20px"}} onClick={searchDiscounts}> Search </button>

                    </div>


                </div>
            </div>


            <div className="boarder-style" style={{marginTop:'30px'}}>
                <table>
                    <thead>
                    <tr>
                        <th>Discount Name</th>
                        <th>From (MM-dd-yyyy)</th>
                        <th>To (MM-dd-yyyy)</th>
                        <th style={{width:'10%'}}>Status</th>
                        <th style={{width:'10%'}}>Route Id</th>
                        <th>Travel Service Name</th>
                        <th style={{width:'10%'}}>Percentage (%)</th>

                        {userTypeId === 2 ?

                            <th><img className="button-img" src={addImage} title="Add New Discount" alt="add" onClick={showPanelAdd}/></th>
                            :
                            <th></th>
                        }


                    </tr>
                    </thead>
                    <tbody>
                        {discountList.length === 0 ?
                            ( <tr>
                                <td colSpan="7">-- No Data --</td>
                                <td></td>
                            </tr>)
                            :
                            ( discountList.map(discount => (
                                <tr key={discount.discountId}>
                                    <td>{discount.discountName}</td>
                                    <td>{new Date(discount.discountStartDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.discountExpiryDate).toLocaleDateString()}</td>
                                    <td>{new Date(discount.discountExpiryDate) < new Date ? 'Expired' : new Date(discount.discountStartDate) > new Date() ? 'Upcoming' : 'Ongoing'}</td>
                                    <td>{discount.route.routeNo} - ({discount.route.startingPoint} - {discount.route.endingPoint})</td>
                                    <td>{discount.busOwner.travelServiceName}</td>
                                    <td>{discount.percentage}%</td>
                                    <td><img src={viewDiscount} alt="View Discount" onClick={() => viewDiscountPanel(discount.discountId)}/></td>
                                </tr>
                            )))

                        }

                    </tbody>
                </table>
            </div>

            <label style={{color:'red'}}>{errorDataMsg}</label>

            {showAddPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={addPanelRef}>
                    <div style={{textAlign: "left", width:"50%"}}>
                        <input type="hidden" id="discountId" value={discountId}/>

                        <div style={{display:"flex",marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}} htmlFor="discountName"><span style={{color:'red'}}>*</span>Discount Name :</label>
                            <input style={{padding:"10px",width:"43%",height:"40px"}} className="form-input" type="text" id="discountName" required onChange={handleDiscountName} value={discountName}/>
                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'150px'}} htmlFor="startdateInput"><span style={{color:'red'}}>*</span>Starting Date:</label>
                            <input style={{width:"43%"}} className="form-text-input" type="date"  id="startdateInput" onChange={handleDiscountStartDate} value={discountStartDate ? formatDate(discountStartDate) : ''}/>

                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'150px'}} htmlFor="expirydateInput"><span style={{color:'red'}}>*</span>Expiry Date:</label>
                            <input style={{width:"43%"}} className="form-text-input" type="date"  id="expirydateInput" onChange={handleDiscountExpiryDate} value={discountExpiryDate ? formatDate(discountExpiryDate) : ''} min={getTodayDate(new Date())}/>

                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'150px'}} htmlFor="route"> Route:</label>
                            <select style={{width:'350px'}} className="select" id="route" onChange={handleInputRouteId} value={inputRouteId}>

                                <option value="0">Please select...</option>
                                {routeList.map(busRoute => (
                                    <option key={busRoute.routeId} value={busRoute.routeId} > {busRoute.routeNo} ({busRoute.startingPoint} - {busRoute.endingPoint}) </option>
                                ))}

                            </select>
                        </div>

                        <div style={{display:"flex",marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}} htmlFor="percentage"><span style={{color:'red'}}>*</span>Percentage (%) :</label>
                            <input style={{padding:"10px",width:"43%",height:"40px"}} className="form-input" type="number" id="percentage" inputMode="numeric" required onChange={handlePercentage} value={percentage}/>
                        </div>

                        <div style={{display:"flex",marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}} htmlFor="discountDiscription"><span style={{color:'red'}}>*</span>Description  :</label>
                            <textarea style={{padding:"10px",width:"70%",height:"60px"}} className="form-input" id="discountDiscription" required onChange={handleDescription} value={description}></textarea>
                        </div>

                    </div>


                    <div style={{marginTop:"10px"}}>
                            <span style={{padding:'10px'}}>
                                <button onClick={saveDiscountDetails}> Save Discount</button>
                            </span>
                            <span style={{padding:'10px'}}>
                                <button onClick={() => {setShowAddPanel(false);setErrorDataMsg('')}}> Cancel</button>
                            </span>

                    </div>
                </div>

            )}

            {showViewDiscountPanel && (
                <div className="boarder-style" style={{marginTop:'30px'}} ref={viewPanelRef}>
                    <div style={{textAlign: "left", width:"50%"}}>
                        <input type="hidden" id="discountId" value={discountId}/>

                        <div style={{display:"flex",marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"200px"}} htmlFor="discountName"><span style={{color:'red'}}>*</span>Discount Name :</label>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}}>{selectedDiscountDetails.discountName}</label>
                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'200px'}} htmlFor="startdateInput"><span style={{color:'red'}}>*</span>Starting Date:</label>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}}>{selectedDiscountDetails.discountStartDate ? formatDateToStr(selectedDiscountDetails.discountStartDate) : ''}</label>
                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'200px'}} htmlFor="expirydateInput"><span style={{color:'red'}}>*</span>Expiry Date:</label>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}}>{selectedDiscountDetails.discountExpiryDate ? formatDateToStr(selectedDiscountDetails.discountExpiryDate) : ''}</label>

                        </div>

                        <div style={{display:"flex", marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:'200px'}} htmlFor="route"> Route:</label>
                            <label style={{paddingRight: "10px", paddingTop: "8px", width: "300px"}}>
                                {selectedDiscountDetails.route && selectedDiscountDetails.route.routeId
                                    ? `${selectedDiscountDetails.route.routeNo} (${selectedDiscountDetails.route.startingPoint} - ${selectedDiscountDetails.route.endingPoint})`
                                    : ''
                                }
                            </label>
                        </div>

                        <div style={{display:"flex",marginBottom:'10px'}}>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"200px"}} htmlFor="percentage"><span style={{color:'red'}}>*</span>Percentage (%) :</label>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}}>{selectedDiscountDetails.percentage} %</label>
                             </div>

                        <div style={{display:"flex",marginBottom:'10px'}}>

                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"200px"}} htmlFor="discountDiscription"><span style={{color:'red'}}>*</span>Description  :</label>
                            <label style={{paddingRight :"10px",paddingTop :"8px",width:"150px"}}>{selectedDiscountDetails.description}</label>
                        </div>

                    </div>

                </div>
            )}
        </div>
    )
}
