document.addEventListener('DOMContentLoaded', function() {
  // Function to check if the device is a mobile device
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  }

  if (!isMobileDevice()) {
    // Cursor Animation
    document.addEventListener('mousemove', (e) => {
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorOutline.style.left = `${e.clientX}px`;
      cursorOutline.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('mouseover', () => {
        document.querySelector('.cursor-dot').classList.add('hover');
        document.querySelector('.cursor-outline').classList.add('hover');
      });

      element.addEventListener('mouseout', () => {
        document.querySelector('.cursor-dot').classList.remove('hover');
        document.querySelector('.cursor-outline').classList.remove('hover');
      });
    });
  }

  // Navigation Bar Scroll Effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Status for Navigation Links
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-item a');

  const options = {
    threshold: 0.5 // Adjust the threshold as needed
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Ensure the correct nav link is active on page load
  const setActiveLinkOnLoad = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  // Call the function on page load
  setActiveLinkOnLoad();

  // Smooth Scroll for Navigation Links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      // Immediately update active status
      navLinks.forEach(nav => nav.classList.remove('active'));
      link.classList.add('active');

      // Smooth scroll to the section
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });

      // Optionally, reapply the active class after scrolling
      setTimeout(() => {
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
      }, 500); // Adjust the delay as necessary to match the scroll duration
    });
  });

  // Reapply active link state on scroll
  window.addEventListener('scroll', setActiveLinkOnLoad);

  // Scroll to #about section on click
  document.querySelector('.container_mouse').addEventListener('click', function() {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
