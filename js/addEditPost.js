import postApi from './api/postApi';
import { initPostForm } from './utils/postForm';

(async () => {
	try {
		const url = new URL(window.location);
		const postId = url.searchParams.get('id');
		const defaultValues = postId
			? await postApi.getById(postId)
			: {
					title: '',
					author: '',
					description: '',
					imageUrl: '',
			  };

		initPostForm({
			formId: 'postForm',
			defaultValues,
			onSubmit: (formValue) => {
				console.log('submit', formValue);
			},
		});
	} catch (error) {
		console.log('failure fetch api post detail', error);
	}
})();
