document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('header');
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('shadow-xl', 'py-2');
      header.classList.remove('py-4');
    } else {
      header.classList.remove('shadow-xl', 'py-2');
      header.classList.add('py-4');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll);

  // 3. Mobile Menu Logic
  const menuBtn = document.getElementById('menuBtn');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && closeMenu && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent scroll
      setTimeout(() => {
        mobileMenu.classList.add('opacity-100');
      }, 10);
    });

    const hideMenu = () => {
      mobileMenu.classList.remove('opacity-100');
      document.body.style.overflow = ''; // Restore scroll
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    };

    closeMenu.addEventListener('click', hideMenu);
    mobileLinks.forEach(link => {
      link.addEventListener('click', hideMenu);
    });
  }

  // 4. Reveal on Scroll Animation
  const revealElements = document.querySelectorAll('section, .reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.9;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // 5. Smooth Scroll for all anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Testimonial Slider (Simple Fade)
  const testimonials = document.querySelectorAll('#testimonialSlider > div > div');
  let currentTestimonial = 0;

  if (testimonials.length > 1) {
    setInterval(() => {
      testimonials[currentTestimonial].classList.add('opacity-0');
      setTimeout(() => {
        testimonials[currentTestimonial].classList.add('hidden');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.remove('hidden');
        setTimeout(() => {
          testimonials[currentTestimonial].classList.remove('opacity-0');
        }, 50);
      }, 500);
    }, 6000);
  }
});
