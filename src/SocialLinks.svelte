<script>
  import { onMount } from 'svelte';

  const socialMedia = [
    { platform: "Twitter", url: "https://x.com/blumewmew", icon: "/icons/twitter.svg", username: "@blumemwew" },
    { platform: "Twitch", url: "https://www.twitch.tv/blumewmew", icon: "/icons/twitch.svg", username: "/blumemwew" },
    { platform: "YouTube", url: "https://www.youtube.com/@blumewmew", icon: "/icons/youtube.svg", username: "@blumemwew" },
    { platform: "Telegram", url: "https://t.me/blumewmew", icon: "/icons/telegram.svg", username: "@blumemwew" }
  ];

  // An array to track which items are visible.
  let visibleIndices = socialMedia.map(() => false);
  let socialGrid;

  onMount(() => {
    const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  // Read the data-index attribute and mark that index as visible.
                  const idx = parseInt(entry.target.getAttribute('data-index'));
                  visibleIndices[idx] = true;
                  // Trigger reactivity.
                  visibleIndices = [...visibleIndices];
                  // Unobserve this element so it doesn't trigger again.
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0 }
    );
    // Observe each social-link element.
    const links = socialGrid.querySelectorAll('.social-link');
    links.forEach(link => observer.observe(link));
  });
</script>

<div class="social-grid" bind:this={socialGrid}>
  {#each socialMedia as item, index}
    <a
            href={item.url}
            class="social-link"
            data-index={index}
            class:visible={visibleIndices[index]}
            style="transition-delay: {index * 250}ms;"
            target="_blank">
      <img src={item.icon} alt={item.platform} class="social-icon" />
      <div class="social-info">
        <span class="platform-name">{item.platform}</span>
        <span class="username">{item.username}</span>
      </div>
    </a>
  {/each}
</div>

<style>
  .social-grid {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    display: grid;
    gap: 15px;
  }

  .social-link {
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: white;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .social-link.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .social-icon {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  .social-info {
    display: flex;
    flex-direction: column;
  }

  .platform-name {
    font-weight: bold;
    font-size: 1.1em;
  }

  .username {
    font-size: 0.9em;
    opacity: 0.8;
  }
</style>
