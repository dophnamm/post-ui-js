import toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toast = {
	info(message) {
		toastify({
			text: message,
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'right',
			style: {
				background: '#4dabf5',
			},
		}).showToast();
	},

	success(message) {
		toastify({
			text: message,
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'right',
			style: {
				background: '#1de9b6',
			},
		}).showToast();
	},

	error(message) {
		toastify({
			text: message,
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'right',
			style: {
				background: '#e91e63',
			},
		}).showToast();
	},
};
