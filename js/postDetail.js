import postApi from './api/postApi';
import { setTextContent } from './utils';
import dayjs from 'dayjs';

async function initPostDetail() {
	try {
		const queryParams = new URLSearchParams(window.location.search);
		const postId = queryParams.get('id');
		const postData = await postApi.getById(postId);

		renderPostDetail(postData);
	} catch (error) {
		console.log('failure from post detail call api', error);
	}
}

function renderPostDetail(post) {
	if (!post) return;
	const main = document.querySelector('main');

	const navLink = document.getElementById('goToEditPageLink');
	if (navLink) {
		navLink.href = `/add-edit-post.html?id=${post.id}`;

		navLink.innerHTML = `
                <i class="fa-solid fa-pen-to-square"></i>
                Edit Post
        `;
	}

	const heroImg = document.getElementById('postHeroImage');
	if (heroImg) {
		heroImg.style.backgroundImage = `url(${post.imageUrl})`;
	}

	const postImg = document.getElementById('postDetailImage');
	if (postImg) {
		postImg.src = post.imageUrl;
		postImg.addEventListener('error', () => {
			postImg.src = 'https://via.placeholder.com/1378x400?text=dophnamm@gmail.com';
		});
	}

	setTextContent(main, '#postDetailTitle', post.title);
	setTextContent(main, '#postDetailAuthor', post.author);
	setTextContent(main, '#postDetailDescription', post.description);
	setTextContent(main, '#postDetailImage', post.description);
	setTextContent(main, '#postDetailTimeSpan', dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm'));
}

(() => {
	initPostDetail();
	renderPostDetail();
})();
