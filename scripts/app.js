const AUTH_ENDPOINT = '/auth.php';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const routes = {
        home: `
            <div class="upload-area">
                <h2>PDF Summarizer</h2>
                <p>Upload PDF to get an AI-powered summary using a local LLM</p>
                <button id="select-pdf">Select PDF</button>
            </div>
            <div class="how-it-works">
                <div class="step">
                    <img src="assets/images/upload.png" alt="Step 1">
                    <h3>01</h3>
                    <p>Upload Your PDF</p>
                </div>
                <div class="step">
                    <img src="assets/images/process.png" alt="Step 2">
                    <h3>02</h3>
                    <p>Process with AI</p>
                </div>
                <div class="step">
                    <img src="assets/images/review.png" alt="Step 3">
                    <h3>03</h3>
                    <p>Review Summary</p>
                </div>
            </div>
        `,
        history: `
            <h2>History</h2>
            <p>View your activity history.</p>
        `,
        settings: `
            <h2>Settings</h2>
            <p>Adjust your preferences here.</p>
        `,
        about: `
            <h2>About</h2>
            <p>Learn more about BrainyNotes.</p>
        `
    };

    function navigateTo(route) {
        const app = document.getElementById('app');
        app.innerHTML = routes[route] || routes.home;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('href').substring(1);

            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('selected'));

            e.target.classList.add('selected');

            navigateTo(route);
        });
    });

    const authModal = document.querySelector('#auth-modal');
    const loginForm = document.querySelector('#login-form');
    const signupForm = document.querySelector('#signup-form');
    const closeAuthModalButton = document.querySelector('#close-auth-modal');
    const loginTab = document.querySelector('#login-tab');
    const signupTab = document.querySelector('#signup-tab');

    function openAuthModal(defaultTab = 'login') {
        authModal.classList.remove('hidden');
        if (defaultTab === 'login') {
            loginTab.click(); 
        } else {
            signupTab.click();
        }
    }

    function closeAuthModal() {
        authModal.classList.add('hidden');
    }

    document.querySelector('.login-button').addEventListener('click', () => openAuthModal('login'));
    document.querySelector('.signup-button').addEventListener('click', () => openAuthModal('signup'));

    closeAuthModalButton.addEventListener('click', closeAuthModal);

    [loginTab, signupTab].forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.target === 'login') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
                loginTab.classList.add('active');
                signupTab.classList.remove('active');
            } else {
                signupForm.style.display = 'block';
                loginForm.style.display = 'none';
                signupTab.classList.add('active');
                loginTab.classList.remove('active');
            }
        });
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form submission until we validate
        
        const email = signupForm.querySelector('input[name="email"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirm_password"]').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            // Use Supabase API through our backend proxy to check email
            const response = await fetch(`${AUTH_ENDPOINT}?check_email=${encodeURIComponent(email)}&_=${Date.now()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            if (data.exists) {
                alert('This email is already registered. Please use a different email or login.');
            } else {
                // Email is available, submit the form
                signupForm.submit();
            }
        } catch (error) {
            console.error('Email check failed:', error);
            // Fallback option if the check fails
            if (confirm(`Could not verify email availability (${error.message}). Do you want to continue anyway?`)) {
                signupForm.submit();
            }
        }
    });

    // Enhance login form with feedback
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Show loading state
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            // Submit form with regular form submission
            loginForm.submit();
        } catch (error) {
            console.error('Login error:', error);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Login failed. Please try again later.');
        }
    });

    navigateTo('home');
});
