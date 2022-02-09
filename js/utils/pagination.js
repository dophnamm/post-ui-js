export function renderPagination(pagination) {
	const ulPagination = document.getElementById('pagination');
	if (!pagination || !ulPagination) return;

	const { _totalRows, _limit, _page } = pagination;
	const totalPages = Math.ceil(_totalRows / _limit);

	ulPagination.dataset.page = _page;
	ulPagination.dataset.totalPages = totalPages;

	if (_page <= 1) ulPagination.firstElementChild.classList.add('disabled');
	else ulPagination.firstElementChild.classList.remove('disabled');

	if (_page >= totalPages) ulPagination.lastElementChild.classList.add('disabled');
	else ulPagination.lastElementChild.classList.remove('disabled');
}

export function initPagination({ elementId, defaultParams, onChange }) {
	const ulPagination = document.getElementById(elementId);
	if (!ulPagination) return;

	const prevBtn = ulPagination.firstElementChild.firstElementChild;
	if (!prevBtn) return;
	prevBtn.addEventListener('click', (e) => {
		e.preventDefault();
		const page = Number.parseInt(ulPagination.dataset.page);
		if (page >= 2) onChange?.(page - 1);
	});

	const nextBtn = ulPagination.lastElementChild.lastElementChild;
	if (!nextBtn) return;
	nextBtn.addEventListener('click', (e) => {
		e.preventDefault();
		const page = Number.parseInt(ulPagination.dataset.page);
		const totalPages = ulPagination.dataset.totalPages;
		if (page <= totalPages) onChange?.(page + 1);
	});
}
