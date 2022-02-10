import { setTextContent, truncateText } from './common';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

export function createTemplateElement(post) {
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

		//attach event
		//click redirec go to post detail
		const divElement = liElement.firstElementChild;
		if (divElement) {
			divElement.addEventListener('click', () => {
				window.location.assign(`/post-detail.html?id=${post.id}`);
			});
		}

		const buttonEdit = liElement.querySelector('[data-id="edit"]');
		if (buttonEdit) {
			buttonEdit.addEventListener('click', (event) => {
				window.location.assign(`/add-edit-post.html?id=${post.id}`);
				event.stopPropagation();
			});
		}

		return liElement;
	} catch (error) {
		console.log('failure from createTemplate', error);
	}
}

export function renderPostList(postList) {
	if (!Array.isArray(postList) || postList.length === 0) return;
	const ulElement = document.getElementById('postsList');

	//reset content
	ulElement.textContent = '';

	postList.map((post) => {
		const liElement = createTemplateElement(post);
		ulElement.appendChild(liElement);
	});
}
