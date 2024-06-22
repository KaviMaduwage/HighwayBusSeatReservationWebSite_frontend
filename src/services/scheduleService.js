import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveSchedule = (schedule,driverId,conductorId) => axios.post(API_BASE_URL+"/saveSchedule",{schedule:schedule, driverId:driverId, conductorId:conductorId});

export const loadScheduleByDate = (date) => axios.post(API_BASE_URL+"/loadScheduleByDate",{date:date});

// export const checkSeatAvailabilityByScheduleId = (scheduleId) => axios.post(API_BASE_URL+"/checkSeatAvailabilityByScheduleId",{scheduleId:scheduleId});

export const findBusScheduleByDateTownAndRoute = (date, origin, destination, routeId) => axios.post(API_BASE_URL+"/findBusScheduleByDateTownAndRoute",{date:date,origin:origin,destination:destination,routeId:routeId});

export const findScheduleById =  (scheduleId) => axios.post(API_BASE_URL+"/findScheduleById",{scheduleId:scheduleId});

export const updateTripStart = (scheduleId) => axios.post(API_BASE_URL+"/updateTripStart",{scheduleId:scheduleId});

export const updateTripEnding = (scheduleId) => axios.post(API_BASE_URL+"/updateTripEnding",{scheduleId:scheduleId});
