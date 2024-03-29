import SideBar from "./SideBar";
import {useEffect, useLayoutEffect, useRef} from "react";
import "../sideBar.css";
import "../styles.css";
import Home from "./Home";

export default function DashBoard({ userName, userTypeId }){
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
            <SideBar userTypeId={userTypeId} ></SideBar>

            <div className="dashBoard-container" style={{display : "1", padding : "20px"}}>
                {/*<h1>Passenger Dashboard {selectedComponent}</h1>*/}

                {/*<h3>Welcome</h3>*/}

                {/*{selectedComponent === "Home" && <Home />}*/}

                <Home></Home>


            </div>

        </div>

    )
}