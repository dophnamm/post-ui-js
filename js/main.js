import axiosClient from './api/axiosClient';

const main = async () => {
	const response = await axiosClient.get('/posts');
	const data = await response.data;
	console.log(data);
};

main();
