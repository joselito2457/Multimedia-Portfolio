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
      document.close();
    }
  }