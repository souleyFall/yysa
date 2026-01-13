// Simple Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAllCarousels();
});

function initializeAllCarousels() {
    const carousels = document.querySelectorAll('.mission-carousel');
    console.log('Found ' + carousels.length + ' carousels');
    
    carousels.forEach((carousel, index) => {
        setupCarousel(carousel, index);
    });
}

function setupCarousel(carouselContainer, carouselIndex) {
    const slides = carouselContainer.querySelectorAll('.carousel-slide');
    const prevBtn = carouselContainer.querySelector('.carousel-prev');
    const nextBtn = carouselContainer.querySelector('.carousel-next');
    const indicators = carouselContainer.querySelectorAll('.indicator');
    
    if (slides.length === 0) {
        console.log('Carousel ' + carouselIndex + ': No slides found');
        return;
    }
    
    console.log('Carousel ' + carouselIndex + ': ' + slides.length + ' slides, prev=' + (!!prevBtn) + ', next=' + (!!nextBtn));
    
    let currentSlide = 0;
    let autoPlayTimer = null;
    
    function showSlide(n) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Add active class to current slide and indicator
        slides[n].classList.add('active');
        if (indicators[n]) {
            indicators[n].classList.add('active');
        }
        
        currentSlide = n;
    }
    
    function nextSlide() {
        let n = (currentSlide + 1) % slides.length;
        showSlide(n);
    }
    
    function prevSlide() {
        let n = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(n);
    }
    
    function goToSlide(n) {
        if (n >= 0 && n < slides.length) {
            showSlide(n);
        }
    }
    
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }
    
    // Attach event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next clicked on carousel ' + carouselIndex);
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev clicked on carousel ' + carouselIndex);
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Indicator ' + index + ' clicked on carousel ' + carouselIndex);
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Initialize
    showSlide(0);
    startAutoPlay();
}
