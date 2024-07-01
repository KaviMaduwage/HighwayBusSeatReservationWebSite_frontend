import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveLostItem = (lostItem) => axios.post(API_BASE_URL+"/saveLostItem",lostItem);


export const saveFoundItem = (foundItem) => axios.post(API_BASE_URL+"/saveFoundItem",foundItem);