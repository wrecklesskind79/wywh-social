document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // Mobile Navigation Menu Toggle & Accessibility
  // -------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinksList = document.querySelectorAll('.nav-links .nav-link, .nav-links .nav-cta');

  if (menuToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    const closeMenu = () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link or CTA button is clicked
    navLinksList.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when Escape key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // -------------------------------------------------------------
  // Smooth Scrolling with Header Offset
  // -------------------------------------------------------------
  const header = document.getElementById('site-header');
  const headerHeight = header ? header.offsetHeight : 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // -------------------------------------------------------------
  // Navigation Active State Highlight on Scroll
  // -------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const options = {
    root: null,
    rootMargin: `-${headerHeight}px 0px -40% 0px`, // Adjust active area based on header size
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // -------------------------------------------------------------
  // Case Study "Ask about this project" pre-filling
  // -------------------------------------------------------------
  const caseLinks = document.querySelectorAll('.case-view-link');
  caseLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const caseCard = this.closest('.case-card');
      if (caseCard) {
        const caseTitle = caseCard.querySelector('h3').textContent.trim();
        const challengeTextarea = document.getElementById('lead-challenge');
        const serviceSelect = document.getElementById('lead-service');
        if (challengeTextarea) {
          challengeTextarea.value = `Hi Ashley, I'd like to ask you about your work on: "${caseTitle}". Could you share more details about the timeline and budget for a project like this?`;
        }
        if (serviceSelect) {
          serviceSelect.value = 'custom';
        }
      }
    });
  });

  // -------------------------------------------------------------
  // Lead Form Submission
  // -------------------------------------------------------------
  const leadForm = document.getElementById('lead-form');
  const leadSuccess = document.getElementById('lead-success');

  if (leadForm && leadSuccess) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('lead-name').value.trim();
      const email = document.getElementById('lead-email').value.trim();
      const company = document.getElementById('lead-company').value.trim();
      const challenge = document.getElementById('lead-challenge').value.trim();

      if (!name || !email || !company || !challenge) {
        alert('Please fill out all required fields.');
        return;
      }

      // Hide the form and show success message
      leadForm.style.transition = 'opacity 0.3s ease';
      leadForm.style.opacity = '0';
      setTimeout(() => {
        leadForm.style.display = 'none';
        leadSuccess.style.display = 'block';
        leadSuccess.style.opacity = '0';
        setTimeout(() => {
          leadSuccess.style.transition = 'opacity 0.5s ease';
          leadSuccess.style.opacity = '1';
        }, 50);
      }, 300);
    });
  }
});
