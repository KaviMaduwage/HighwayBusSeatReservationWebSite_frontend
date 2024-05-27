import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const generateBusOwnerListReport = () => axios.get(API_BASE_URL+"/generateBusOwnerListReport",{responseType: 'arraybuffer'});

export const generateReservationHistoryReport = (userId,fromDate,toDate) => axios.get(API_BASE_URL+"/generateReservationHistoryReport",{})