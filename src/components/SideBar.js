import "../sideBar.css";
import "./SideBarItem";
import SideBarItem from "./SideBarItem";
import passengerSideBarItems from "../data/passengerSideBarItems.json";
import adminSideBarItems from "../data/adminSideBarItems.json";
import busOwnerSideBarItems from "../data/busOwnerSideBarItems.json";
import busCrewSideBarItems from "../data/busCrewSideBarItems.json";


export default function SideBar({userTypeId,setSelectedPage}){


    let sidebarItems;

    // Load sidebar items based on user type
    switch (userTypeId) {
        case 1: // admin
            sidebarItems = adminSideBarItems.map((item, index) => (
                <SideBarItem key={index} item={item} setSelectedPage={setSelectedPage}/>
            ));
            break;
        case 2: // bus Owner
            sidebarItems = busOwnerSideBarItems.map((item, index) => (
                <SideBarItem key={index} item={item} setSelectedPage={setSelectedPage}/>
            ));
            break;

        case 3: // passenger
            sidebarItems = passengerSideBarItems.map((item, index) => (
                <SideBarItem key={index} item={item} setSelectedPage={setSelectedPage}/>
            ));
            break;
        case 4:
        case 5:
            sidebarItems = busCrewSideBarItems.map((item, index) => (
                <SideBarItem key={index} item={item} setSelectedPage={setSelectedPage}/>
            ));
            break;
        default:
    }

    return (
        <div className="sideBar">
            {sidebarItems}
        </div>
    )
}
