import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveRoute = (route) => axios.post(API_BASE_URL+"/saveRoute",route);

export const getAllRoutes = () => axios.post(API_BASE_URL+"/getAllRoutes");

export const findRouteById = (routeId) => axios.post(API_BASE_URL+"/findRouteById", {routeId : routeId});