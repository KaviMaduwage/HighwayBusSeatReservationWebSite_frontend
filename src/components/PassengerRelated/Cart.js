import {useEffect, useState} from "react";
import {
    deleteCartByCartId,
    loadCartListByUserId,
    makeReservation,
    makeReservationFromWalletSavings
} from "../../services/reservationService";
import deleteImg from "../../images/deleteAny.png";
import {getWalletAmountByUSerId} from "../../services/userService";

export default function Cart({userId}){
    const [cartList, setCartList] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0.0);
    const [totalPriceAfterDiscount,setTotalPriceAfterDiscount] = useState(0.0);
    const [totalDiscount,setTotalDiscount] = useState(0.0);
    const [responseMessage, setResponseMessage] = useState('');
    const [walletAmount, setWalletAmount] = useState(0);


    useEffect(() => {
        loadCartList();
        findWalletAmount(userId);

    }, []);

    useEffect(() => {
        let price = 0;
        let discountTot = 0;
        let priceAfterDis = 0;
        cartList.forEach(cart => {
            price += cart.cart.price;

            cart.discounts.forEach(discount => {
                discountTot += cart.cart.price * discount.percentage/100

            })
        });
        setTotalPrice(price);
        setTotalDiscount(discountTot);
    }, [cartList]);

    function findWalletAmount(userId){
        getWalletAmountByUSerId(userId).then(response => {
            setWalletAmount(response.data);
        })
    }

    function loadCartList() {
        loadCartListByUserId(userId).then(response => {
            setCartList(response.data);
            // let price = 0;
            // cartList.map((cart)=> {
            //     price += cart.price;
            // })
            // setTotalPrice(price);
            // console.log(price);
            // console.log(totalPrice);
            // console.log(response.data);
        })
    }

    function deleteCart(cartId) {
        deleteCartByCartId(cartId).then(response => {
            setResponseMessage(response.data);
            loadCartList();


        })
        
    }


    function createReservation() {
        let priceAfterDiscounts = totalPrice - totalDiscount;
        makeReservation(cartList, userId, priceAfterDiscounts).then(response => {
            if(response.data.payment_url){
                // window.location.href = response.data.payment_url;
                window.open(response.data.payment_url, '_blank');
            }
        })
    }

    function createReservationWithoutPayment() {
        let priceAfterDiscounts = totalPrice - totalDiscount;
        makeReservationFromWalletSavings(cartList, userId, priceAfterDiscounts).then(response => {
            setResponseMessage(response.data);
            loadCartList();
        })
    }

    return (
        <div >

            <h1>My Cart</h1>
            <p>{responseMessage}</p>

            {cartList.length > 0 ? (
                <>
                <div className="card-container">
                    {cartList.map((cart, index) => (

                        <div className="card" key={cart.cart.cartId}>
                            <img
                                className="card-delete-icon"
                                src={deleteImg}
                                alt="Delete"
                                onClick={() => deleteCart(cart.cart.cartId)}
                            />
                            <h2>{cart.cart.schedule.origin} To {cart.cart.schedule.destination}</h2>
                            <p style={{fontWeight:'bold'}}>Seat No : {cart.cart.seatNos}</p>
                            <p style={{fontWeight:'bold'}}>Date : {cart.cart.schedule.tripDateStr}</p>
                            <p style={{fontWeight:'bold'}}>{cart.cart.schedule.tripStartTime} - {cart.cart.schedule.tripEndTime}</p>
                            {cart.cart.pickUpPoint !== "" ?
                                <p>Pick Up Point : {cart.cart.pickUpPoint}</p>
                                :
                                <p></p>}
                            {cart.cart.dropPoint !== "" ?
                                <p>Drop Off Point : {cart.cart.dropPoint}</p>
                                :
                                <p></p>}
                            {cart.cart.remark !== "" ?
                            <p>Remark : {cart.cart.remark}</p>
                            :
                            <p></p>}
                            <p style={{color: 'crimson', fontWeight:'bold',fontSize:'20px'}}>Rs. {cart.cart.price} /=</p>

                            {cart.discounts.length > 0 &&
                            <p>Available Discounts :</p>}
                            {cart.discounts.length > 0 && cart.discounts.map((discount, index) => (
                                <div key={index} style={{ fontWeight:'bold',fontSize:'15px'}}>
                                   {discount.discountName}
                                </div>
                            ))}

                        </div>
                    ))}


                </div>
                    <div style={{fontSize:'30px', fontWeight:'bold'}}>Total (Before Discount) : Rs.{totalPrice} /=</div>
                    <div style={{fontSize:'30px', fontWeight:'bold'}}>Total Discounts : Rs.({totalDiscount}) /=</div>
                    { walletAmount >= (totalPrice - totalDiscount) &&
                        <div>
                            <div style={{fontSize:'30px', fontWeight:'bold'}}>Wallet amount : Rs.({totalPrice - totalDiscount}) /=</div>
                            <div style={{fontSize:'30px', fontWeight:'bold',color:'red'}}>Amount payable : Rs. 0 /=</div>
                            <div style={{marginTop:'10px'}}><span style={{padding:'10px'}}>
                                <h3>You don't need to pay for these reservations. Wallet savings will be used.</h3>
                                <button onClick={createReservationWithoutPayment}>Reserve</button>

                            </span>
                            </div>
                        </div>
                    }

                    { walletAmount < (totalPrice - totalDiscount) &&
                    <div>
                        <div style={{fontSize:'30px', fontWeight:'bold'}}>Wallet amount : Rs.({walletAmount}) /=</div>
                        <div style={{fontSize:'30px', fontWeight:'bold',color:'red'}}>Amount payable : Rs. {totalPrice - totalDiscount - walletAmount} /=</div>

                        <div style={{marginTop:'10px'}}><span style={{padding:'10px'}}>
                                <button onClick={createReservation}> Pay</button>
                            </span>
                        </div>

                    </div>}

                </>


            ) : (
                <div>
                    <h3>No data. Please make a reservation.</h3>
                </div>
            )}
        </div>
    )
}