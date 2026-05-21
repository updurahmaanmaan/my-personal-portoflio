document.addEventListener('DOMContentLoaded', () => {
	const nameInput = document.querySelector('.js-name-input');
	const nameContainer = document.querySelector('.-js-name-input-container');

	const emailInput = document.querySelector('.js-email-input');
	const emailContainer = document.querySelector('.js-email-input-container');

	const passwordInput = document.querySelector('.js-password-input');
	const passwordContainer = document.querySelector('.js-password-input-container');

	const registerBtn = document.querySelector('.js-register-button');

	function showMessage(container, text, isError = true) {
		container.textContent = text;
		container.style.color = isError ? '#b00020' : '#0a7a07';
		container.style.fontSize = '0.9rem';
		container.style.minHeight = '1.2em';
	}

	function clearMessage(container) {
		container.textContent = '';
	}

	function validateName() {
		const value = nameInput.value.trim();
		if (!value) {
			showMessage(nameContainer, 'Please enter your full name.');
			return false;
		}
		if (value.length < 2) {
			showMessage(nameContainer, 'Name is too short.');
			return false;
		}
		clearMessage(nameContainer);
		return true;
	}

	function validateEmail() {
		const value = emailInput.value.trim();
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!value) {
			showMessage(emailContainer, 'Please enter your email address.');
			return false;
		}
		if (!re.test(value)) {
			showMessage(emailContainer, 'Enter a valid email (example@domain.com).');
			return false;
		}
		clearMessage(emailContainer);
		return true;
	}

	function validatePassword() {
		const value = passwordInput.value;
		if (!value) {
			showMessage(passwordContainer, 'Please create a password.');
			return false;
		}
		if (value.length < 8) {
			showMessage(passwordContainer, 'Password must be at least 8 characters.');
			return false;
		}
		if (!/[0-9]/.test(value) || !/[A-Za-z]/.test(value)) {
			showMessage(passwordContainer, 'Use letters and numbers in your password.');
			return false;
		}
		clearMessage(passwordContainer);
		return true;
	}

	function handleRegister(e) {
		if (e) e.preventDefault();
		const okName = validateName();
		const okEmail = validateEmail();
		const okPassword = validatePassword();
		if (okName && okEmail && okPassword) {
			showMessage(passwordContainer, 'Registration successful! Check your email to confirm.', false);
		// clear fields and redirect to a confirmation page after a short delay
		nameInput.value = '';
		emailInput.value = '';
		passwordInput.value = '';
		setTimeout(() => {
			window.location.href = 'register-success.html';
		}, 1000);
	}
}

// make sure get-started button works even if wrapped in anchor tag for styling
document.addEventListener('DOMContentLoaded', () => {
	const gsBtn = document.getElementById('get-started-btn');
	if (gsBtn) {
		gsBtn.addEventListener('click', () => {
			window.location.href = 'get-started.html';
		});
	}
});
	nameInput.addEventListener('input', validateName);
	emailInput.addEventListener('input', validateEmail);
	passwordInput.addEventListener('input', validatePassword);

	[nameInput, emailInput, passwordInput].forEach((el) => {
		el.addEventListener('keydown', (ev) => {
			if (ev.key === 'Enter') handleRegister(ev);
		});
	});

	registerBtn.addEventListener('click', handleRegister);
});

