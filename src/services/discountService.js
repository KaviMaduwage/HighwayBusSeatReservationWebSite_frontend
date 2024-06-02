import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveDiscount = (userId,discount) => axios.post(API_BASE_URL+"/saveDiscount",{userId:userId,discount:discount});

export const getAllDiscounts = () => axios.post(API_BASE_URL+"/getAllDiscounts");
export const getDiscountById = (discountId) => axios.post(API_BASE_URL+"/getDiscountById",{discountId:discountId});

export const searchDiscountsByDateRouteAndBusOwner = (fromDate,routeId,busOwnerId) => axios.post(API_BASE_URL+"/searchDiscountsByDateRouteAndBusOwner",{fromDate:fromDate,routeId:routeId,busOwnerId:busOwnerId});