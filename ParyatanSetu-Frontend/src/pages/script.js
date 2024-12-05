document.addEventListener('DOMContentLoaded', () => {
    const primaryNavbar = document.querySelector('.primary-navbar');
    const secondaryNavbar = document.querySelector('.secondary-navbar');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const menuButton = document.querySelector('.menu-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const mainBanner = document.querySelector('.main-banner');
    const mainTagline = document.getElementById('main-tagline');
    const text = mainTagline.innerText;
    mainTagline.innerText = '';
    let i = 0;
    const typingSpeed = 50; // Increased speed (lower number = faster)
    const eraseSpeed = 25; // Speed of erasing (lower number = faster)
    const pauseDuration = 1000; // Pause duration after typing and before erasing

    function typeWriter() {
        if (i < text.length) {
            mainTagline.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(eraseText, pauseDuration);
        }
    }

    function eraseText() {
        if (i > 0) {
            mainTagline.innerHTML = text.substring(0, i-1);
            i--;
            setTimeout(eraseText, eraseSpeed);
        } else {
            setTimeout(typeWriter, pauseDuration);
        }
    }

    typeWriter();


    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            primaryNavbar.style.transform = 'translateY(-100%)';
            secondaryNavbar.style.transform = 'translateY(-100%)';
        } else {
            primaryNavbar.style.transform = 'translateY(0)';
            secondaryNavbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        // Parallax effect for tagline
        // mainTagline.style.transform = `translate(-50%,${-50 + scrollTop * 0.5}px)`;
    });

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value.trim() !== '') {
            alert(`Searching for: ${searchInput.value}`);
            searchInput.value = '';
        }
    });

    menuButton.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // Add a subtle animation to the logo on page load
    const logoContainer = document.querySelector('.logo-container');
    logoContainer.style.opacity = '0';
    logoContainer.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        logoContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        logoContainer.style.opacity = '1';
        logoContainer.style.transform = 'translateY(0)';
    }, 100);

    // Add hover effect for dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-menu li');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Add hover effect for travel options
    const travelOptions = document.querySelectorAll('.travel-option');
    travelOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateY(-2px)';
        });
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to banner images
    const bannerImages = document.querySelectorAll('.banner-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        bannerImages.forEach((image, index) => {
            image.style.transform = `translateY(${scrolled * 0.1 * (index + 1)}px)`;
        });
    });
    // Features slider functionality

    function createSlider(sliderClass, prevArrowClass, nextArrowClass) {
        const slider = document.querySelector(sliderClass);
        const prevArrow = document.querySelector(prevArrowClass);
        const nextArrow = document.querySelector(nextArrowClass);
        let cards = slider.querySelectorAll('.card');
        
        let cardWidth = cards[0].offsetWidth + 32; // Including gap
        
        function updateSliderPosition(smooth = true) {
            if (smooth) {
                slider.style.transition = 'transform 0.5s ease';
            } else {
                slider.style.transition = 'none';
            }
            slider.style.transform = `translateX(-${cardWidth}px)`;
        }
        
        function moveToNextCard() {
            updateSliderPosition();
            
            setTimeout(() => {
                slider.style.transition = 'none';
                const firstCard = slider.querySelector('.card');
                slider.appendChild(firstCard.cloneNode(true));
                slider.removeChild(firstCard);
                slider.style.transform = 'translateX(0)';
            }, 500);
        }
        
        function moveToPrevCard() {
            const lastCard = slider.querySelector('.card:last-child');
            const firstCard = slider.querySelector('.card:first-child');
            slider.style.transition = 'none';
            slider.insertBefore(lastCard.cloneNode(true), firstCard);
            slider.removeChild(lastCard);
            slider.style.transform = `translateX(-${cardWidth}px)`;
            
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease';
                slider.style.transform = 'translateX(0)';
            }, 20);
        }
        
        nextArrow.addEventListener('click', moveToNextCard);
        prevArrow.addEventListener('click', moveToPrevCard);
        
        function startAutoSlide() {
            return setInterval(moveToNextCard, 5000); // Change slide every 5 seconds
        }
        
        let autoSlideInterval = startAutoSlide();
        
        // Update slider on window resize
        window.addEventListener('resize', () => {
            cardWidth = slider.querySelector('.card').offsetWidth + 32;
            updateSliderPosition(false);
        });

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                moveToNextCard();
            } else if (touchEndX - touchStartX > 50) {
                moveToPrevCard();
            }
        }
    }

    // Create sliders for each section
    createSlider('.features-slider', '.features-section .prev-arrow', '.features-section .next-arrow');
    createSlider('.government-schemes-slider', '.government-schemes-section .prev-arrow', '.government-schemes-section .next-arrow');
    createSlider('.local-services-slider', '.local-services-section .prev-arrow', '.local-services-section .next-arrow');

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked item
            item.classList.toggle('active');

            // Animate the icon rotation
            const icon = question.querySelector('.faq-icon');
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.section-title, .faq-item, .contact-form, .contact-info');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    // User menu functionality
    const userMenuButton = document.querySelector('.user-menu-button');
    const userDropdown = document.querySelector('.user-dropdown');
    const userIcon = userMenuButton.querySelector('.user-icon');
    const userInitial = userMenuButton.querySelector('.user-initial');
    const userProfilePic = userMenuButton.querySelector('.user-profile-pic');
    const logoutButton = document.querySelector('.logout-button');
    const userStatus = document.getElementById('user-status');

    let isLoggedIn = false;
    let userType = '';
    let userName = '';
    let userEmail = '';
    let userProfilePicUrl = '';

    function updateUserMenuDisplay() {
        if (isLoggedIn) {
            userIcon.classList.add('hidden');
            if (userProfilePicUrl) {
                userProfilePic.src = userProfilePicUrl;
                userProfilePic.classList.remove('hidden');
                userInitial.classList.add('hidden');
            } else {
                userInitial.textContent = userName.charAt(0).toUpperCase();
                userInitial.classList.remove('hidden');
                userProfilePic.classList.add('hidden');
            }
            userStatus.textContent = `You are logged in as a ${userType} with username: ${userName}`;
        } else {
            userIcon.classList.remove('hidden');
            userInitial.classList.add('hidden');
            userProfilePic.classList.add('hidden');
            userStatus.textContent = 'Please log in to access all features.';
        }
    }

    userMenuButton.addEventListener('click', () => {
        if (isLoggedIn) {
            userDropdown.classList.toggle('hidden');
        } else {
            window.location.href = 'login.html';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    function checkLoginStatus() {
        const storedUserName = localStorage.getItem('userName');
        const storedUserEmail = localStorage.getItem('userEmail');
        const storedUserType = localStorage.getItem('userType');
        const storedProfilePic = localStorage.getItem('userProfilePic');

        if (storedUserName && storedUserEmail && storedUserType) {
            isLoggedIn = true;
            userName = storedUserName;
            userEmail = storedUserEmail;
            userType = storedUserType;
            userProfilePicUrl = storedProfilePic || '';
            updateUserMenuDisplay();
        }
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
        localStorage.removeItem('userProfilePic');
        isLoggedIn = false;
        userName = '';
        userEmail = '';
        userType = '';
        userProfilePicUrl = '';
        updateUserMenuDisplay();
        userDropdown.classList.add('hidden');
    });

    checkLoginStatus();

});