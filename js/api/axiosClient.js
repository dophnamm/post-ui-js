import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'https://js-post-api.herokuapp.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use(
	function (config) {
		const accessToken = localStorage.getItem('access_token');

		if (accessToken) {
			config.headers.Authorization = `Baerer ${accessToken}`;
		}

		return config;
	},

	function (error) {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	function (response) {
		return response.data;
	},

	function (error) {
		return Promise.reject(error);
	}
);

export default axiosClient;
