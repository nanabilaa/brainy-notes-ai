<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
$userEmail = $isLoggedIn ? $_SESSION['email'] : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainyNotes - PDF Summarizer</title>
    <link rel="stylesheet" href="styles/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
</head>
<body>
    <div class="sidebar">
        <div>
            <h1>BrainyNotes</h1>
            <div class="title-separator"></div> <!-- Separator below the title -->
            <p class="menu-title">Main Menu</p> <!-- Main Menu text -->
            <ul class="menu">
                <li><a href="#documents" class="nav-link selected"><i data-lucide="file-text"></i> My Documents</a></li>
                <li><a href="#history" class="nav-link"><i data-lucide="clock"></i> History</a></li>
                <li><a href="#settings" class="nav-link"><i data-lucide="settings"></i> Settings</a></li>
                <li><a href="#about" class="nav-link"><i data-lucide="info"></i> About</a></li>
            </ul>
        </div>
        <div class="auth-buttons">
            <div class="separator"></div>
            <?php if ($isLoggedIn): ?>
                <div class="user-info">
                    <span class="user-email"><?php echo htmlspecialchars($userEmail); ?></span>
                </div>
                <form action="/auth.php" method="POST" style="margin: 0;">
                    <input type="hidden" name="type" value="logout">
                    <button type="submit" class="logout-button">Logout</button>
                </form>
            <?php else: ?>
                <button class="login-button">Login</button>
                <button class="signup-button">Signup</button>
            <?php endif; ?>
        </div>
    </div>
    <div class="main-content" id="app">
        <!-- Dynamic content will be rendered here -->
    </div>
    <div id="auth-modal" class="modal hidden">
        <div class="modal-content">
            <div class="logo">BN</div>
            <div class="tabs">
                <button id="login-tab" class="active" data-target="login">Login</button>
                <button id="signup-tab" data-target="signup">Signup</button>
            </div>
            <form id="login-form" action="/auth.php" method="POST">
                <!-- Kentang mamai, kita tambahin hidden input buat submit type state -->
                <input type="hidden" name="type" value="login">
                
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="password" name="password" placeholder="Password" required>
                <a href="#" class="forgot-password">Forgot password?</a>
                <button type="submit">Login</button>
            </form>
            <form id="signup-form" action="/auth.php" method="POST" class="hidden">
                <!-- Kentang mamai, kita tambahin hidden input buat submit type state -->
                <input type="hidden" name="type" value="signup">

                <input type="text" name="full_name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                <button type="submit">Signup</button>
            </form>
            <button id="close-auth-modal" class="close-button" type="button" style="border: 2px solid #fff; background: transparent; color: #fff;">Close</button>
        </div>
    </div>
    <script src="scripts/app.js"></script>
</body>
</html>
