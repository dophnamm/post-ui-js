import { setTextContent, setValueForm } from './common';
import * as yup from 'yup';

function getFormValue(form) {
	if (!form) return;

	const result = {};
	const data = new FormData(form);
	for (const [key, value] of data) {
		result[key] = value;
	}

	return result;
}

function schemaPostForm() {
	return yup.object().shape({
		title: yup.string().required('Please enter title'),
		author: yup
			.string()
			.required('Please enter author')
			.test(
				'at-least-two-words',
				'please enter at two words',
				(value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
			),
		description: yup.string(),
	});
}

function setFieldForm(form, name, error) {
	const element = form.querySelector(`[name="${name}"]`);

	if (element) {
		element.setCustomValidity(error);
		setTextContent(element.parentElement, '.invalid-feedback', error);
	}
}

async function validateFormValue(form, formValue) {
	try {
		//reset previous errors
		['title', 'author'].forEach((name) => {
			setFieldForm(form, name, '');
		});

		const schema = schemaPostForm();
		await schema.validate(formValue, { abortEarly: false });
	} catch (error) {
		const errorLog = {};

		if (error.name === 'ValidationError' && Array.isArray(error.inner)) {
			for (const validateError of error.inner) {
				const name = validateError.path;

				if (errorLog[name]) continue;

				setFieldForm(form, name, validateError.message);
				errorLog[name] = true;
			}
		}
	}

	const isValid = form.checkValidity();
	if (!isValid) form.classList.add('was-validated');

	return isValid;
}

export function initPostForm({ formId, defaultValues, onSubmit }) {
	const form = document.getElementById(formId);
	if (!form) return;

	setValueForm(form, 'title', defaultValues.title);
	setValueForm(form, 'author', defaultValues.author);
	setValueForm(form, 'description', defaultValues.description);
	setValueForm(form, 'imageUrl', defaultValues.imageUrl);

	const tagAElement = document.querySelector('ul.nav > li > a#goToDetailPageLink');
	if (tagAElement && defaultValues.id) {
		tagAElement.textContent = 'View detail post';
		tagAElement.href = `/post-detail.html?id=${defaultValues.id}`;
	}

	const backgroundImg = document.getElementById('postHeroImage');
	if (backgroundImg) backgroundImg.style.backgroundImage = `url(${defaultValues.imageUrl})`;

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		const formValue = getFormValue(form);
		formValue.id = defaultValues.id;

		const isValid = await validateFormValue(form, formValue);
		if (!isValid) return;

		onSubmit(formValue);
	});
}
