<!-- src/App.svelte -->
<script>
  import Carousel from './Carousel.svelte';
  import SocialLinks from './SocialLinks.svelte';
</script>

<div class="gallery-container">
  <Carousel />
  <SocialLinks />
</div>

<style>
  .gallery-container {
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
                url('https://f2.toyhou.se/file/f2-toyhou-se/images/13827762_qT5gSwfAUJMF7vv.png?1579826943');
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>