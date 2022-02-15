import postApi from './api/postApi';
import { initPostForm } from './utils/postForm';
import { toast } from './utils/toast';

async function handlePostForm(formValue) {
	try {
		const savePost = formValue.id ? await postApi.update(formValue) : await postApi.add(formValue);

		toast.success(`${formValue.id ? 'Edit successfully' : 'Add successfully'}`);

		setTimeout(() => {
			window.location.assign(`post-detail.html?id=${savePost.id}`);
		}, 2000);
	} catch (error) {
		toast.error(`${formValue.id ? 'Edit failed' : 'Add failed'}`);
		console.log('failure from handlePostForm', error);
	}
}

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
			onSubmit: handlePostForm,
		});
	} catch (error) {
		console.log('failure fetch api post detail', error);
	}
})();
