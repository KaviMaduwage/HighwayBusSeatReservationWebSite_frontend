import {useState} from "react";

export default function SideBarItem({item}){

    const [open, setOpen] = useState(false);

    if(item.childrens){
        return (
            <div className={open ? "sideBar-item open" : "sideBar-item"}>
                <div className="sideBar-title">
                <span>
                    { item.icon && <i className={item.icon}></i>}
                    {item.title}
                </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>

                <div className="sideBar-item-subMenu">
                    {item.childrens.map((child, index) => <SideBarItem key={index} item={child}/>)}
                </div>
            </div>
        )
    }else{
        return (

                <a href={item.path || "#"} className="sideBar-item plain">

                        { item.icon && <i className={item.icon}></i>}
                        {item.title}


                </a>


        )
    }
}