<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About BrainyNotes</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles/styles.css">
  <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
</head>
<body>
  <!-- Sidebar -->
  <div class="sidebar">
    <div>
      <div class="logo"><i data-lucide="brain"></i> BrainyNotes</div>
      <div class="title-separator"></div>
      <p class="menu-title">Main Menu</p>
      <ul class="menu">
        <li><a href="index.php" class="nav-link"><i data-lucide="file-text"></i> My Documents</a></li>
        <li><a href="#history" class="nav-link"><i data-lucide="clock"></i> History</a></li>
        <li><a href="#settings" class="nav-link"><i data-lucide="settings"></i> Settings</a></li>
        <li><a href="about.php" class="nav-link"><i data-lucide="info"></i> About</a></li>
      </ul>
    </div>
    <div class="auth-buttons">
      <button class="login-button">Login</button>
      <button class="signup-button">Signup</button>
    </div>
  </div>
  <!-- Main Content -->
  <div class="main-content">
    <div class="container">
      <h1>About BrainyNotes</h1>
      <div class="subtitle">Learn more about our AI-powered PDF summarizer</div>
      <div class="card">
        <h2>Our Mission</h2>
        <p>
          BrainyNotes was created with a simple goal: to help people extract meaningful insights from documents quickly and efficiently. In a world where information overload is a constant challenge, we believe in the power of AI to help distill complex content into clear, actionable summaries.<br><br>
          Our application uses advanced natural language processing techniques to analyze PDFs and generate comprehensive summaries, saving you valuable time while ensuring you don't miss critical information.
        </p>
      </div>
      <div class="card">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-title">Local AI Processing</div>
            Process documents locally with our embedded LLM for enhanced privacy and security
          </div>
          <div class="feature-card">
            <div class="feature-title">Smart Summarization</div>
            Extract key points and generate concise summaries with adjustable detail levels
          </div>
          <div class="feature-card">
            <div class="feature-title">Document History</div>
            Keep track of your processed documents and access previous summaries instantly
          </div>
          <div class="feature-card">
            <div class="feature-title">Cross-Platform Support</div>
            Use BrainyNotes on any device with our responsive web interface
          </div>
        </div>
      </div>
      <div class="card">
        <h2>Technology Stack</h2>
        <table class="tech-table">
          <tr>
            <th>Frontend:</th>
            <td>React, Tailwind CSS, TypeScript</td>
          </tr>
          <tr>
            <th>Backend:</th>
            <td>Node.js, Express</td>
          </tr>
          <tr>
            <th>AI/ML:</th>
            <td>Python, PyTorch, Hugging Face Transformers</td>
          </tr>
          <tr>
            <th>Database:</th>
            <td>PostgreSQL</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <!-- Inisialisasi Lucide Icons -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
    });
  </script>
</body>
</html>
