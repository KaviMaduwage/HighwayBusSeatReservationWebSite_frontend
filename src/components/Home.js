import homeImg from "../images/home2.jpg"

export default function Home(){
    return (
        <div style={{padding: '20px'}}>
            <div className="home-screen" style={{ background: `url(${homeImg})`, backgroundSize: 'cover', width: '90%', height: '300px'}}>
            </div>
        </div>
    )
}


