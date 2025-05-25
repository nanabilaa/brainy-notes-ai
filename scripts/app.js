const AUTH_ENDPOINT = '/auth.php';

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ROUTES
  const routes = {
    home: `
      <div class="upload-area">
        <h2>PDF Summarizer</h2>
        <p>Upload PDF to get an AI-powered summary using a local LLM</p>
        <button id="select-pdf">Select PDF</button>
      </div>
      <div class="how-it-works">
        <div class="step"><img src="assets/images/upload-logo.png" alt="Step 1"></div>
        <div class="step"><img src="assets/images/proces-logo.png" alt="Step 2"></div>
        <div class="step"><img src="assets/images/review-logo.png" alt="Step 3"></div>
      </div>
    `,
    history: `
      <div class="upload-area">
        <h2>History</h2>
        <p>View your activity history.</p>
      </div>
    `,
    settings: `
      <div class="upload-area">
        <h2>Settings</h2>
        <p>Adjust your preferences here.</p>
      </div>
    `,
    about: `
      <div class="upload-area">
        <h2>About</h2>
        <p>Learn more about BrainyNotes.</p>
      </div>
    `
  };

  // NAVIGATION
  function navigateTo(route) {
    const app = document.getElementById('app');
    app.innerHTML = routes[route] || routes.home;
    lucide.createIcons(); // ensure icons render again on navigation
  }

  // expose to global for PHP-triggered rerender
  window.navigateTo = navigateTo;

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const route = href.substring(1);

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('selected'));
        link.classList.add('selected');

        navigateTo(route);
      }
    });
  });

  // AUTH MODAL
  const authModal = document.getElementById('auth-modal');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const closeAuthModalButton = document.getElementById('close-auth-modal');
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');

  function openAuthModal(defaultTab = 'login') {
    authModal.classList.remove('hidden');
    (defaultTab === 'login' ? loginTab : signupTab).click();
  }

  function closeAuthModal() {
    authModal.classList.add('hidden');
  }

  document.querySelector('.login-button')?.addEventListener('click', () => openAuthModal('login'));
  document.querySelector('.signup-button')?.addEventListener('click', () => openAuthModal('signup'));
  closeAuthModalButton?.addEventListener('click', closeAuthModal);

  [loginTab, signupTab].forEach(tab => {
    tab.addEventListener('click', () => {
      const isLogin = tab.dataset.target === 'login';
      loginForm.style.display = isLogin ? 'block' : 'none';
      signupForm.style.display = isLogin ? 'none' : 'block';
      loginTab.classList.toggle('active', isLogin);
      signupTab.classList.toggle('active', !isLogin);
    });
  });

  // SIGNUP FORM VALIDATION
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm.querySelector('input[name="email"]').value;
    const password = signupForm.querySelector('input[name="password"]').value;
    const confirmPassword = signupForm.querySelector('input[name="confirm_password"]').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await fetch(`${AUTH_ENDPOINT}?check_email=${encodeURIComponent(email)}&_=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin'
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      if (data.exists) {
        alert('This email is already registered. Please use a different email or login.');
      } else {
        signupForm.submit();
      }
    } catch (error) {
      console.error('Email check failed:', error);
      if (confirm(`Could not verify email (${error.message}). Continue anyway?`)) {
        signupForm.submit();
      }
    }
  });

  // LOGIN FORM SUBMIT HANDLER
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = 'Logging in...';
      submitBtn.disabled = true;
      loginForm.submit(); // normal redirect ke auth.php
    } catch (error) {
      console.error('Login error:', error);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Login failed. Please try again.');
    }
  });

  // INITIAL LOAD (only if not already redirected from login)
  if (!window.location.search.includes('loggedin')) {
    navigateTo('home');
  }
});
