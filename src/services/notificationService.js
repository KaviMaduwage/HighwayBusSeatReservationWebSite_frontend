import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const loadNotificationsByUserId = (userId) => axios.post(API_BASE_URL+"/loadNotificationsByUserId", {userId:userId});
