import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const blockSeat = (userId,scheduleId,row,col) => axios.post(API_BASE_URL+"/blockSeat",{userId:userId, scheduleId:scheduleId,row:row,col:col});

export const findBlockedSeatsByScheduleId = (scheduleId) => axios.post(API_BASE_URL+"/findBlockedSeatsByScheduleId",{scheduleId:scheduleId});

export const unblockSelectedSeat = (userId,scheduleId,row,col) => axios.post(API_BASE_URL+"/unblockSelectedSeat",{userId:userId, scheduleId:scheduleId,row:row,col:col})

export const addReservationToCart = (reserveScheduleId,userId,pickUpPoint,dropOffPoint,remark) => axios.post(API_BASE_URL+"/addReservationToCart",
    {reserveScheduleId:reserveScheduleId,userId:userId,pickUpPoint:pickUpPoint,dropOffPoint:dropOffPoint,remark:remark});

export const loadCartListByUserId = (userId) => axios.post(API_BASE_URL+"/loadCartListByUserId",{userId:userId});

export const deleteCartByCartId = (cartId) => axios.post(API_BASE_URL+"/deleteCartByCartId",{cartId:cartId});