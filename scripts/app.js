const AUTH_ENDPOINT = '/auth.php';
const API_BASE_URL = 'http://localhost:8000';

class APIClient {
  constructor() {
    this.token = localStorage.getItem('session_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Request failed');
    }

    return data;
  }

  async login(username, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    if (data.session_token) {
      this.token = data.session_token;
      localStorage.setItem('session_token', this.token);
      localStorage.setItem('user_info', JSON.stringify({
        user_id: data.user_id,
        username: data.username
      }));
    }
    
    return data;
  }

  async register(username, password, email) {
    return await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email })
    });
  }

  async uploadDocument(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return await response.json();
  }

  async queryDocument(question, mode = 'hybrid', documentId = null) {
    return await this.request('/query', {
      method: 'POST',
      body: JSON.stringify({
        question,
        mode,
        document_id: documentId
      })
    });
  }

  async getUserDocuments() {
    return await this.request('/documents');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_info');
    window.location.reload();
  }
}

const apiClient = new APIClient();

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const isAPILoggedIn = !!localStorage.getItem('session_token');

  const routes = {
    home: `
      <div class="upload-area" id="upload-area">
        <h2>PDF Summarizer</h2>
        <p>Upload a PDF to get an AI-powered summary using a local LLM</p>
        <button id="select-pdf">Select PDF</button>
        <input type="file" id="pdf-file-input" accept=".pdf" style="display: none;">
      </div>
      <div class="how-it-works">
        <div class="step">
          <img src="assets/images/upload-logo.png" alt="Upload Your PDF">
          <h3>Upload Your PDF</h3>
          <p>Select and upload any PDF document you want to summarize.</p>
        </div>
        <div class="step">
          <img src="assets/images/proces-logo.png" alt="Process with AI">
          <h3>Process with AI</h3>
          <p>Our local AI model will analyze your document and extract the key information.</p>
        </div>
        <div class="step">
          <img src="assets/images/review-logo.png" alt="Review Summary">
          <h3>Review Summary</h3>
          <p>Get a concise summary of your document and save it for future reference.</p>
        </div>
      </div>
    `,
    viewer: `
      <div class="document-viewer">
        <div class="viewer-header">
          <button class="back-button" onclick="navigateTo('home')">
            <i data-lucide="arrow-left"></i> Back to Documents
          </button>
          <h2 id="document-title">Document Viewer</h2>
        </div>
        <div class="viewer-container">
          <div class="pdf-pane">
            <div class="pdf-controls">
              <button id="zoom-out"><i data-lucide="zoom-out"></i></button>
              <span id="zoom-level">100%</span>
              <button id="zoom-in"><i data-lucide="zoom-in"></i></button>
              <div class="page-controls">
                <span id="page-info">1 / 1</span>
              </div>
            </div>
            <div class="pdf-viewer" id="pdf-viewer">
              <div class="pdf-loading">
                <i data-lucide="loader"></i>
                <p>Loading PDF...</p>
              </div>
            </div>
          </div>
          <div class="interaction-pane">
            <div class="pane-tabs">
              <button class="pane-tab active" data-tab="summary">Summary</button>
              <button class="pane-tab" data-tab="chat">Chat with AI</button>
            </div>
            <div class="tab-content">
              <div id="summary-tab" class="tab-panel active">
                <div class="summary-content">
                  <h3>Document Summary</h3>
                  <div id="document-summary">
                    <div class="skeleton-loader">
                      <div class="skeleton-line"></div>
                      <div class="skeleton-line"></div>
                      <div class="skeleton-line short"></div>
                      <div class="skeleton-line"></div>
                      <div class="skeleton-line short"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="chat-tab" class="tab-panel">
                <div class="chat-container">
                  <div class="chat-messages" id="chat-messages">
                    <div class="chat-message ai-message">
                      <div class="message-content">
                        <p>Hello! I've analyzed your document. What would you like to know about it?</p>
                      </div>
                    </div>
                  </div>
                  <div class="chat-input-container">
                    <input type="text" id="chat-input" placeholder="Ask a question about the document..." />
                    <button id="send-message"><i data-lucide="send"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    history: `
      <div class="upload-area">
        <h2>Document History</h2>
        <p>View your uploaded documents and summaries.</p>
        <div id="documents-list">Loading...</div>
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

  function navigateTo(route, documentId = null) {
    const app = document.getElementById('app');
    app.innerHTML = routes[route] || routes.home;
    lucide.createIcons();
    
    if (route === 'home') {
      setupFileUpload();
    } else if (route === 'history') {
      loadUserDocuments();
    } else if (route === 'viewer') {
      // For viewer, always setup regardless of documentId
      setupDocumentViewer(documentId);
    }
  }

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

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm.querySelector('input[name="email"]').value;
    const password = signupForm.querySelector('input[name="password"]').value;
    const confirmPassword = signupForm.querySelector('input[name="confirm_password"]').value;
    const fullName = signupForm.querySelector('input[name="full_name"]').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = 'Creating Account...';
      submitBtn.disabled = true;

      await apiClient.register(fullName, password, email);
      alert('Account created successfully! Please login.');
      closeAuthModal();
      
    } catch (error) {
      console.error('Signup error:', error);
      alert(`Signup failed: ${error.message}`);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = 'Logging in...';
      submitBtn.disabled = true;

      await apiClient.login(email, password);
      
      closeAuthModal();
      window.location.reload();
      
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error.message}`);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function setupFileUpload() {
    const selectButton = document.getElementById('select-pdf');
    const fileInput = document.getElementById('pdf-file-input');
    const uploadArea = document.getElementById('upload-area');

    if (!selectButton || !fileInput) return;

    selectButton.addEventListener('click', () => {
      if (!apiClient.token) {
        alert('Please login first to upload documents.');
        openAuthModal('login');
        return;
      }
      fileInput.click();
    });

    fileInput.addEventListener('change', handleFileUpload);

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      if (!apiClient.token) {
        alert('Please login first to upload documents.');
        openAuthModal('login');
        return;
      }

      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'application/pdf') {
        handleFileUpload({ target: { files } });
      } else {
        alert('Please drop a PDF file.');
      }
    });
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please select a PDF file.');
      return;
    }

    const selectButton = document.getElementById('select-pdf');
    const originalText = selectButton.textContent;
    
    try {
      selectButton.textContent = 'Uploading...';
      selectButton.disabled = true;

      const fileUrl = URL.createObjectURL(file);
      sessionStorage.setItem('currentDocumentFile', fileUrl);
      sessionStorage.setItem('currentDocumentName', file.name);
      sessionStorage.setItem('currentDocumentSummary', ''); 
      sessionStorage.setItem('currentDocumentId', ''); 
      
      navigateTo('viewer');
      
      const result = await apiClient.uploadDocument(file);
      
      sessionStorage.setItem('currentDocumentId', result.document_id);
      sessionStorage.setItem('currentDocumentSummary', result.summary || 'No summary available');
      
      const summaryElement = document.getElementById('document-summary');
      if (summaryElement && result.summary) {
        summaryElement.innerHTML = `<p>${result.summary}</p>`;
      }
      
      setTimeout(() => {
        setupChat(result.document_id);
      }, 100);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      navigateTo('home');
    }
  }

  function setupDocumentViewer(documentId = null) {
    const documentTitle = document.getElementById('document-title');
    const documentSummary = document.getElementById('document-summary');
    
    const documentName = sessionStorage.getItem('currentDocumentName') || 'Unknown Document';
    if (documentTitle) {
      documentTitle.textContent = documentName;
    }
    
    const summary = sessionStorage.getItem('currentDocumentSummary');
    if (documentSummary) {
      if (summary && summary.trim()) {
        documentSummary.innerHTML = `<p>${summary}</p>`;
      } else {
        documentSummary.innerHTML = `
          <div class="skeleton-loader">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        `;
      }
    }
    
    setupPDFViewer();
    
    setupPaneTabs();
    
    const chatDocumentId = documentId || sessionStorage.getItem('currentDocumentId');
    
    setTimeout(() => {
      setupChat(chatDocumentId);
    }, 50);
  }

  function setupPDFViewer() {
    const fileUrl = sessionStorage.getItem('currentDocumentFile');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    if (!pdfViewer) {
      console.error('PDF viewer element not found');
      return;
    }
    
    if (!fileUrl) {
      pdfViewer.innerHTML = '<div class="pdf-error"><i data-lucide="alert-circle"></i><p>PDF preview not available</p></div>';
      lucide.createIcons();
      return;
    }

    if (typeof pdfjsLib === 'undefined') {
      pdfViewer.innerHTML = '<div class="pdf-error"><i data-lucide="alert-circle"></i><p>PDF.js library not loaded</p></div>';
      lucide.createIcons();
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const zoomLevelElement = document.getElementById('zoom-level');
    const pageInfoElement = document.getElementById('page-info');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');

    let pdfDoc = null;
    let totalPages = 0;
    let scale = 1.0;
    let currentVisiblePage = 1;

    pdfViewer.innerHTML = '<div class="pdf-loading"><i data-lucide="loader"></i><p>Loading PDF...</p></div>';
    lucide.createIcons();

    pdfjsLib.getDocument(fileUrl).promise.then(function(pdf) {
      pdfDoc = pdf;
      totalPages = pdf.numPages;
      updatePageInfo();
      renderAllPages();
    }).catch(function(error) {
      console.error('Error loading PDF:', error);
      pdfViewer.innerHTML = '<div class="pdf-error"><i data-lucide="alert-circle"></i><p>Error loading PDF file. Please try uploading again.</p></div>';
      lucide.createIcons();
    });

    async function renderAllPages() {
      if (!pdfDoc) return;

      pdfViewer.innerHTML = '';
      const pagesContainer = document.createElement('div');
      pagesContainer.className = 'pdf-pages-container';
      pdfViewer.appendChild(pagesContainer);

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        await renderPage(pageNum, pagesContainer);
      }

      setupScrollObserver();
      updateZoomLevel();
    }

    async function renderPage(pageNum, container) {
      try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: scale });
        
        const pageContainer = document.createElement('div');
        pageContainer.className = 'pdf-page-container';
        pageContainer.setAttribute('data-page', pageNum);
        
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        const ctx = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const pageLabel = document.createElement('div');
        pageLabel.className = 'pdf-page-label';
        pageLabel.textContent = `Page ${pageNum}`;
        
        pageContainer.appendChild(canvas);
        pageContainer.appendChild(pageLabel);
        container.appendChild(pageContainer);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error(`Error rendering page ${pageNum}:`, error);
      }
    }

    function setupScrollObserver() {
      const pages = document.querySelectorAll('.pdf-page-container');
      if (pages.length === 0) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const pageNum = parseInt(entry.target.getAttribute('data-page'));
            if (pageNum !== currentVisiblePage) {
              currentVisiblePage = pageNum;
              updatePageInfo();
            }
          }
        });
      }, {
        root: pdfViewer,
        threshold: 0.5
      });

      pages.forEach(page => observer.observe(page));
    }

    function updatePageInfo() {
      if (pageInfoElement) {
        pageInfoElement.textContent = `${currentVisiblePage} / ${totalPages}`;
      }
    }

    function updateZoomLevel() {
      if (zoomLevelElement) {
        zoomLevelElement.textContent = `${Math.round(scale * 100)}%`;
      }
      if (zoomInBtn) zoomInBtn.disabled = scale >= 3.0;
      if (zoomOutBtn) zoomOutBtn.disabled = scale <= 0.5;
    }

    // Event listeners for zoom
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function() {
        if (scale < 3.0) {
          scale += 0.25;
          renderAllPages();
        }
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function() {
        if (scale > 0.5) {
          scale -= 0.25;
          renderAllPages();
        }
      });
    }
  }

  function setupPaneTabs() {
    const tabs = document.querySelectorAll('.pane-tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        panels.forEach(panel => {
          panel.classList.remove('active');
          if (panel.id === `${targetTab}-tab`) {
            panel.classList.add('active');
          }
        });
      });
    });
  }

  function setupChat(documentId) {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !sendButton || !chatMessages) {
      console.error('Chat elements not found');
      return;
    }
    
    if (!documentId || documentId === '') {
      chatInput.disabled = true;
      sendButton.disabled = true;
      chatInput.placeholder = 'Processing document...';
      return;
    }
    
    chatInput.disabled = false;
    chatInput.placeholder = 'Ask a question about the document...';
    sendButton.disabled = false;
    
    const newChatInput = chatInput.cloneNode(true);
    const newSendButton = sendButton.cloneNode(true);
    
    chatInput.parentNode.replaceChild(newChatInput, chatInput);
    sendButton.parentNode.replaceChild(newSendButton, sendButton);
    
    newChatInput.id = 'chat-input';
    newSendButton.id = 'send-message';
    
    async function sendMessage() {
      const question = newChatInput.value.trim();
      if (!question || !documentId) return;
      
      newChatInput.disabled = true;
      newSendButton.disabled = true;
      
      addChatMessage(question, 'user');
      newChatInput.value = '';
      

      const loadingMsg = addChatMessage('', 'ai', true);
      
      try {
        const response = await apiClient.queryDocument(question, 'hybrid', documentId);
        
        if (loadingMsg) {
          loadingMsg.remove();
        }
        addChatMessage(response.answer, 'ai');
        
      } catch (error) {
        if (loadingMsg) {
          loadingMsg.remove();
        }
        addChatMessage('Sorry, I encountered an error. Please try again.', 'ai');
        console.error('Chat error:', error);
      } finally {
        newChatInput.disabled = false;
        newSendButton.disabled = false;
        newChatInput.focus();
      }
    }
    
    newSendButton.addEventListener('click', sendMessage);
    newChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    lucide.createIcons();
  }

  function addChatMessage(content, sender, isLoading = false) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return null;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message ${isLoading ? 'loading' : ''}`;
    
    if (isLoading) {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="skeleton-loader chat-skeleton">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${content}</p>
        </div>
      `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageDiv;
  }

  if (!window.location.search.includes('loggedin')) {
    navigateTo('home');
  }
});
