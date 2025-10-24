/* ============================================
   VIRTUAL TOURS - MAUI MTB ADVENTURES
   Clean & Polished JavaScript
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScroll();
  initScrollEffects();
  initAnimations();
  initBookingForm();
  initScrollToTop();
  initImageLoading();
  initLeaderboard();
});

// === MOBILE MENU ===
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (!menuToggle || !navMenu) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  body.appendChild(overlay);

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    menuToggle.classList.toggle('active');
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    closeMenu();
  });

  // Close on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    menuToggle.classList.remove('active');
  }
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// === ANIMATIONS ===
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.tour-card, .service-card, .review-card, .faq-item'
  );
  
  animateElements.forEach(el => observer.observe(el));
}

// === BOOKING FORM ===
function initBookingForm() {
  const form = document.querySelector('.booking-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const formNote = this.querySelector('.form-note');
    const originalText = submitBtn.textContent;
    const originalNote = formNote.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = new FormData(this);
    const bookingData = {};
    for (let [key, value] of formData.entries()) {
      bookingData[key] = value;
    }
    
    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      // Success state
      submitBtn.textContent = 'Adventure Requested!';
      submitBtn.style.background = '#28a745';
      formNote.textContent = "Thank you! We'll contact you within 24 hours with your personalized adventure plan.";
      formNote.style.color = '#28a745';
      
      // Reset after delay
      setTimeout(() => {
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        formNote.textContent = originalNote;
        formNote.style.color = '';
      }, 3000);
    }, 1500);
  });
}

// === SCROLL TO TOP ===
function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// === IMAGE LOADING ===
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
  });
}

// === LEADERBOARD ===
function initLeaderboard() {
  const STORAGE_KEY = 'mmba_leaderboard_demo';
  
  // Demo routes
  const routes = [
    {
      id: 'haleakala-ridge',
      name: 'Haleakalā Ridge Line',
      link: 'https://www.komoot.com/tour/123456',
      image: 'https://images.unsplash.com/photo-1544966503-7cc0acf9f6c2?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'upcountry-flow',
      name: 'Upcountry Flow',
      link: 'https://www.strava.com/routes/987654',
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=60'
    },
    {
      id: 'pine-trails-enduro',
      name: 'Pine Trails Enduro',
      link: 'https://www.garmin.com/',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=60'
    }
  ];
  
  // Time helpers
  const toSeconds = (hhmmss) => {
    const parts = hhmmss.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return Number(parts[0]) || 0;
  };
  
  const toHHMMSS = (total) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = n => String(n).padStart(2, '0');
    return (h > 0 ? `${pad(h)}:` : '') + `${pad(m)}:${pad(s)}`;
  };
  
  // Storage
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { entries: [] };
    } catch {
      return { entries: [] };
    }
  };
  
  const save = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };
  
  // Demo data
  const ensureDemo = (state) => {
    if (state.entries && state.entries.length) return state;
    
    const demo = [
      { routeId: 'haleakala-ridge', rider: 'Kaleo M.', time: '00:42:30', date: '2025-06-10' },
      { routeId: 'haleakala-ridge', rider: 'Jared G.', time: '00:44:12', date: '2025-06-18' },
      { routeId: 'haleakala-ridge', rider: 'Malia K.', time: '00:47:05', date: '2025-06-22' },
      { routeId: 'upcountry-flow', rider: 'Noa L.', time: '00:36:48', date: '2025-05-27' },
      { routeId: 'upcountry-flow', rider: 'Keoni P.', time: '00:39:10', date: '2025-06-02' },
      { routeId: 'upcountry-flow', rider: 'Siena R.', time: '00:41:22', date: '2025-06-03' },
      { routeId: 'pine-trails-enduro', rider: 'Tane H.', time: '01:12:09', date: '2025-06-05' },
      { routeId: 'pine-trails-enduro', rider: 'Luca F.', time: '01:10:33', date: '2025-06-13' },
      { routeId: 'pine-trails-enduro', rider: 'Ava W.', time: '01:15:41', date: '2025-06-21' }
    ].map(e => ({
      id: crypto.randomUUID(),
      routeId: e.routeId,
      rider: e.rider,
      timeSeconds: toSeconds(e.time),
      date: e.date
    }));
    
    const newState = { entries: demo };
    save(newState);
    return newState;
  };
  
  // DOM elements
  const routeSelect = document.getElementById('lb-route-select');
  const tbody = document.getElementById('lb-tbody');
  const routeName = document.getElementById('lb-route-name');
  const routeImg = document.getElementById('lb-route-image');
  const routeLink = document.getElementById('lb-route-link');
  
  if (!routeSelect || !tbody) return;
  
  let state = ensureDemo(load());
  
  // Populate routes dropdown
  const populateRoutes = () => {
    routeSelect.innerHTML = routes
      .map(r => `<option value="${r.id}">${r.name}</option>`)
      .join('');
    updateRoutePreview(routeSelect.value);
  };
  
  // Update route preview
  const updateRoutePreview = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    if (!route) return;
    
    routeName.textContent = route.name;
    routeImg.src = route.image;
    routeImg.alt = route.name;
    routeLink.href = route.link;
  };
  
  // Filter entries by route
  const filteredEntries = (routeId) => {
    return state.entries
      .filter(e => e.routeId === routeId)
      .sort((a, b) => a.timeSeconds - b.timeSeconds);
  };
  
  // Render table
  const renderTable = () => {
    const entries = filteredEntries(routeSelect.value);
    
    if (entries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No times yet</td></tr>';
      return;
    }
    
    tbody.innerHTML = entries
      .map((e, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${e.rider}</td>
          <td>${toHHMMSS(e.timeSeconds)}</td>
          <td>${e.date || '-'}</td>
        </tr>
      `)
      .join('');
  };
  
  // Event listeners
  routeSelect.addEventListener('change', () => {
    updateRoutePreview(routeSelect.value);
    renderTable();
  });
  
  // Initialize
  populateRoutes();
  renderTable();
}

// === UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Log for debugging (remove in production)
console.log('Virtual Tours - Site initialized successfully ✓');