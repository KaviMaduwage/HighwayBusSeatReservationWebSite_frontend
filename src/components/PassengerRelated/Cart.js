import {useEffect, useState} from "react";
import {deleteCartByCartId, loadCartListByUserId} from "../../services/reservationService";
import deleteImg from "../../images/deleteAny.png";

export default function Cart({userId}){
    const [cartList, setCartList] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');


    useEffect(() => {
        loadCartList();

    }, []);

    function loadCartList() {
        loadCartListByUserId(userId).then(response => {
            setCartList(response.data);
            let price = 0;
            cartList.map((cart)=> {
                price += cart.price;
            })
            setTotalPrice(price);
            console.log(response.data);
        })
    }

    function deleteCart(cartId) {
        deleteCartByCartId(cartId).then(response => {
            setResponseMessage(response.data);
            loadCartList();


        })
        
    }



    return (
        <div >

            <h1>Your Cart</h1>
            <p>{responseMessage}</p>

            {cartList.length > 0 ? (
                <>
                <div className="card-container">
                    {cartList.map((cart, index) => (

                        <div className="card" key={cart.cartId}>
                            <img
                                className="card-delete-icon"
                                src={deleteImg}
                                alt="Delete"
                                onClick={() => deleteCart(cart.cartId)}
                            />
                            <h2>{cart.schedule.origin} To {cart.schedule.destination}</h2>
                            <p style={{fontWeight:'bold'}}>Seat No : {cart.seatNos}</p>
                            <p style={{fontWeight:'bold'}}>Date : {cart.schedule.tripDateStr}</p>
                            <p style={{fontWeight:'bold'}}>{cart.schedule.tripStartTime} - {cart.schedule.tripEndTime}</p>
                            {cart.pickUpPoint !== "" ?
                                <p>Pick Up Point : {cart.pickUpPoint}</p>
                                :
                                <p></p>}
                            {cart.dropPoint !== "" ?
                                <p>Drop Off Point : {cart.dropPoint}</p>
                                :
                                <p></p>}
                            {cart.remark !== "" ?
                            <p>Remark : {cart.remark}</p>
                            :
                            <p></p>}
                            <p style={{color: 'crimson', fontWeight:'bold',fontSize:'20px'}}>Rs. {cart.price} /=</p>

                        </div>
                    ))}


                </div>
                    <div style={{fontSize:'30px', fontWeight:'bold'}}>Total : Rs.{totalPrice} /=</div>
                    <div style={{marginTop:'10px'}}><span style={{padding:'10px'}}>
                                <button> Pay</button>
                            </span>
                    </div>
                </>


            ) : (
                <div>
                    <h3>No data. Please make a reservation.</h3>
                </div>
            )}
        </div>
    )
}