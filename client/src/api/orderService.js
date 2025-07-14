import axios from "axios";
// const orderUrl="https://store-1-dmhc.onrender.com/api/order";
// const orderUrl="http://localhost:5500/api/order";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5500";

const orderUrl = `${API_BASE_URL}/api/order`;



export const addOrder = (order, token) => {
    return axios.post(`${orderUrl}`, order, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}