import postApi from './api/postApi';
import { setTextContent, truncateText } from './utils/';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

function createTemplateElement(post) {
	try {
		const templateElement = document.getElementById('postItemTemplate');
		if (!templateElement) return;

		const liElement = templateElement.content.firstElementChild.cloneNode(true);
		if (!liElement) return;

		const thumbElement = liElement.querySelector('[data-id="thumbnail"]');
		thumbElement.src = post.imageUrl;
		thumbElement.addEventListener('error', () => {
			thumbElement.src = 'https://via.placeholder.com/1378x400?text=dophnamm@gmail.com';
		});

		setTextContent(liElement, '[data-id="title"]', post.title);
		setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100));
		setTextContent(liElement, '[data-id="author"]', post.author);
		setTextContent(liElement, '[data-id="timeSpan"]', dayjs(post.updatedAt).fromNow());

		return liElement;
	} catch (error) {
		console.log('failure from createTemplate', error);
	}
}

function renderPostList(postList) {
	if (!Array.isArray(postList) || postList.length === 0) return;
	const ulElement = document.getElementById('postsList');

	postList.map((post) => {
		const liElement = createTemplateElement(post);
		ulElement.appendChild(liElement);
	});
}

(async () => {
	try {
		const config = {
			_page: 1,
			_limit: 6,
		};

		const data = await postApi.getAll(config);
		renderPostList(data.data);
	} catch (error) {
		console.log('failure from main.js call api getAll', error);
	}
})();
