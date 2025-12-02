// Background color changer
const colorBtn = document.getElementById('colorBtn');
const colors = ['#f0f0f0', '#e8f4f8', '#fff3e0', '#f3e5f5', '#e0f2f1'];
let colorIndex = 0;

colorBtn.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
});

// Click counter
const incrementBtn = document.getElementById('incrementBtn');
const countDisplay = document.getElementById('count');
let count = 0;

incrementBtn.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
    
    // Add a little animation
    countDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        countDisplay.style.transform = 'scale(1)';
    }, 200);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    formMessage.textContent = `Thank you, ${name}! Your message has been received.`;
    formMessage.className = 'success';
    
    // Clear form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Add transition to count display
countDisplay.style.transition = 'transform 0.2s ease';
