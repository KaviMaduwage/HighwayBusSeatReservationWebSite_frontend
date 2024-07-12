import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const blockSeat = (userId,scheduleId,row,col) => axios.post(API_BASE_URL+"/blockSeat",{userId:userId, scheduleId:scheduleId,row:row,col:col});

export const findBlockedSeatsByScheduleId = (scheduleId) => axios.post(API_BASE_URL+"/findBlockedSeatsByScheduleId",{scheduleId:scheduleId});

export const findReservedSeatsByScheduleId = (scheduleId) => axios.post(API_BASE_URL+"/findReservedSeatsByScheduleId",{scheduleId:scheduleId});
export const unblockSelectedSeat = (userId,scheduleId,row,col) => axios.post(API_BASE_URL+"/unblockSelectedSeat",{userId:userId, scheduleId:scheduleId,row:row,col:col})

export const addReservationToCart = (reserveScheduleId,userId,pickUpPoint,dropOffPoint,remark) => axios.post(API_BASE_URL+"/addReservationToCart",
    {reserveScheduleId:reserveScheduleId,userId:userId,pickUpPoint:pickUpPoint,dropOffPoint:dropOffPoint,remark:remark});

export const loadCartListByUserId = (userId) => axios.post(API_BASE_URL+"/loadCartListByUserId",{userId:userId});

export const deleteCartByCartId = (cartId) => axios.post(API_BASE_URL+"/deleteCartByCartId",{cartId:cartId});

export const makeReservation = (cartList, userId, totalPrice) => axios.post(API_BASE_URL+"/makeReservation",{cartList:cartList,userId:userId,totalPrice:totalPrice});

export const generateTicketPDF = (reservationId) => axios.get(API_BASE_URL+"/generateTicket",{params : { reservationId: reservationId },responseType: 'arraybuffer'});

export const findReservationsByUserId = (userId) => axios.post(API_BASE_URL+"/findReservationsByUserId", {userId:userId});

export const findReservedSeatsByReservationId = (reservationId) => axios.post(API_BASE_URL+"/findReservedSeatsByReservationId",{reservationId:reservationId});

export const cancelReservations = (type,cancelSeatList,userId) => axios.post(API_BASE_URL+"/cancelReservations",{type:type,cancelSeatList:cancelSeatList,userId:userId});

export const getUpcomingReservationsByUserId = (userId) => axios.post(API_BASE_URL+"/getUpcomingReservationsByUserId",{userId:userId});

export const makeReservationFromWalletSavings =(cartList, userId, totalPrice) => axios.post(API_BASE_URL+"/makeReservationFromWalletSavings",{cartList:cartList,userId:userId,totalPrice:totalPrice});

export const loadTotalPaymentsForEachSchedule = (searchDate,userTypeId,userId) => axios.post(API_BASE_URL+"/loadTotalPaymentsForEachSchedule",{searchDate:searchDate,userTypeId:userTypeId,userId:userId})