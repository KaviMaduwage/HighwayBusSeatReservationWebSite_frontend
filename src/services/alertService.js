import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const getAlertTypeList = () => axios.get(API_BASE_URL+"/getAlertTypeList");

export const createAlert = (alert) => axios.post(API_BASE_URL+"/createAlert",alert);

export const getAllAlerts = (userTypeId) => axios.post(API_BASE_URL+"/getAllAlerts",{userTypeId:userTypeId});

export const getPassengerCurrentSchedule = (userTypeId,userId) => axios.post(API_BASE_URL+"/getPassengerCurrentSchedule",{userId:userId,userTypeId:userTypeId});