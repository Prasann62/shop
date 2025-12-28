document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll is handled by CSS usually, but we can add active state to nav
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // Check if href matches current section id
      if (link.getAttribute('href').includes(current)) {
        // You might want to add a specific style for .active in your CSS if you want to highlight the link
        // For now, we will add a slight border bottom or similar style via JS if CSS doesn't have it
        link.style.borderBottom = '2px solid #1a1a1a';
      } else {
        link.style.borderBottom = 'none';
      }
    });
  });

  // Form submission handler
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your request! We will contact you shortly.');
      form.reset();
    });
  }
  // Lightbox Functionality
  const lightbox = document.getElementById("myLightbox");
  const lightboxImg = document.getElementById("img01");
  const closeBtn = document.querySelector(".close-lightbox");

  if (lightbox && lightboxImg && closeBtn) {
    // Open Lightbox
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', (e) => {
        lightbox.style.display = "block";
        lightboxImg.src = e.target.src;
      });
    });

    // Close Lightbox (X button)
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = "none";
    });

    // Close Lightbox (Click outside image)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});
