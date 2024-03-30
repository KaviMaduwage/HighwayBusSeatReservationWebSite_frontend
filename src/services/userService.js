import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const userRegistration = (userData) => axios.post(API_BASE_URL+"/signUp",userData);

export const userLogin = (user) => axios.post(API_BASE_URL+"/login", user);