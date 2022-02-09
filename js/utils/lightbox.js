function showModal(modal) {
	const myModal = new window.bootstrap.Modal(modal);
	if (myModal) myModal.show();
}

export function registerLightBox({ modalId, imageSelector, prevSelector, nextSelector }) {
	const modalElement = document.getElementById(modalId);
	if (!modalElement) return;
	if (modalElement.dataset.registered) return;

	const imageElement = document.querySelector(imageSelector);
	const prevButton = document.querySelector(prevSelector);
	const nextButton = document.querySelector(nextSelector);

	let imgList = [];
	let index = 0;

	function showImgAtIndex(index) {
		imageElement.src = imgList[index].src;
	}

	document.addEventListener('click', (event) => {
		const { target } = event;
		if (target.tagName !== 'IMG' || !target.dataset.album) return;

		imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
		index = [...imgList].findIndex((x) => x === target);

		showModal(modalElement);
		showImgAtIndex(index);
	});

	//handle click button prev - next
	if (prevButton) {
		prevButton.addEventListener('click', () => {
			index = (index - 1 + imgList.length) % imgList.length;
			showImgAtIndex(index);
		});
	}

	if (nextButton) {
		nextButton.addEventListener('click', () => {
			index = (index + 1) % imgList.length;
			showImgAtIndex(index);
		});
	}

	modalElement.dataset.registered = 'true';
}
