<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
$userEmail = $isLoggedIn ? $_SESSION['email'] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BrainyNotes - PDF Summarizer</title>
  <link rel="stylesheet" href="/styles/styles.css?v=4">

  <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js" defer></script>
  <script src="/scripts/app.js?v=4" defer></script>

  <?php if (isset($_GET['loggedin'])): ?>
  <script>
    // SPA refresh trigger after redirect login
    window.onload = () => {
      console.log("SPA refresh after login");
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
      <div class="logo">BN</div>
      <div class="tabs">
        <button id="login-tab" class="active" data-target="login">Login</button>
        <button id="signup-tab" data-target="signup">Signup</button>
      </div>
      <form id="login-form" action="/auth.php" method="POST">
        <input type="hidden" name="type" value="login">
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Password" required>
        <a href="#" class="forgot-password">Forgot password?</a>
        <button type="submit">Login</button>
      </form>
      <form id="signup-form" action="/auth.php" method="POST" class="hidden">
        <input type="hidden" name="type" value="signup">
        <input type="text" name="full_name" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email Address" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="password" name="confirm_password" placeholder="Confirm Password" required>
        <button type="submit">Signup</button>
      </form>
      <button id="close-auth-modal" class="close-button" type="button">Close</button>
    </div>
  </div>

  <!-- Modal handler -->
  <script>
    function showModal(tab = 'login') {
      const modal = document.getElementById('auth-modal');
      modal.classList.remove('hidden');
      document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
      document.getElementById('signup-form').classList.toggle('hidden', tab !== 'signup');
    }

    document.getElementById('close-auth-modal').addEventListener('click', () => {
      document.getElementById('auth-modal').classList.add('hidden');
    });
  </script>
</body>
</html>
