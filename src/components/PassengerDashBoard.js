import PassengerSideBar from "./PassengerSideBar";
import {useEffect, useLayoutEffect, useRef} from "react";
import "../sideBar.css";
import "../styles.css";

export default function PassengerDashBoard({ userName, userTypeId }){
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.clientHeight;
            const sidebar = document.querySelector(".sideBar");
            sidebar.style.height = `${contentHeight}px`;
        }
    }, [contentRef]);

    return (
        <div className="main_sideBar_dshboard" style={{display : "flex",height: "100vh"}}>
            <PassengerSideBar userTypeId={userTypeId} ></PassengerSideBar>

            <div className="dashBoard-container" style={{display : "1", padding : "20px"}}>
                <h1>Passenger Dashboard {userName}</h1>

                <h3>Welcome</h3>
            </div>

        </div>

    )
}