import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const generateBusOwnerListReport = () => axios.get(API_BASE_URL+"/generateBusOwnerListReport",{responseType: 'arraybuffer'});

export const generateUserReservationHistoryReport = (userId,fromDate,toDate) => axios.get(API_BASE_URL+"/generateUserReservationHistoryReport",{params : { userId:userId,fromDate:fromDate,toDate:toDate },responseType: 'arraybuffer'})
