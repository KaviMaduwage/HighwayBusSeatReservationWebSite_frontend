import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const getAlertTypeList = () => axios.get(API_BASE_URL+"/getAlertTypeList");

export const createAlert = (alert) => axios.post(API_BASE_URL+"/createAlert",alert);

export const getAllAlerts = (userTypeId,userId) => axios.post(API_BASE_URL+"/getAllAlerts",{userTypeId:userTypeId,userId:userId});

export const getPassengerCurrentSchedule = (userTypeId,userId) => axios.post(API_BASE_URL+"/getPassengerCurrentSchedule",{userId:userId,userTypeId:userTypeId});

export const getAlertsByUserId = (userId) => axios.post(API_BASE_URL+"/getAlertsByUserId",{userId:userId});

export const deleteAlertByAlertId = (alertId) => axios.post(API_BASE_URL+"/deleteAlertByAlertId",{alertId:alertId});