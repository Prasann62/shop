document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Hybrid Navbar (Hero Mode vs. Floating Pill)
  const nav = document.getElementById('mainNav') || document.querySelector('nav');
  const pill = document.getElementById('navbarPill') || nav.querySelector('div');
  let lastScrollY = window.scrollY;

  const handleNavScroll = () => {
    const currentScrollY = window.scrollY;

    // --- MODE SWITCHING ---
    if (currentScrollY < 50) {
      // HERO MODE (Top of page)
      if (nav.classList.contains('top-6')) {
        nav.classList.remove('top-6', '-translate-y-[150%]', 'opacity-0');
        nav.classList.add('top-0', 'px-0');

        // Morph Pill to Header
        pill.classList.remove('rounded-full', 'max-w-3xl', 'bg-primary/95', 'p-1.5', 'pl-6', 'pr-2', 'border', 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]');
        pill.classList.add('rounded-none', 'max-w-full', 'bg-primary/80', 'py-4', 'px-10', 'border-b', 'border-white/10');
      }
    } else {
      // PILL MODE (Scrolled)
      if (nav.classList.contains('top-0')) {
        nav.classList.remove('top-0', 'px-0');
        nav.classList.add('top-6', 'px-4');

        // Morph Header to Pill
        pill.classList.remove('rounded-none', 'max-w-full', 'bg-primary/80', 'py-4', 'px-10', 'border-b');
        pill.classList.add('rounded-full', 'max-w-3xl', 'bg-primary/95', 'p-1.5', 'pl-6', 'pr-2', 'border', 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]');
        pill.classList.add('border-white/10');
      }

      // --- VISIBILITY (Hide/Show) - Only in Pill Mode ---
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          // Down -> Hide
          nav.classList.add('-translate-y-[150%]', 'opacity-0');
        } else {
          // Up -> Show
          nav.classList.remove('-translate-y-[150%]', 'opacity-0');
        }
      }
    }

    lastScrollY = currentScrollY;
  };

  // Initial Check
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);


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
  // 7. WhatsApp Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const service = document.getElementById('contactService').value;
      const message = document.getElementById('contactMessage').value;

      const phoneNumber = "918608144068";
      const text = `*New Inquiry from Website*
Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}`;

      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      window.open(url, '_blank');
    });
  }
});
