class Carousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.indicator = document.getElementById('navIndicator');
        this.cards = Array.from(document.querySelectorAll('.namecard'));
        this.dots = Array.from(document.querySelectorAll('.nav-dot'));
        this.currentIndex = 0;

        this.initDots();
        this.addEventListeners();
        this.updateCards();
        window.addEventListener('resize', () => this.updateCards());
    }

    initDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    addEventListeners() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const minSwipe = 50;
        if (startX - endX > minSwipe) {
            this.nextSlide();
        } else if (endX - startX > minSwipe) {
            this.prevSlide();
        }
    }

    updateCards() {
        // Update the classes for visual state
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev');
            if (index === this.currentIndex) {
                card.classList.add('active');
            } else if (index === this.currentIndex - 1) {
                card.classList.add('prev');
            }
        });

        // Update nav dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Center the active card:
        // 1. Get the viewport width.
        // 2. Compute the active card’s center (its offsetLeft plus half its width).
        // 3. Calculate the offset needed so that active card’s center lines up with viewport’s center.
        const viewport = document.querySelector('.carousel-viewport');
        const viewportCenter = viewport.offsetWidth / 2;
        const activeCard = this.cards[this.currentIndex];
        const cardLeft = activeCard.offsetLeft;
        const cardWidth = activeCard.offsetWidth;
        const cardCenter = cardLeft + cardWidth / 2;
        const offset = viewportCenter - cardCenter;

        this.track.style.transform = `translateX(${offset}px)`;
    }

    nextSlide() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCards();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCards();
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCards();
    }
}

const carousel = new Carousel();

// IntersectionObserver for social links
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.social-link').forEach((link) => {
    observer.observe(link);
});