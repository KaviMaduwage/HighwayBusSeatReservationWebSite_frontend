import contactImg from "../images/contact.jpg";
import React from "react";

export default function Contact(){
    return (
        <div style={{padding: '20px'}}>
            <div className="home-screen" style={{ background: `url(${contactImg})`,padding:'0px', backgroundSize: 'cover', width: '100%', height: '300px', position: 'relative',borderRadius: '0 0 85% 85% / 30%' }}>
                <h3 style={{
                    fontFamily: 'Dancing Script',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '10px',
                    textAlign: 'center',
                    fontSize:'30px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                    Contact Us <br/>
                </h3>
            </div>

            <div style={{textAlign:"center"}}>
                <h5>
                    <p>Address : Apex pvt Ltd, Union Place, Colombo</p>
                    <p>Tel : 94-11-2329358</p>
                    <p>Email : myseatofficial@gmail.com</p>
                </h5>
            </div>
        </div>
    )
}