<!-- src/Carousel.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte';

  // An array of image URLs for your namecards.
  const cardImages = [
    'https://f2.toyhou.se/file/f2-toyhou-se/images/19393728_2rFWEfdduqwwdka.jpg',
    'https://f2.toyhou.se/file/f2-toyhou-se/images/19393728_2rFWEfdduqwwdka.jpg',
    'https://f2.toyhou.se/file/f2-toyhou-se/images/19393728_2rFWEfdduqwwdka.jpg',
    'https://f2.toyhou.se/file/f2-toyhou-se/images/19393728_2rFWEfdduqwwdka.jpg'
  ];

  let currentIndex = 0;
  let carouselTrack;
  let cards = [];

  // Update the transform so that the active card is centered.
  function updateCards() {
    const viewport = document.querySelector('.carousel-viewport');
    if (!viewport || !cards.length) return;
    const viewportCenter = viewport.offsetWidth / 2;
    const activeCard = cards[currentIndex];
    const cardLeft = activeCard.offsetLeft;
    const cardWidth = activeCard.offsetWidth;
    const cardCenter = cardLeft + cardWidth / 2;
    const offset = viewportCenter - cardCenter;
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }

  function nextSlide() {
    if (currentIndex < cardImages.length - 1) {
      currentIndex += 1;
      updateCards();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCards();
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCards();
  }

  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    const minSwipe = 50;
    if (touchStartX - touchEndX > minSwipe) {
      nextSlide();
    } else if (touchEndX - touchStartX > minSwipe) {
      prevSlide();
    }
  }

  onMount(() => {
    // Query the rendered .namecard elements.
    cards = Array.from(carouselTrack.querySelectorAll('.namecard'));
    updateCards();
    window.addEventListener('resize', updateCards);
  });

  onDestroy(() => {
    window.removeEventListener('resize', updateCards);
  });
</script>

<div class="carousel-viewport">
  <div
    bind:this={carouselTrack}
    class="carousel-track"
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}>
    {#each cardImages as image, index}
      <div class="namecard {index === currentIndex ? 'active' : (index === currentIndex - 1 ? 'prev' : '')}">
        <img src={image} alt="Namecard" />
      </div>
    {/each}
  </div>
</div>

<div class="nav-indicator">
  {#each cardImages as _, index}
    <button
            class="nav-dot {index === currentIndex ? 'active' : ''}"
            on:click={() => goToSlide(index)}
            on:keydown={(e) => e.key === "Enter" || e.key === " " ? goToSlide(index) : null}
            aria-label={`Go to slide ${index + 1}`}>
    </button>
  {/each}
</div>

<style>
  .carousel-viewport {
    width: 100%;
    max-width: 800px;
    overflow: hidden;
    position: relative;
    perspective: 1500px;
    margin: 2rem auto;
  }
  .carousel-track {
    display: flex;
    gap: 40px;
    transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    transform-style: preserve-3d;
    touch-action: pan-y;
  }
  .namecard {
    width: 420px;
    height: 700px;
    flex-shrink: 0;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 40px 40px 80px rgba(0,0,0,0.3);
    transform: rotateY(25deg) scale(0.85);
    opacity: 0.6;
    transition: all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
    position: relative;
    backface-visibility: hidden;
  }
  .namecard.active {
    transform: rotateY(0deg) scale(1);
    opacity: 1;
    z-index: 2;
  }
  .namecard.prev {
    transform: rotateY(-25deg) scale(0.85);
  }
  .namecard img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nav-indicator {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
  }

  .nav-dot {
    all: unset;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .nav-dot.active {
    width: 40px;
    background: var(--sakura);
  }

  @media (max-width: 768px) {
    .namecard {
      width: 70vw;
      height: calc(70vw * 1.666);
      border-radius: 20px;
    }
  }
</style>