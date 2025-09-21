<script lang="ts">
  import type { Country, Category } from '../services/iptv-api.js';

  export let countries: Country[] = [];
  export let categories: Category[] = [];
  export let selectedCountry: string = '';
  export let selectedCategory: string = '';
  export let searchQuery: string = '';
  export let selectedLanguage: string = '';

  let availableLanguages: string[] = [];

  // Emitir eventos cuando cambien los filtros
  function handleCountryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCountry = target.value;
    dispatch('filterChange', { 
      country: selectedCountry, 
      category: selectedCategory, 
      language: selectedLanguage, 
      search: searchQuery 
    });
  }

  function handleCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCategory = target.value;
    dispatch('filterChange', { 
      country: selectedCountry, 
      category: selectedCategory, 
      language: selectedLanguage, 
      search: searchQuery 
    });
  }

  function handleLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedLanguage = target.value;
    dispatch('filterChange', { 
      country: selectedCountry, 
      category: selectedCategory, 
      language: selectedLanguage, 
      search: searchQuery 
    });
  }

  function handleSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    dispatch('filterChange', { 
      country: selectedCountry, 
      category: selectedCategory, 
      language: selectedLanguage, 
      search: searchQuery 
    });
  }

  function clearFilters() {
    selectedCountry = '';
    selectedCategory = '';
    selectedLanguage = '';
    searchQuery = '';
    dispatch('filterChange', { 
      country: '', 
      category: '', 
      language: '', 
      search: '' 
    });
  }

  // Crear lista de idiomas únicos
  $: if (countries.length > 0) {
    availableLanguages = [...new Set(
      countries.flatMap(country => 
        country.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      )
    )].sort();
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="filters-container">
  <div class="search-section">
    <div class="search-input">
      <input
        type="text"
        placeholder="Buscar canales..."
        bind:value={searchQuery}
        on:input={handleSearchChange}
        class="search-field"
      />
      <span class="search-icon">🔍</span>
    </div>
  </div>

  <div class="filters-section">
    <div class="filter-group">
      <label for="country-filter">País:</label>
      <select 
        id="country-filter" 
        bind:value={selectedCountry} 
        on:change={handleCountryChange}
        class="filter-select"
      >
        <option value="">Todos los países</option>
        {#each countries as country}
          <option value={country.code}>{country.flag} {country.name}</option>
        {/each}
      </select>
    </div>

    <div class="filter-group">
      <label for="category-filter">Categoría:</label>
      <select 
        id="category-filter" 
        bind:value={selectedCategory} 
        on:change={handleCategoryChange}
        class="filter-select"
      >
        <option value="">Todas las categorías</option>
        {#each categories as category}
          <option value={category.id}>{category.name}</option>
        {/each}
      </select>
    </div>

    <div class="filter-group">
      <label for="language-filter">Idioma:</label>
      <select 
        id="language-filter" 
        bind:value={selectedLanguage} 
        on:change={handleLanguageChange}
        class="filter-select"
      >
        <option value="">Todos los idiomas</option>
        {#each availableLanguages as language}
          <option value={language}>{language}</option>
        {/each}
      </select>
    </div>

    <button class="clear-filters" on:click={clearFilters}>
      🗑️ Limpiar filtros
    </button>
  </div>
</div>

<style>
  .filters-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .search-section {
    margin-bottom: 1.5rem;
  }

  .search-input {
    position: relative;
    max-width: 400px;
  }

  .search-field {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }

  .search-field:focus {
    outline: none;
    border-color: #667eea;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
  }

  .filters-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    align-items: end;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-group label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
  }

  .filter-select {
    padding: 0.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 0.9rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s ease;
  }

  .filter-select:focus {
    outline: none;
    border-color: #667eea;
  }

  .clear-filters {
    background: #f44336;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    align-self: end;
  }

  .clear-filters:hover {
    background: #d32f2f;
  }

  @media (max-width: 768px) {
    .filters-section {
      grid-template-columns: 1fr;
    }

    .search-input {
      max-width: 100%;
    }
  }
</style>
