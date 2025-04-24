// Loading state
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loading').classList.add('hidden');
    }, 500);
});

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Update meta theme-color
    const themeColor = theme === 'dark' ? '#121212' : '#f8f9fa';
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColor);
    } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = themeColor;
        document.head.appendChild(meta);
    }
}

// Check for saved preference or system preference
const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
setTheme(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Watch for system theme changes
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Enhanced smooth scrolling with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        try {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        } catch (error) {
            console.error('Scroll target not found:', error);
        }
    });
});

// Mobile menu functionality
const mobileNav = document.getElementById('mobileNav');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

function toggleMobileMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Lazy load images with Intersection Observer
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Scroll animations with Intersection Observer
const animateElements = document.querySelectorAll('.feature-card, .admin-card, .testimonial-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

animateElements.forEach(el => observer.observe(el));

// Add theme-color meta tag if not exists
if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#121212';
    document.head.appendChild(meta);
}

// Error handling for animations
window.addEventListener('error', function (e) {
    console.error('Error occurred:', e.error);
    // Fallback - show all elements if animations fail
    animateElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}, true);

// --- Language Cards ---
const languages = [
    { name: 'English', hello: 'Hello' },
    { name: 'Spanish', hello: 'Hola' },
    { name: 'French', hello: 'Bonjour' },
    { name: 'German', hello: 'Hallo' },
    { name: 'Mandarin', hello: '你好' },
    { name: 'Hindi', hello: 'नमस्ते' },
    { name: 'Arabic', hello: 'مرحبا' },
    { name: 'Portuguese', hello: 'Olá' },
    { name: 'Russian', hello: 'Привет' },
    { name: 'Japanese', hello: 'こんにちは' },
    { name: 'Swahili', hello: 'Habari' },
    { name: 'Korean', hello: '안녕하세요' },
    { name: 'Italian', hello: 'Ciao' },
    { name: 'Turkish', hello: 'Merhaba' },
    { name: 'Dutch', hello: 'Hallo' },
    { name: 'Hebrew', hello: 'שלום' },
    { name: 'Bengali', hello: 'হ্যালো' },
    { name: 'Polish', hello: 'Cześć' },
    { name: 'Ukrainian', hello: 'Привіт' },
    { name: 'Greek', hello: 'Γειά σου' },
    { name: 'Swedish', hello: 'Hej' },
    { name: 'Norwegian', hello: 'Hallo' },
    { name: 'Danish', hello: 'Hej' },
    { name: 'Finnish', hello: 'Hei' },
    { name: 'Vietnamese', hello: 'Xin chào' },
    { name: 'Thai', hello: 'สวัสดี' },
    { name: 'Indonesian', hello: 'Halo' },
    { name: 'Malay', hello: 'Helo' },
    { name: 'Filipino', hello: 'Kamusta' },
    { name: 'Romanian', hello: 'Bună' },
    { name: 'Hungarian', hello: 'Szia' },
    { name: 'Czech', hello: 'Ahoj' },
    { name: 'Slovak', hello: 'Ahoj' },
    { name: 'Bulgarian', hello: 'Здравей' },
    { name: 'Croatian', hello: 'Bok' },
    { name: 'Serbian', hello: 'Здраво' },
    { name: 'Slovenian', hello: 'Zdravo' },
    { name: 'Persian', hello: 'سلام' },
    { name: 'Urdu', hello: 'ہیلو' },
    { name: 'Punjabi', hello: 'ਹੈਲੋ' },
    { name: 'Tamil', hello: 'வணக்கம்' },
    { name: 'Telugu', hello: 'హలో' },
    { name: 'Gujarati', hello: 'હેલો' },
    { name: 'Kannada', hello: 'ನಮಸ್ಕಾರ' },
    { name: 'Malayalam', hello: 'ഹലോ' },
    { name: 'Icelandic', hello: 'Halló' },
    { name: 'Irish', hello: 'Dia dhuit' }
];

const languageGrid = document.querySelector('#languages .grid');

if (languageGrid) {
    languages.forEach(lang => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'language-card h-32 sm:h-36';
        cardContainer.setAttribute('tabindex', '0');
        cardContainer.setAttribute('role', 'button');
        cardContainer.setAttribute('aria-label', `Flip card for ${lang.name}`);

        const cardInner = document.createElement('div');
        cardInner.className = 'language-card-inner shadow-md rounded-lg';

        const cardFront = document.createElement('div');
        cardFront.className = 'language-card-front';
        cardFront.innerHTML = `<span class="font-semibold text-lg">${lang.name}</span>`;

        const cardBack = document.createElement('div');
        cardBack.className = 'language-card-back';
        const textSizeClass = (lang.hello.length > 10 || /[\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFF\uAC00-\uD7AF]/.test(lang.hello)) ? 'text-lg' : 'text-xl';
        cardBack.innerHTML = `<span class="font-semibold ${textSizeClass}">${lang.hello}</span>`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardContainer.appendChild(cardInner);
        languageGrid.appendChild(cardContainer);

        // Flip card on click
        const flipCard = () => {
            // Reset all other cards
            document.querySelectorAll('.language-card').forEach(card => {
                if (card !== cardContainer) {
                    card.classList.remove('flipped');
                }
            });
            // Flip the clicked card
            cardContainer.classList.toggle('flipped');
        };

        // Show information on hover
        const showInfo = () => {
            cardContainer.classList.add('hovered');
        };

        const hideInfo = () => {
            cardContainer.classList.remove('hovered');
        };

        cardContainer.addEventListener('click', flipCard);
        cardContainer.addEventListener('mouseenter', showInfo);
        cardContainer.addEventListener('mouseleave', hideInfo);
    });
}

const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (scrollLeftBtn && scrollRightBtn && languageGrid) {
    scrollLeftBtn.addEventListener('click', () => {
        languageGrid.scrollBy({ left: -200, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        languageGrid.scrollBy({ left: 200, behavior: 'smooth' });
    });
}