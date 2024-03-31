import SideBar from "./SideBar";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import "../sideBar.css";
import "../styles.css";
import Home from "./Home";
import Request from "./adminRelated/Request";
import Profile from "./Profile";


export default function DashBoard({ userName, userTypeId }) {
    const contentRef = useRef(null);
    const [selectedPage, setSelectedPage] = useState('Home');

    console.log(selectedPage);

    useLayoutEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.clientHeight;
            const sidebar = document.querySelector(".sideBar");
            sidebar.style.height = `${contentHeight}px`;
        }
    }, [contentRef]);

    return (
        <div className="main_sideBar_dshboard" style={{ display: "flex", height: "100vh" }}>
            <SideBar userTypeId={userTypeId} setSelectedPage={setSelectedPage} />
            <div className="dashBoard-container" style={{ flex: "1", padding: "20px", overflow: "auto" }}>

                {selectedPage === 'Home' && <Home />}
                {selectedPage === 'Accept Requests' && <Request />}
                {selectedPage === 'View Profile' && <Profile />}

            </div>
        </div>
    );
}
