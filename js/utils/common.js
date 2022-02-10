export function setTextContent(parent, selector, text) {
	if (!parent) return;

	const element = parent.querySelector(selector);
	if (element) element.textContent = text;
}

export function setValueForm(parent, selector, values) {
	if (!parent) return;

	const element = parent.querySelector(`.form-group > [name="${selector}"]`);
	return (element.value = values);
}

export function truncateText(text, maxLength) {
	if (text.length <= maxLength) return text;

	return `${text.slice(0, maxLength - 3)}...`;
}
