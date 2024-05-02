import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const generateBusOwnerListReport = () => axios.get(API_BASE_URL+"/generateBusOwnerListReport",{responseType: 'arraybuffer'});