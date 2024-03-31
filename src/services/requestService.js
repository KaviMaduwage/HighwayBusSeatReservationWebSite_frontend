import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const getRequests = () => axios.get(API_BASE_URL+"/request");

export const rejectSelectedRequest = (selectedRequestId) => axios.post(API_BASE_URL+"/rejectRequest", { requestId: selectedRequestId });

export const acceptSelectedRequest = (selectedRequestId) => axios.post(API_BASE_URL+"/acceptRequest", { requestId: selectedRequestId });
