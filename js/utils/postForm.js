import { setValueForm } from './common';

function getDataForm(form) {
	if (!form) return;

	const result = {};
	const data = new FormData(form);
	for (const [key, value] of data) {
		result[key] = value;
	}

	return result;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
	const form = document.getElementById(formId);
	if (!form) return;

	setValueForm(form, 'title', defaultValues.title);
	setValueForm(form, 'author', defaultValues.author);
	setValueForm(form, 'description', defaultValues.description);
	setValueForm(form, 'imageUrl', defaultValues.imageUrl);

	const tagAElement = document.querySelector('ul.nav > li > a#goToDetailPageLink');
	if (tagAElement) {
		tagAElement.textContent = 'View detail post';
		tagAElement.href = `/post-detail.html?id=${defaultValues.id}`;
	}

	const backgroundImg = document.getElementById('postHeroImage');
	if (backgroundImg) backgroundImg.style.backgroundImage = `url(${defaultValues.imageUrl})`;

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const dataSubmit = getDataForm(form);
		console.log(dataSubmit);
	});
}
