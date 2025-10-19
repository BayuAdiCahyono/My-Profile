// ===================================
// PORTFOLIO - Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
  // ===================================
  // MOBILE MENU TOGGLE
  // ===================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
          mobileMenu.classList.toggle('hidden');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
          const isClickInsideMenu = mobileMenu.contains(event.target);
          const isClickOnButton = mobileMenuBtn.contains(event.target);
          
          if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
          }
      });
  }

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href !== '#' && href !== '') {
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
                  // Close mobile menu if open
                  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                      mobileMenu.classList.add('hidden');
                  }
              }
          }
      });
  });

  // ===================================
  // NAVBAR SCROLL EFFECT
  // ===================================
  const navbar = document.querySelector('nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow on scroll
      if (currentScroll > 50) {
          navbar.classList.add('shadow-lg');
      } else {
          navbar.classList.remove('shadow-lg');
          navbar.classList.add('shadow-sm');
      }
      
      lastScroll = currentScroll;
  });

  // ===================================
  // ACTIVE MENU HIGHLIGHT
  // ===================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('nav a');
  
  menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          link.classList.add('text-indigo-600', 'font-medium');
          link.classList.remove('text-gray-700');
      }
  });

  // ===================================
  // FORM VALIDATION (for Contact Page)
  // ===================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form fields
          const name = document.getElementById('name');
          const email = document.getElementById('email');
          const subject = document.getElementById('subject');
          const message = document.getElementById('message');
          
          let isValid = true;
          
          // Reset previous errors
          clearErrors();
          
          // Validate name
          if (name.value.trim() === '') {
              showError(name, 'Nama lengkap wajib diisi');
              isValid = false;
          }
          
          // Validate email
          if (email.value.trim() === '') {
              showError(email, 'Email wajib diisi');
              isValid = false;
          } else if (!isValidEmail(email.value.trim())) {
              showError(email, 'Format email tidak valid');
              isValid = false;
          }
          
          // Validate subject
          if (subject && subject.value === '') {
              showError(subject, 'Pilih subjek pesan');
              isValid = false;
          }
          
          // Validate message
          if (message.value.trim() === '') {
              showError(message, 'Pesan wajib diisi');
              isValid = false;
          } else if (message.value.trim().length < 10) {
              showError(message, 'Pesan minimal 10 karakter');
              isValid = false;
          }
          
          // Update character count if exists
          const charCount = document.getElementById('char-count');
          if (charCount && message) {
              charCount.textContent = `${message.value.length}/500 karakter`;
          }
          
          // If form is valid, show success message
          if (isValid) {
              showSuccessMessage();
              contactForm.reset();
              if (charCount) {
                  charCount.textContent = '0/500 karakter';
              }
          }
      });
      
      // Real-time character count for message textarea
      const messageField = document.getElementById('message');
      const charCount = document.getElementById('char-count');
      
      if (messageField && charCount) {
          messageField.addEventListener('input', function() {
              const length = this.value.length;
              charCount.textContent = `${length}/500 karakter`;
              
              // Change color if approaching limit
              if (length > 450) {
                  charCount.classList.add('text-red-500');
              } else {
                  charCount.classList.remove('text-red-500');
              }
          });
      }
  }

  // ===================================
  // PROJECT FILTER (for Projects Page)
  // ===================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
          button.addEventListener('click', function() {
              const filter = this.getAttribute('data-filter');
              
              // Update active button
              filterButtons.forEach(btn => {
                  btn.classList.remove('bg-white', 'text-indigo-600');
                  btn.classList.add('bg-purple-500/20', 'text-white');
              });
              this.classList.remove('bg-purple-500/20', 'text-white');
              this.classList.add('bg-white', 'text-indigo-600');
              
              // Filter projects
              projectCards.forEach(card => {
                  if (filter === 'all' || card.getAttribute('data-category') === filter) {
                      card.style.display = 'block';
                      setTimeout(() => {
                          card.style.opacity = '1';
                          card.style.transform = 'scale(1)';
                      }, 10);
                  } else {
                      card.style.opacity = '0';
                      card.style.transform = 'scale(0.9)';
                      setTimeout(() => {
                          card.style.display = 'none';
                      }, 300);
                  }
              });
          });
      });
  }

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  // Observe elements with .animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
  });

  // ===================================
  // BACK TO TOP BUTTON
  // ===================================
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
      window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) {
              backToTopBtn.classList.remove('hidden');
          } else {
              backToTopBtn.classList.add('hidden');
          }
      });
      
      backToTopBtn.addEventListener('click', function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // ===================================
  // COPY EMAIL TO CLIPBOARD
  // ===================================
  const emailButtons = document.querySelectorAll('.copy-email-btn');
  
  emailButtons.forEach(button => {
      button.addEventListener('click', function() {
          const email = this.getAttribute('data-email');
          
          // Create temporary input
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          
          // Show feedback
          const originalText = this.innerHTML;
          this.innerHTML = '✓ Email disalin!';
          this.classList.add('bg-green-500');
          
          setTimeout(() => {
              this.innerHTML = originalText;
              this.classList.remove('bg-green-500');
          }, 2000);
      });
  });

});

// ===================================
// HELPER FUNCTIONS
// ===================================

function showError(input, message) {
  const formGroup = input.parentElement;
  const error = document.createElement('p');
  error.className = 'text-red-500 text-sm mt-1 error-message';
  error.textContent = message;
  
  input.classList.add('border-red-500');
  formGroup.appendChild(error);
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => input.classList.remove('border-red-500'));
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showSuccessMessage() {
  // Create success notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in';
  notification.innerHTML = `
      <div class="flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="font-medium">Pesan berhasil dikirim!</span>
      </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
          notification.remove();
      }, 300);
  }, 3000);
}

// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', function() {
  const loader = document.getElementById('page-loader');
  if (loader) {
      setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
              loader.style.display = 'none';
          }, 300);
      }, 500);
  }
});