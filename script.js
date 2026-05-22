// Login Form Interactive JavaScript

document.addEventListener('DOMContentLoaded', function () {
  

  const emailInput = document.querySelector('.Email');
  const passwordInput = document.querySelector('.Password');
  const signInButton = document.querySelector('.Sign-in-button');
  const googleImg = document.querySelector('.Image1');
  const larkImg = document.querySelector('.Lark');


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  function isValidPassword(password) {
    return password.length >= 6;
  }

  function showError(input, message) {
    removeError(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #ff4444; font-size: 12px; margin-top: 5px; margin-bottom: 10px;';
    input.style.border = '2px solid #ff4444';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }

  function removeError(input) {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.className === 'error-message') {
      existingError.remove();
    }
    input.style.border = '';
  }

  function showSuccess(message) {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) existingSuccess.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
            background: linear-gradient(135deg, #00c853, #00e676);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            position: fixed;
            top: 20px;
            right: 20px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 200, 83, 0.4);
            animation: slideIn 0.5s ease;
            z-index: 1000;
        `;
    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.style.animation = 'slideOut 0.5s ease';
      setTimeout(() => successDiv.remove(), 500);
    }, 3000);
  }

  const style = document.createElement('style');
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .Email:focus, .Password:focus {
            outline: none;
            border: 2px solid #4285f4 !important;
            box-shadow: 0 0 10px rgba(66, 133, 244, 0.3);
            transition: all 0.3s ease;
        }
        .Sign-in-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(66, 133, 244, 0.4);
            transition: all 0.3s ease;
        }
        .Sign-in-button:active {
            transform: translateY(0);
        }
        .Image1:hover, .Lark:hover {
            transform: scale(1.1);
            cursor: pointer;
            transition: transform 0.3s ease;
        }
    `;
  document.head.appendChild(style);

  emailInput.addEventListener('input', function () {
    if (this.value && !isValidEmail(this.value)) {
      this.style.border = '2px solid #ffaa00';
    } else if (this.value && isValidEmail(this.value)) {
      this.style.border = '2px solid #00c853';
      removeError(this);
    } else {
      this.style.border = '';
    }
  });

  passwordInput.addEventListener('input', function () {
    if (this.value && !isValidPassword(this.value)) {
      this.style.border = '2px solid #ffaa00';
    } else if (this.value && isValidPassword(this.value)) {
      this.style.border = '2px solid #00c853';
      removeError(this);
    } else {
      this.style.border = '';
    }
  });

  signInButton.addEventListener('click', function (e) {
    e.preventDefault();
    let isValid = true;

    if (!emailInput.value) {
      showError(emailInput, 'Please enter your email address');
      emailInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => emailInput.style.animation = '', 500);
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address');
      emailInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => emailInput.style.animation = '', 500);
      isValid = false;
    }

    if (!passwordInput.value) {
      showError(passwordInput, 'Please enter your password');
      passwordInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => passwordInput.style.animation = '', 500);
      isValid = false;
    } else if (!isValidPassword(passwordInput.value)) {
      showError(passwordInput, 'Password must be at least 6 characters');
      passwordInput.style.animation = 'shake 0.5s ease';
      setTimeout(() => passwordInput.style.animation = '', 500);
      isValid = false;
    }

    if (isValid) {
      signInButton.textContent = 'Signing in...';
      signInButton.disabled = true;
      signInButton.style.opacity = '0.7';

      setTimeout(() => {
        showSuccess('✓ Login successful! Welcome back!');
        signInButton.textContent = 'Sign in';
        signInButton.disabled = false;
        signInButton.style.opacity = '1';

        emailInput.value = '';
        passwordInput.value = '';
        emailInput.style.border = '';
        passwordInput.style.border = '';
      }, 1500);
    }
  });

  googleImg.addEventListener('click', function () {
    this.style.animation = 'pulse 0.3s ease';
    setTimeout(() => this.style.animation = '', 300);
    showSuccess('🔗 Redirecting to Google Sign-in...');
  });

  larkImg.addEventListener('click', function () {
    this.style.animation = 'pulse 0.3s ease';
    setTimeout(() => this.style.animation = '', 300);
    showSuccess('🔗 Redirecting to Lark Sign-in...');
  });

  passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      signInButton.click();
    }
  });

  emailInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      passwordInput.focus();
    }
  });

  console.log('✓ Login form JavaScript loaded successfully!');
});
