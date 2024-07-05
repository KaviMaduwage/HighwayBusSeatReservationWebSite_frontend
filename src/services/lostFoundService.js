import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const saveLostItem = (lostItem) => axios.post(API_BASE_URL+"/saveLostItem",lostItem);


export const saveFoundItem = (foundItem) => axios.post(API_BASE_URL+"/saveFoundItem",foundItem);

export const loadLostItems = () => axios.post(API_BASE_URL+"/loadLostItems");

export const getLostItemsAfterDate = (date) => axios.post(API_BASE_URL+"/getLostItemsAfterDate",{searchDate:date});

export const loadFoundItems = () => axios.post(API_BASE_URL+"/loadFoundItems");

export const getFoundItemsAfterDate = (date) => axios.post(API_BASE_URL+"/getFoundItemsAfterDate",{searchDate:date});

export const getUserLostItemPosts = (userId) => axios.post(API_BASE_URL+"/getUserLostItemPosts", {userId:userId});

export const getUserFoundItemPosts = (userId) => axios.post(API_BASE_URL+"/getUserFoundItemPosts", {userId:userId});

export const deleteUserFoundPost = (foundItemId,userId) => axios.post(API_BASE_URL+"/deleteUserFoundPost",{foundItemId:foundItemId,userId:userId});

export const deleteUserLostPost = (lostItemId,userId) => axios.post(API_BASE_URL+"/deleteUserLostPost",{lostItemId:lostItemId,userId:userId});