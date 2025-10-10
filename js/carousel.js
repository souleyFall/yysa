// Mission Carousels Functionality
class MissionCarousel {
    constructor(carousel) {
        this.carousel = carousel;
        this.slides = carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = carousel.querySelector('.carousel-prev');
        this.nextBtn = carousel.querySelector('.carousel-next');
        this.indicators = carousel.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isPlaying = true;
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) {
            console.log('No slides found in carousel');
            return;
        }
        
        console.log(`Initializing carousel with ${this.totalSlides} slides`);
        this.showSlide(0);
        this.bindEvents();
        this.startAutoPlay();
    }
    
    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        // Remove active class from all indicators
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.showSlide(this.currentSlide);
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    bindEvents() {
        // Navigation buttons
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                this.nextSlide();
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            });
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Prev button clicked');
                this.prevSlide();
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Indicator ${index} clicked`);
                this.goToSlide(index);
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            });
        });
        
        // Hover events
        this.carousel.addEventListener('mouseenter', () => {
            this.isPlaying = false;
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.isPlaying = true;
        });
        
        // Touch events
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.isPlaying = false;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            }
            this.isPlaying = true;
        });
        
        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.stopAutoPlay();
                setTimeout(() => this.startAutoPlay(), 2000);
            }
        });
        
        // Make carousel focusable
        this.carousel.setAttribute('tabindex', '0');
    }
}

function initMissionCarousels() {
    const carousels = document.querySelectorAll('.mission-carousel');
    console.log('Found carousels:', carousels.length);
    
    carousels.forEach((carousel, index) => {
        console.log(`Initializing carousel ${index + 1}`);
        new MissionCarousel(carousel);
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousels...');
    initMissionCarousels();
});

// Re-initialize carousels if content is dynamically loaded
window.addEventListener('load', function() {
    console.log('Window loaded, re-initializing carousels...');
    setTimeout(initMissionCarousels, 100);
});

// Also try to initialize after a short delay to ensure all content is loaded
setTimeout(function() {
    console.log('Delayed initialization of carousels...');
    initMissionCarousels();
}, 500);

// Test function to manually test carousels
window.testCarousels = function() {
    console.log('Testing carousels manually...');
    const carousels = document.querySelectorAll('.mission-carousel');
    console.log('Found carousels:', carousels.length);
    
    carousels.forEach((carousel, index) => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.indicator');
        
        console.log(`Carousel ${index + 1}:`);
        console.log(`- Slides: ${slides.length}`);
        console.log(`- Prev button: ${!!prevBtn}`);
        console.log(`- Next button: ${!!nextBtn}`);
        console.log(`- Indicators: ${indicators.length}`);
        
        // Test clicking next button
        if (nextBtn) {
            console.log('Testing next button...');
            nextBtn.click();
        }
    });
};
