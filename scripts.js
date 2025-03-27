document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize scroll animations
    initScrollAnimations();
    initParallaxScrolling();
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuButton.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      
      // Toggle between menu and close icons
      if (mobileNav.classList.contains('open')) {
        menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      } else {
        menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      }
    });
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
      });
    });
    
    // Scroll down button in hero section
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    // Explore button in hero section
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If projects section isn't on this page, go to projects page
          window.location.href = 'projects.html';
        }
      });
    }
    
    // Comment form handling
    const commentForm = document.getElementById('comment-form');
    const successMessage = document.getElementById('success-message');
    const sendAnotherBtn = document.getElementById('send-another-btn');
    
    if (commentForm) {
      commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate inputs
        let isValid = true;
        
        if (name.length < 2) {
          document.getElementById('name-error').classList.add('visible');
          isValid = false;
        } else {
          document.getElementById('name-error').classList.remove('visible');
        }
        
        if (!isValidEmail(email)) {
          document.getElementById('email-error').classList.add('visible');
          isValid = false;
        } else {
          document.getElementById('email-error').classList.remove('visible');
        }
        
        if (message.length < 10) {
          document.getElementById('message-error').classList.add('visible');
          isValid = false;
        } else {
          document.getElementById('message-error').classList.remove('visible');
        }
        
        if (isValid) {
          // Simulating form submission
          const submitBtn = commentForm.querySelector('button[type="submit"]');
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="btn-text">Sending...</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon animate-spin"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
          
          // Log submission data
          console.log("Sending comment to: joselitojamito10@gmail.com");
          console.log("Form values:", { name, email, message });
          
          // Simulate API call with delay
          setTimeout(function() {
            // Hide form and show success message
            commentForm.style.display = 'none';
            successMessage.classList.add('visible');
            
            // Show toast notification
            showToast('Comment sent successfully!', 'Your feedback has been received. Thank you!', 'success');
            
            // Reset form for future submissions
            commentForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-text">Send Comment</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
          }, 1500);
        }
      });
    }
    
    // Send another comment button
    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', function() {
        successMessage.classList.remove('visible');
        commentForm.style.display = 'grid';
      });
    }
    
    // Team member image upload
    const fileUpload = document.getElementById('file-upload');
    const uploadButtons = document.querySelectorAll('.upload-btn');
    
    if (fileUpload && uploadButtons.length > 0) {
      uploadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          const memberId = this.getAttribute('data-member-id');
          fileUpload.setAttribute('data-member-id', memberId);
          fileUpload.click();
        });
      });
      
      fileUpload.addEventListener('change', function(e) {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const memberId = this.getAttribute('data-member-id');
        
        // Check if the file is an image
        if (!file.type.match('image.*')) {
          showToast('Invalid file type', 'Please upload an image file', 'error');
          return;
        }
        
        // Simple file size validation (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          showToast('File too large', 'Image size should be less than 5MB', 'error');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
          if (event.target && event.target.result) {
            // Find the correct team member image by data-member-id
            const memberImages = document.querySelectorAll('.member-image');
            memberImages.forEach(img => {
              if (img.closest('.team-card').querySelector('.upload-btn').getAttribute('data-member-id') === memberId) {
                img.src = event.target.result;
                showToast('Profile photo updated', 'Team member photo has been updated successfully', 'success');
              }
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Toast notification function
  function showToast(title, message, type = 'default') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add event listener to close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  
  // Scroll animations
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    const staggerElements = document.querySelectorAll('.stagger-item');
    
    function checkScroll() {
      // Handle regular reveal animations
      revealElements.forEach((element, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          setTimeout(() => {
            element.classList.add('active');
          }, index * 100); // Small delay for each element
        }
      });
      
      // Handle staggered animations
      document.querySelectorAll('.competencies-grid').forEach(grid => {
        const windowHeight = window.innerHeight;
        const elementTop = grid.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          const children = grid.querySelectorAll('.stagger-item');
          
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('active');
            }, index * 100);
          });
        }
      });
    }
    
    window.addEventListener('scroll', checkScroll);
    // Initial check to reveal elements in viewport on page load
    setTimeout(checkScroll, 300);
  }
  
  // Parallax scrolling effect
  function initParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function handleScroll() {
      parallaxElements.forEach(element => {
        const distance = window.scrollY;
        const speed = element.getAttribute('data-speed') || '0.5';
        
        element.style.transform = `translateY(${distance * parseFloat(speed)}px)`;
      });
    }
    
    window.addEventListener('scroll', handleScroll);
  }
  
  // Create Team page and Projects page if user wants to navigate there
  function createPlaceholderPage(pageName) {
    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageName} - Multimedia Group</title>
    <meta name="description" content="Exploring the digital landscape through critical thinking, creative content, and technological innovation.">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <!-- Header -->
    <header class="header scrolled">
      <div class="container header-container">
        <a href="index.html" class="logo-link">
          <img src="lovable-uploads/c56024ae-1d1f-4592-a390-5957a194fdd1.png" alt="MG Logo" class="logo-img">
          <span class="logo-text">
            <span class="text-gradient">Multimedia</span> Group
          </span>
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <a href="index.html" class="nav-link">Home</a>
          <a href="team.html" class="nav-link ${pageName === 'Team' ? 'active' : ''}">Team</a>
          <a href="projects.html" class="nav-link ${pageName === 'Projects' ? 'active' : ''}">Projects</a>
        </nav>
        
        <!-- Mobile menu button -->
        <button class="mobile-menu-button" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
      
      <!-- Mobile Navigation -->
      <div class="mobile-nav">
        <a href="index.html" class="mobile-nav-link">Home</a>
        <a href="team.html" class="mobile-nav-link ${pageName === 'Team' ? 'active' : ''}">Team</a>
        <a href="projects.html" class="mobile-nav-link ${pageName === 'Projects' ? 'active' : ''}">Projects</a>
      </div>
    </header>
  
    <main style="padding-top: 120px; min-height: 80vh;">
      <div class="container">
        <div class="section-header">
          <h1 class="section-title">${pageName} <span class="text-gradient">Page</span></h1>
          <p class="section-description">This page is under construction. Please check back soon!</p>
        </div>
      </div>
    </main>
  
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="lovable-uploads/c56024ae-1d1f-4592-a390-5957a194fdd1.png" alt="MG Logo" class="footer-logo-img">
              <span class="footer-logo-text">
                <span class="text-gradient">Multimedia</span> Group
              </span>
            </div>
            <p class="footer-description">
              A portfolio website showcasing our Media and Information Literacy projects,
              reflecting our journey in understanding digital media's impact and importance.
            </p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Github">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
          
          <div class="footer-links">
            <h3 class="footer-heading">Quick Links</h3>
            <ul class="footer-nav">
              <li><a href="index.html" class="footer-nav-link">Home</a></li>
              <li><a href="team.html" class="footer-nav-link">Team</a></li>
              <li><a href="projects.html" class="footer-nav-link">Projects</a></li>
            </ul>
          </div>
          
          <div class="footer-links">
            <h3 class="footer-heading">About MIL</h3>
            <ul class="footer-nav">
              <li><a href="#" class="footer-nav-link">What is Media Literacy?</a></li>
              <li><a href="#" class="footer-nav-link">Information Ethics</a></li>
              <li><a href="#" class="footer-nav-link">Digital Citizenship</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">
            © <span id="current-year"></span> Multimedia Group. All rights reserved.
          </p>
        </div>
      </div>
      
      <div class="footer-bg"></div>
    </footer>
  
    <script>
      // Set current year
      document.getElementById('current-year').textContent = new Date().getFullYear();
      
      // Mobile menu toggle
      const menuButton = document.querySelector('.mobile-menu-button');
      const mobileNav = document.querySelector('.mobile-nav');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      
      menuButton.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        
        if (mobileNav.classList.contains('open')) {
          menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        } else {
          menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
        }
      });
      
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
        });
      });
    </script>
  </body>
  </html>
    `;
    
    return html;
  }
  
  // Generate Team and Projects page when links are clicked
  document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link') || e.target.matches('.mobile-nav-link') || e.target.matches('.footer-nav-link')) {
      const href = e.target.getAttribute('href');
      
      if (href === 'team.html') {
        localStorage.setItem('team-page', createPlaceholderPage('Team'));
      } else if (href === 'projects.html') {
        localStorage.setItem('projects-page', createPlaceholderPage('Projects'));
      }
    }
  });
  
  // Handle placeholder pages
  if (window.location.pathname.includes('team.html')) {
    const teamPage = localStorage.getItem('team-page');
    if (teamPage) {
      document.open();
      document.write(teamPage);
      document.close();
    }
  } else if (window.location.pathname.includes('projects.html')) {
    const projectsPage = localStorage.getItem('projects-page');
    if (projectsPage) {
      document.open();
      document.write(projectsPage);
      document.close();
    }
  }