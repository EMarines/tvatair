<script lang="ts">
  import { onMount } from 'svelte';
  import ChannelCard from '$lib/components/ChannelCard.svelte';
  import ChannelFilters from '$lib/components/ChannelFilters.svelte';
  import { iptvApi, type Channel, type Country, type Category } from '$lib/services/iptv-api.js';

  let channels: Channel[] = [];
  let countries: Country[] = [];
  let categories: Category[] = [];
  let filteredChannels: Channel[] = [];
  let loading = true;
  let error: string | null = null;

  // Filtros
  let filters = {
    country: '',
    category: '',
    language: '',
    search: ''
  };

  onMount(async () => {
    try {
      loading = true;
      error = null;

      // Cargar datos en paralelo
      const [channelsData, countriesData, categoriesData] = await Promise.all([
        iptvApi.getChannels(),
        iptvApi.getCountries(),
        iptvApi.getCategories()
      ]);

      channels = channelsData;
      countries = countriesData;
      categories = categoriesData;
      filteredChannels = channels;

      // Mostrar solo los primeros 50 canales para mejor rendimiento
      if (filteredChannels.length > 50) {
        filteredChannels = filteredChannels.slice(0, 50);
      }

    } catch (err) {
      error = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error loading data:', err);
    } finally {
      loading = false;
    }
  });

  function handleFilterChange(event: CustomEvent) {
    const newFilters = event.detail;
    filters = newFilters;
    
    // Aplicar filtros
    filteredChannels = iptvApi.filterChannels(channels, newFilters);
    
    // Limitar a 50 canales para mejor rendimiento
    if (filteredChannels.length > 50) {
      filteredChannels = filteredChannels.slice(0, 50);
    }
  }

  function handlePlayChannel(channel: Channel) {
    console.log('Reproducir canal:', channel);
    // Aquí puedes implementar la lógica de reproducción
    alert(`Reproduciendo: ${channel.name}`);
  }
</script>

<svelte:head>
  <title>TvATAIR - Canales de TV</title>
  <meta name="description" content="Explora miles de canales de TV de todo el mundo" />
</svelte:head>

<main>
  <div class="container">
    <header class="header">
      <h1>📺 TvATAIR</h1>
      <p>Explora miles de canales de TV de todo el mundo</p>
    </header>

    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Cargando canales...</p>
      </div>
    {:else if error}
      <div class="error">
        <h2>❌ Error al cargar los datos</h2>
        <p>{error}</p>
        <button on:click={() => window.location.reload()}>
          🔄 Reintentar
        </button>
      </div>
    {:else}
      <ChannelFilters 
        {countries} 
        {categories}
        on:filterChange={handleFilterChange}
      />

      <div class="channels-section">
        <div class="channels-header">
          <h2>Canales disponibles</h2>
          <span class="channels-count">
            {filteredChannels.length} de {channels.length} canales
          </span>
        </div>

        {#if filteredChannels.length === 0}
          <div class="no-channels">
            <h3>🔍 No se encontraron canales</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        {:else}
          <div class="channels-grid">
            {#each filteredChannels as channel (channel.id)}
              <ChannelCard 
                {channel} 
                onPlay={handlePlayChannel}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header p {
    font-size: 1.2rem;
    color: #666;
    margin: 0;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error {
    text-align: center;
    padding: 4rem 2rem;
    background: #ffebee;
    border-radius: 12px;
    border: 1px solid #ffcdd2;
  }

  .error h2 {
    color: #d32f2f;
    margin: 0 0 1rem 0;
  }

  .error button {
    background: #d32f2f;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
  }

  .channels-section {
    margin-top: 2rem;
  }

  .channels-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .channels-header h2 {
    margin: 0;
    color: #333;
  }

  .channels-count {
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .no-channels {
    text-align: center;
    padding: 4rem 2rem;
    background: #f5f5f5;
    border-radius: 12px;
  }

  .no-channels h3 {
    color: #666;
    margin: 0 0 1rem 0;
  }

  .channels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .channels-grid {
      grid-template-columns: 1fr;
    }

    .channels-header {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>