document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. MOBILE MENU TOGGLE --- */
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinksContainer) {
    // Toggle Menu
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');

      // Toggle hamburger animation state if you wanted (optional)
      // e.g., menuToggle.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
      });
    });
  }


  /* --- 2. DEBOUNCED SCROLL SPY --- */
  const sections = document.querySelectorAll('section');

  function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const handleScroll = () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Adjustment for sticky header (approx 100px)
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', debounce(handleScroll, 50));


  /* --- 3. TOAST NOTIFICATION --- */
  const toast = document.getElementById('toast');

  function showToast(message) {
    if (!toast) return;

    // Update message if passed
    if (message) toast.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }


  /* --- 4. FORM VALIDATION & SUBMIT --- */
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', (e) => {
      // Get Values
      const name = form.querySelector('input[name="name"]')?.value.trim();
      const email = form.querySelector('input[name="email"]')?.value.trim();
      const message = form.querySelector('textarea[name="message"]')?.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;
      let errorMessage = '';

      if (!name) {
        errorMessage = 'Please enter your full name.';
        valid = false;
      } else if (!email || !emailPattern.test(email)) {
        errorMessage = 'Please enter a valid email address.';
        valid = false;
      } else if (!message) {
        errorMessage = 'Please enter a message.';
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
        alert(errorMessage);
      }
      // If valid, allow standard submission to Netlify
    });
  }


  /* --- 5. LIGHTBOX FUNCTIONALITY --- */
  const lightbox = document.getElementById("myLightbox");
  const lightboxImg = document.getElementById("img01");
  const closeBtn = document.querySelector(".close-lightbox");

  if (lightbox && lightboxImg && closeBtn) {
    // Open
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', (e) => {
        lightbox.style.display = "block";
        lightboxImg.src = e.target.src;
        // Add alt text to lightbox image for accessibility
        lightboxImg.alt = e.target.alt;
      });
    });

    // Close functions
    const closeLightbox = () => {
      lightbox.style.display = "none";
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox();
      }
    });
  }

});
