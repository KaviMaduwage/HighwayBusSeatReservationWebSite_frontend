import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveFeedBack = (feedback) => axios.post(API_BASE_URL+"/saveFeedBack",{feedback:feedback});

export const getAllFeedbacks = () => axios.post(API_BASE_URL+"/getAllFeedbacks");