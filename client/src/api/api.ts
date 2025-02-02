import axios from "axios";

const apiProducts = axios.create({
    baseURL: "http://localhost:3001/api"
});

export default apiProducts;