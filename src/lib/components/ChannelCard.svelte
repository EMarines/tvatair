<script lang="ts">
  import type { Channel } from '../services/iptv-api.js';

  export let channel: Channel;
  export let onPlay: (channel: Channel) => void = () => {};

  function handlePlay() {
    onPlay(channel);
  }
</script>

<div class="channel-card">
  <div class="channel-logo">
    {#if channel.logo}
      <img src={channel.logo} alt={channel.name} />
    {:else}
      <div class="logo-placeholder">
        {channel.name.charAt(0).toUpperCase()}
      </div>
    {/if}
  </div>
  
  <div class="channel-info">
    <h3 class="channel-name">{channel.name}</h3>
    <div class="channel-meta">
      <span class="country">🌍 {channel.country}</span>
      <span class="category">📺 {channel.category}</span>
    </div>
    {#if channel.language && channel.language.length > 0}
      <div class="languages">
        {#each channel.language as lang}
          <span class="language-tag">{lang}</span>
        {/each}
      </div>
    {/if}
  </div>
  
  <div class="channel-actions">
    <button class="play-button" on:click={handlePlay}>
      ▶️ Reproducir
    </button>
  </div>
</div>

<style>
  .channel-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-height: 120px;
  }

  .channel-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  .channel-logo {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
  }

  .channel-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .logo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }

  .channel-info {
    flex: 1;
    min-width: 0;
  }

  .channel-name {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .channel-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .country,
  .category {
    font-size: 0.9rem;
    color: #666;
    background: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .languages {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .language-tag {
    font-size: 0.8rem;
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.2rem 0.4rem;
    border-radius: 12px;
    border: 1px solid #bbdefb;
  }

  .channel-actions {
    flex-shrink: 0;
  }

  .play-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }

  .play-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .play-button:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .channel-card {
      flex-direction: column;
      text-align: center;
      min-height: auto;
    }

    .channel-logo {
      width: 60px;
      height: 60px;
    }

    .channel-meta {
      justify-content: center;
    }

    .languages {
      justify-content: center;
    }
  }
</style>
