const hero = document.getElementById("heroSection");
let images = Array.from(hero.children);
let currentIndex = 2; // Start at the center image (index 2)

function arrangeImages(centerIndex) {
  const total = images.length;
  const newOrder = [];
  for (let i = centerIndex - 2; i <= centerIndex + 2; i++) {
    const index = (i + total) % total;
    newOrder.push(images[index]);
  }
  images.forEach((img) => (img.className = ""));
  newOrder[0].classList.add("left2");
  newOrder[1].classList.add("left1");
  newOrder[2].classList.add("center");
  newOrder[3].classList.add("right1");
  newOrder[4].classList.add("right2");
}

// Automatically change images every 5 seconds
setInterval(function () {
  currentIndex = (currentIndex + 1) % images.length;
  arrangeImages(currentIndex);
},3000);

// Initial arrangement of images
arrangeImages(currentIndex);

// Navigation link active state
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // Remove active class from all links
    navLinks.forEach((l) => l.classList.remove("active"));
    // Add active class to clicked link
    this.classList.add("active");
  });
});

function openPopup() {
    document.getElementById("login-popup").style.display = "flex";
  }
  
  function closePopup() {
    document.getElementById("login-popup").style.display = "none";
  }
  
  // Close when clicking outside the popup-content
  function outsideClick(event) {
    if (event.target.id === "login-popup") {
      closePopup();
    }
  }
  
  function submitForm() {
    // Handle login logic here...
    closePopup();
  }

 // Function to show/hide sections based on category
 function filterSection(category) {
  // Hide all sections
  const allSections = document.querySelectorAll('.filter-section');
  allSections.forEach((section) => {
    section.classList.remove('active');
  });

  // Show the selected category
  const selectedSection = document.getElementById(category);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }
}

// Validation functions
const validators = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (value) => value.trim().length >= 10
};

// Debounce function to limit validation frequency
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

// Function to update field status
function updateFieldStatus(field, isValid) {
  const errorElement = document.getElementById(`${field.id}Error`);
  const validationIcon = field.parentElement.querySelector('.validation-icon');
  
  field.classList.remove('success', 'error');
  field.classList.add(isValid ? 'success' : 'error');
  
  if (validationIcon) {
      validationIcon.textContent = isValid ? '✓' : '✗';
      validationIcon.classList.remove('success', 'error');
      validationIcon.classList.add(isValid ? 'success' : 'error');
  }
  
  if (errorElement) {
      errorElement.style.display = isValid ? 'none' : 'block';
  }
}

// Progressive validation handler
const validateField = debounce((field) => {
  if (field.type === 'checkbox') return;
  
  const validator = validators[field.id];
  if (!validator) return;
  
  const isValid = validator(field.value);
  updateFieldStatus(field, isValid);
}, 300);

// Add validation listeners to form fields
document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(field => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('blur', () => validateField(field));
});

// Form submission handler
document.getElementById('gdprForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  let hasErrors = false;
  
  // Validate all fields
  Object.entries(validators).forEach(([fieldName, validator]) => {
      const field = document.getElementById(fieldName);
      const isValid = validator(field.value);
      updateFieldStatus(field, isValid);
      if (!isValid) hasErrors = true;
  });
  
  // Validate consent
  const consent = document.getElementById('dataConsent');
  if (!consent.checked) {
      document.getElementById('consentError').style.display = 'block';
      hasErrors = true;
  } else {
      document.getElementById('consentError').style.display = 'none';
  }
  
  if (!hasErrors) {
      // Collect form data
      const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value,
          dataConsent: consent.checked,
          marketing: document.getElementById('marketing').checked
      };
      
      // Here you would typically send the data to your server
      console.log('Form data:', formData);
      
      // Show success message
      document.getElementById('successMessage').style.display = 'block';
      
      // Reset form and validation states
      this.reset();
      document.querySelectorAll('.validation-icon').forEach(icon => {
          icon.classList.remove('success', 'error');
          icon.style.display = 'none';
      });
      document.querySelectorAll('input, textarea').forEach(field => {
          field.classList.remove('success', 'error');
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
          document.getElementById('successMessage').style.display = 'none';
      }, 5000);
  }
});

const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    });

  





