import "../sideBar.css";
import "./SideBarItem";
import SideBarItem from "./SideBarItem";
import items from "../data/passengerSideBar.json";
import adminSideBarItems from "../data/adminSideBar.json";


export default function PassengerSideBar({userTypeId}){


    let sidebarItems;

    // Load sidebar items based on user type
    switch (userTypeId) {
        case 1: // admin
            sidebarItems = adminSideBarItems.map((item, index) => (
                <SideBarItem key={index} item={item} />
            ));
            break;
        case 3: // passenger
            sidebarItems = items.map((item, index) => (
                <SideBarItem key={index} item={item} />
            ));
            break;
        default:
            // Handle other user types or invalid user types
            sidebarItems = <div>No sidebar items available for this user type.</div>;
    }

    return (
        <div className="sideBar">
            {sidebarItems}
        </div>
    )
}
