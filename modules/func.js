let backModal = document.querySelector('.back-modal')

export function closeModal(block) {
	block.style.scale = 0;

	setTimeout(function () {
		block.style.display = 'none';
		backModal.style.display = 'none'
	}, 300);
}

export function openModal(block) {
	block.style.display = 'block';
	backModal.style.display = 'block';

	setTimeout(function () {
		block.style.scale = 1;
	}, 0);
}