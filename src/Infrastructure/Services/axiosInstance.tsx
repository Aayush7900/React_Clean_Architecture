import axios from "axios";
import { config } from "process";

const axiosInstance = axios.create({
	baseURL: "https://localhost:7008/api",
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);
export default axiosInstance;
