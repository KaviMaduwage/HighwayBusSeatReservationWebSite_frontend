import aboutImg from "../images/aboutUs.jpg";

export default function About(){
    return (
        <div style={{padding: '20px'}}>
            <div className="home-screen" style={{ background: `url(${aboutImg})`,padding:'0px', backgroundSize: 'contain', width: '100%', height: '300px', position: 'relative',borderRadius: '0 0 85% 85% / 30%' }}>
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
                    About Us <br/>
                </h3>
            </div>

            <div style={{textAlign:"center"}}>
                <h3>Welcome to "My Travel", your go-to platform for hassle-free bus seat reservations. We are committed to making your travel experience seamless and convenient. With just a few clicks, you can browse routes, compare prices, and book your seats from the comfort of your home. Whether you're commuting for work, planning a vacation, or embarking on a cross-country adventure, we strive to provide an efficient, user-friendly booking experience.

                    Our platform partners with leading bus operators to offer a wide range of routes, ensuring safe and reliable journeys for every traveler. We also focus on transparency, providing detailed information about seat availability, bus amenities, and real-time schedules to help you make informed decisions. At [Your Website Name], we believe in simplifying travel, and we're here to save you time and give you peace of mind on the road.

                    Join thousands of happy passengers and enjoy the ease of booking with us. Travel smart, travel with "My Travel".</h3>
            </div>
        </div>
    )
}