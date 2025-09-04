<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
$userEmail = $isLoggedIn ? $_SESSION['email'] : '';

// Check for API authentication
$hasAPIToken = false;
if (!$isLoggedIn) {
    // JavaScript will check localStorage for API token
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BrainyNotes - PDF Summarizer</title>
  <link rel="stylesheet" href="/styles/styles.css?v=5">

  <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" defer></script>
  <script src="/scripts/app.js?v=6" defer></script>

  <script>
    // Check API authentication on load
    window.addEventListener('DOMContentLoaded', () => {
      const apiToken = localStorage.getItem('session_token');
      const userInfo = localStorage.getItem('user_info');
      
      if (apiToken && userInfo) {
        // Hide auth buttons and show user info for API users
        const authButtons = document.querySelector('.auth-buttons');
        const userData = JSON.parse(userInfo);
        
        authButtons.innerHTML = `
          <div class="user-info">
            <span class="user-email">${userData.username}</span>
          </div>
          <button type="button" class="logout-button" onclick="handleAPILogout()">Logout</button>
        `;
      }
    });

    function handleAPILogout() {
      localStorage.removeItem('session_token');
      localStorage.removeItem('user_info');
      window.location.reload();
    }
  </script>

  <?php if (isset($_GET['loggedin'])): ?>
  <script>
    window.onload = () => {
      console.log("Login successful - redirecting to main page");
      if (typeof lucide !== 'undefined') lucide.createIcons();
      if (typeof window.navigateTo === 'function') {
        window.navigateTo('home');
      }
    };
  </script>
  <?php endif; ?>
</head>

<body>
  <div class="sidebar">
    <div>
      <div class="logo"><i data-lucide="brain"></i> BrainyNotes</div>
      <div class="title-separator"></div>
      <p class="menu-title">Main Menu</p>
      <ul class="menu">
        <li><a href="#home" class="nav-link"><i data-lucide="file-text"></i> My Documents</a></li>
        <li><a href="#history" class="nav-link"><i data-lucide="clock"></i> History</a></li>
        <li><a href="#settings" class="nav-link"><i data-lucide="settings"></i> Settings</a></li>
        <li><a href="#about" class="nav-link"><i data-lucide="info"></i> About</a></li>
      </ul>
    </div>
    <div class="auth-buttons">
      <div class="separator"></div>
      <?php if ($isLoggedIn): ?>
        <div class="user-info">
          <span class="user-email"><?= htmlspecialchars($userEmail); ?></span>
        </div>
        <form action="/auth.php" method="POST">
          <input type="hidden" name="type" value="logout">
          <button type="submit" class="logout-button">Logout</button>
        </form>
      <?php else: ?>
        <button class="login-button" onclick="showModal()">Login</button>
        <button class="signup-button" onclick="showModal('signup')">Signup</button>
      <?php endif; ?>
    </div>
  </div>

  <div class="main-content" id="app">
    <!-- Konten akan dirender sepenuhnya oleh JavaScript (SPA) -->
  </div>

  <!-- Modal Login/Signup -->
  <div id="auth-modal" class="modal hidden">
    <div class="modal-content">
      <div class="modal-logo">
        <i data-lucide="brain"></i>
      </div>
      <h2>BrainyNotes</h2>
      
      <div class="auth-tabs">
        <button id="login-tab" class="auth-tab active" data-target="login">Login</button>
        <button id="signup-tab" class="auth-tab" data-target="signup">Signup</button>
      </div>

      <form id="login-form" action="/auth.php" method="POST">
        <input type="hidden" name="type" value="login">
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Password" required>
        <a href="#" class="forgot-password">Forgot password?</a>
        <button type="submit" class="auth-submit-btn">Login</button>
        <p class="auth-switch">Not a member? <a href="#" onclick="switchToSignup()">Signup now</a></p>
      </form>

      <form id="signup-form" action="/auth.php" method="POST" style="display: none;">
        <input type="hidden" name="type" value="signup">
        <input type="text" name="full_name" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="password" name="confirm_password" placeholder="Confirm Password" required>
        <button type="submit" class="auth-submit-btn">Signup</button>
        <p class="auth-switch">Already a member? <a href="#" onclick="switchToLogin()">Login now</a></p>
      </form>

      <button id="close-auth-modal" class="close-button" type="button">×</button>
    </div>
  </div>

  <!-- Modal handler -->
  <script>
    function showModal(tab = 'login') {
      const modal = document.getElementById('auth-modal');
      modal.classList.remove('hidden');
      if (tab === 'signup') {
        switchToSignup();
      } else {
        switchToLogin();
      }
    }

    function switchToLogin() {
      document.getElementById('login-form').style.display = 'block';
      document.getElementById('signup-form').style.display = 'none';
      document.getElementById('login-tab').classList.add('active');
      document.getElementById('signup-tab').classList.remove('active');
    }

    function switchToSignup() {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('signup-form').style.display = 'block';
      document.getElementById('login-tab').classList.remove('active');
      document.getElementById('signup-tab').classList.add('active');
    }

    document.getElementById('close-auth-modal').addEventListener('click', () => {
      document.getElementById('auth-modal').classList.add('hidden');
    });
  </script>
</body>
</html>
