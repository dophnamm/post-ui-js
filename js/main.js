import postApi from './api/postApi';

const main = async () => {
	const response = await postApi.getAll();
	console.log(response);
};

main();
